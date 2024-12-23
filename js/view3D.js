import 
        { 
            EventDispatcher,
            WebGLRenderer, 
            SRGBColorSpace,
            PerspectiveCamera, 
            Scene, 
            Group,
            GridHelper,
            DirectionalLight,
            AmbientLight,
            Mesh,
            Box3,
            Vector2,
            Vector3,
            Sphere,
            SphereGeometry,
            MeshBasicMaterial,
            MathUtils,
            Spherical,
        } from 'three';
        
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 
        
        const View3D = ( domContainer ) =>
        {		
            let width = 0;
            let height = 0;
            let renderer, camera, scene, light, controls, container;	
            let needsRender = true;

            const instance = new EventDispatcher();
            const loader = new GLTFLoader();
            const points = [];		
            
            const fromJSON = ( json ) =>
            {
                const _points = [];
                const parseVector3 = ( json ) => new Vector3( json.x, json.y, json.z );
                const parseSpherical = ( json ) => new Spherical( json.radius, json.phi, json.theta );
                
                try
                {
                    json.forEach( point => 
                    {						
                        _points.push
                        ( {
                            text:				point.text,
                            target:				container.getObjectByName( point.target ),
                            localNormalPoint: 	parseVector3( point.localNormalPoint ),
                            localPoint: 		parseVector3( point.localPoint ),
                            spherical:			parseSpherical( point.spherical ), 
                            offsetCenter:		point.offsetCenter,
                            radius:				point.radius,
                            uuid:				point.uuid,	
                            added:				true,
                            removed:			false,
                        } );
                    } );
                }
                catch( error )
                {
                    console.error( error );
                }
                
                if( _points.length > 0 )
                {
                    points.forEach( point => point.removed = true );
                    
                    _points.forEach( point => points.push( point ) )
                }
            };

            const init = () =>
            {			
                renderer = new WebGLRenderer({ antialias: true, alpha: true });
                renderer.setClearColor(0xFFFFFF, 0);
                renderer.outputColorSpace = SRGBColorSpace;
                renderer.setPixelRatio( window.devicePixelRatio );
                
                domContainer.appendChild( renderer.domElement );
    
                light = new DirectionalLight( 0xFFFFFF, 1 );
                light.position.set( 500, 500, 500 );
                
                
                scene = new Scene();
                scene.add( camera = new PerspectiveCamera( 45, 1.0, 10, 10000 ) );
                scene.add( container = new Group() );
                // scene.add( new GridHelper( 100, 100, 0xEEEEEE, 0xEEEEEE ) );
                scene.add( new AmbientLight( 0xFFFFFF, 1 ) );
                scene.add( light );


                controls = new OrbitControls( camera, renderer.domElement );
                controls.addEventListener( 'change', onControlsChange );
                controls.screenSpacePanning = true;
                controls.enableDamping = true;
                controls.dampingFactor = 0.1;
                controls.minDistance = 100;
                controls.maxDistance = 100;
                controls.maxPolarAngle = controls.minPolarAngle = Math.PI / 180 * 50;
                controls.update();

                render(); 
                
                controls.minPolarAngle = Math.PI / 180 * 0;
                controls.maxPolarAngle = Math.PI / 180 * 180;
                controls.minAzimuthAngle = -Infinity;
                controls.maxAzimuthAngle = Infinity;

                loader.load( 'AmoebaBabylonNoPlates.glb', ( gltf ) => 
                {	
                    container.add( gltf.scene );

                    fitToScreen();
                    
                    needsRender = true;
                    
                    instance.dispatchEvent( { type:'started' } );
                } );
            };
            
            const onControlsChange = () => 
            {
                needsRender = true;
            };

            const fitToScreen = () =>
            {
                container.updateMatrixWorld( true );
                    
                const box = new Box3().expandByObject( container );
                const maxSize = box.getBoundingSphere( new Sphere() ).radius * 2;					
                const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
                const fitWidthDistance = fitHeightDistance / camera.aspect;
                const distance = Math.max( fitHeightDistance, fitWidthDistance );
                const direction = controls.target.clone().sub( camera.position ).normalize().multiplyScalar( distance );
                const center = box.getCenter( new Vector3() );

                controls.minDistance = controls.maxDistance = distance * 1;//0.98; 
                controls.target.copy( center );

                camera.near = distance / 100;
                camera.far = distance * 100;
                camera.updateProjectionMatrix();

                camera.position.copy( controls.target ).sub( direction );

                controls.update();
                controls.minDistance /= 256;
                controls.maxDistance *= 2;
            };
            
            const render = ( timeStamp = null ) =>
            {
                const rect = domContainer.getBoundingClientRect();
                
                if( rect.width != width || rect.height != height )
                {
                    width = rect.width;
                    height = rect.height;
                    
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();

                    renderer.setSize( width, height );

                    needsRender = true;
                }

                controls.update();
                
                const projectionUUIDS = [];
                const projectionPoints = [];

                if( needsRender )
                {
                    camera.updateMatrixWorld();

                    for( let i = points.length - 1; i >= 0; i-- )
                    {	
                        const point = points[ i ];
                        const { text, target, localNormalPoint, radius, localPoint, uuid, added, removed, offsetCenter, spherical } = point;
                        const targetBox3 = new Box3().expandByObject( target );
                        const targetCenter = targetBox3.getCenter( new Vector3() );
                        const worldPoint = target.localToWorld( localPoint.clone() );
                        const direction = ( () => 
                        {
                            if( offsetCenter == 'world' )
                                return worldPoint.clone().normalize();
                            else if( offsetCenter == 'local' )
                                return worldPoint.clone().sub( targetCenter ).normalize();
                            else if( offsetCenter == 'spherical' )
                                return new Vector3().setFromSpherical( spherical ).normalize();
                            else if( offsetCenter == 'normal' )
                                return target.localToWorld( localNormalPoint.clone() ).sub( worldPoint ).normalize();
                            else 
                                throw new Error( 'WTF?' );
                        } )();

                        const projection = worldPoint.clone().project( camera );
                        const offsetPoint = worldPoint.clone().addScaledVector( direction, radius );
                        const offsetProjection = offsetPoint.clone().project( camera );

                        if( !removed )
                        {
                            const surfacePoint = 
                            {
                                type:'surface',
                                uuid,
                                text,
                                x:rect.x + ( projection.x * rect.width / 2 ) + rect.width / 2,
                                y:rect.y - ( projection.y * rect.height / 2 ) + rect.height / 2,
                                z:projection.z,
                                visible:projection.z <= 1.0,
                            };
                            
                            const offsetPoint = 
                            {
                                type:'offset',
                                uuid,
                                text,
                                x:rect.x + ( offsetProjection.x * rect.width / 2 ) + rect.width / 2,
                                y:rect.y - ( offsetProjection.y * rect.height / 2 ) + rect.height / 2,
                                z:offsetProjection.z,
                                visible:offsetProjection.z <= 1.0,
                            };
                            
                            projectionUUIDS.push( uuid );	
                            projectionPoints.push( surfacePoint, offsetPoint );
                            
                            if( added )
                            {
                                point.added = false;
                                
                                instance.dispatchEvent( { type:'added', uuid, points:[ surfacePoint, offsetPoint ] } );
                            }
                        }
                        else 
                        {
                            points.splice( i, 1 );

                            instance.dispatchEvent( { type:'removed', uuid, points:
                            [
                                { type:'surface', uuid },
                                { type:'offset', uuid },
                            ] } );
                        }
                    };

                    projectionPoints.sort( ( a, b ) => b.z - a.z );

                    renderer.render( scene, camera );
                }
                
                window.requestAnimationFrame( render );
                
                if( needsRender )
                    instance.dispatchEvent( { type:'update', uuids:projectionUUIDS, points:projectionPoints } );
                    
                needsRender = false;
            }
            
            init();

            instance.fromJSON = fromJSON;

            return instance;
        };
        
        //