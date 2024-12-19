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
                renderer = new WebGLRenderer( { antialias:true } );
                renderer.setClearColor( 0xFFFFFF );
                renderer.outputColorSpace = SRGBColorSpace;
                renderer.setPixelRatio( window.devicePixelRatio );
                
                domContainer.appendChild( renderer.domElement );
    
                light = new DirectionalLight( 0xFFFFFF00, 0 );
                light.position.set( 500, 500, 500 );
                
                
                scene = new Scene();
                scene.add( camera = new PerspectiveCamera( 45, 1.0, 10, 10000 ) );
                scene.add( container = new Group() );
                // scene.add( new GridHelper( 100, 100, 0xEEEEEE, 0xEEEEEE ) );
                scene.add( new AmbientLight( 0xFFFFFF00, 0 ) );
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
        
        const view3d = View3D( document.querySelector( '#view3d' ) );
        const layer = document.querySelector( '#layer' );
        const layerVisibility = document.querySelector( '#layerVisibility' );

        const popupContainer = document.querySelector('#popup-info')
        const popupTitle = popupContainer.querySelector('.popup-title')
        const popupText = popupContainer.querySelector('.popup-text')

        const modelConf = {
            ru: [
                    {
                        title: `Ядро`,
                        description: `Содержит генетический материал амебы. Регулирует процессы жизнедеятельности клетки, включая размножение путем деления.`,
                    },
                    {
                        title: `Пищеварительная вакуоль`,
                        description: `Образуются в процессе фагоцитоза, когда амеба окружает и захватывает частицы пищи с помощью псевдоподий. Внутри вакуоли происходит расщепление пищевых частиц с помощью ферментов.`,
                    },
                    {
                        title: `Сократительная вакуоль`,
                        description: `Специализированная органелла, задействованная в регуляции осмотического давления внутри клетки. Она аккумулирует избыток воды из цитоплазмы и периодически выталкивает ее наружу.`,
                    },
                    {
                        title: `Псевдоподии (ложноножки)`,
                        description: `Временные выросты цитоплазмы, используемые для передвижения и захвата пищи. Псевдоподии образуются благодаря течению цитоплазмы и способствуют амебоидному движению.`,
                    },
                    {
                        title: `Плазматическая мембрана`,
                        description: `Гибкая мембрана, окружающая цитоплазму клетки. Она регулирует обмен веществ между клеткой и окружающей средой и участвует в амебоидном движении.`,
                    },
                    {
                        title: `Уроид`,
                        description: `Это специализированная органелла амеб, которая находится в задней части клетки. Она участвует в регуляции и выведении продуктов метаболизма и внешних загрязняющих веществ из клетки. В процессе передвижения амебы уроид помогает в выделении токсичных веществ, тем самым обеспечивая защиту и поддержание внутреннего гомеостаза амебы.`,
                    }
                ],
            kz: [
                {
                    title: `Ядро`,
                    description: `Амебаның генетикалық материалы бар. Жасушаның өмірлік процестерін, онымен қоса ішінде бөліну арқылы көбеюін реттейді.`,
                },
                {
                    title: `Асқорыту вакуолi`,
                    description: `Фагоцитоз процесі кезінде, амеба псевдоподия көмегімен тамақ бөлшектерін қоршап, ұстағанда түзіледі. Вакуоль ішінде тамақ бөлшектері ферменттердің көмегімен ыдырайды.`,
                },
                {
                    title: `Жиырылғыш вакуолi`,
                    description: `Жасуша ішіндегі осмостық қысымды реттеуге қатысатын арнайы органоид. Ол цитоплазмадағы артық суды жинайды және оны мезгіл сайын сыртқа шығарады.`,
                },
                {
                    title: `Псевдоподиялар`,
                    description: `Цитоплазманың уақытша өсінділері қозғалыс және тағамды ұстау үшін пайдаланылады. Псевдоподиялар цитоплазма ағыны есебінен қалыптасады және амебоидты қозғалысқа ықпал етеді.`,
                },
                {
                    title: `Плазмалық мембрана `,
                    description: `Жасушаның цитоплазмасын қоршап тұрған икемді мембрана. Ол жасуша мен қоршаған орта арасындағы зат алмасуды реттейді және амебоидты қозғалысқа қатысады.`,
                },
                {
                    title: `Уроид`,
                    description: `Бұл жасушаның артқы жағында орналасқан амебалардың арнайы органелласы. Ол жасушадан зат алмасу өнімдерін және сыртқы ластаушы заттарды реттеуге және шығаруға қатысады. Амебаның қозғалысы кезінде уроид улы заттардың бөлінуіне көмектеседі, сол арқылы амебаның ішкі гомеостазын қорғайды және сақтайды.`,
                }
            ],
            en: [
                {
                    title: `Nucleus`,
                    description: `Contains the genetic material of the amoeba. It regulates the life processes of the cell, including reproduction through division.`,
                },
                {
                    title: `Digestive Vacuole`,
                    description: `Forms during the process of phagocytosis, when the amoeba surrounds and captures food particles using pseudopodia. Inside the vacuole, the breakdown of food particles occurs with the help of enzymes.`,
                },
                {
                    title: `Contractile Vacuole`,
                    description: `A specialized organelle involved in regulating the osmotic pressure inside the cell. It accumulates excess water from the cytoplasm and periodically expels it outward.`,
                },
                {
                    title: `Pseudopodia`,
                    description: `Temporary protrusions of the cytoplasm, used for movement and capturing food. Pseudopodia are formed by the flow of cytoplasm and facilitate amoeboid movement.`,
                },
                {
                    title: `Plasma Membrane`,
                    description: `A flexible membrane surrounding the cytoplasm of the cell. It regulates the exchange of substances between the cell and its environment and participates in amoeboid movement.`,
                },
                {
                    title: `Uroid`,
                    description: `A specialized organelle of amoebae located at the rear part of the cell. It participates in the regulation and excretion of metabolic products and external pollutants from the cell. During the movement of the amoeba, the uroid assists in the elimination of toxic substances, thus providing protection and maintaining the internal homeostasis of the amoeba.`,
                }
            ],
            }
        

        function changePopupInfo(text) {
            if (!popupContainer.classList.contains('active')) { popupContainer.classList.add('active') }
            let lang = document.querySelector(".active[data-lang]").dataset.lang

            popupTitle.innerHTML = text
	        text = text.replaceAll('<br />', ' ').replaceAll('<br>', ' ')
            popupText.innerHTML = modelConf[lang].find(item => item.title == text).description
        }
        
        layerVisibility.onclick = ( event ) => layer.hidden = event.currentTarget.classList.contains('active');

        const pointerdown = ( pointElement, text ) =>
        {
            text = text.replaceAll('<br />', ' ').replaceAll('<br>', ' ')
            if (document.querySelector('.offset-point.selected')) { document.querySelector('.offset-point.selected').classList.remove('selected') }

            pointElement.classList.add('selected')
            
            // document.querySelector('.burger-button').classList.remove('active')
            // document.querySelector('.header-menu').classList.remove('active')
            // document.querySelector('.settings-dropdown').classList.remove('active')

            changePopupInfo(text)
        };

        view3d.addEventListener( 'started', () =>
        {				
            view3d.fromJSON( JSON.parse( '[{"text":"Сократительная<br />вакуоль","target":"VacuoleContractile_Water","localNormalPoint":{"x":0.16923829059998302,"y":1.0485668557613528,"z":0.14478291416607614},"localPoint":{"x":0.012636814341727583,"y":0.07778859195278764,"z":0.010800247942460373},"spherical":{"radius":1.8151003719563383,"phi":0.7044005842276875,"theta":4.79965544298441},"offsetCenter":"spherical","radius":0.83,"uuid":"0df8c8ff-1a23-440b-97d3-2d1f46068c37"},{"text":"Ядро","target":"Nucleus_Chromatin","localNormalPoint":{"x":-0.010967623216037838,"y":0.037663235562140504,"z":0.9997875725074259},"localPoint":{"x":-0.010967648364180961,"y":0.040219682057149216,"z":-0.00020914923711146122},"spherical":{"radius":0.5664322455932704,"phi":0.174532925199433,"theta":1.46607657167524},"offsetCenter":"spherical","radius":0.88,"uuid":"c8aef160-73c0-4714-afd0-184cc1b6e639"},{"text":"Уроид","target":"VacuoleContractile_Water001","localNormalPoint":{"x":0.3468913510731629,"y":0.9992004172460359,"z":-0.18576484659237913},"localPoint":{"x":0.025922970852305882,"y":0.07406051101775636,"z":-0.013954120223944932},"spherical":{"radius":1.6574201046836448,"phi":0.7512789209107242,"theta":1.6929693744345},"offsetCenter":"spherical","radius":0.8,"uuid":"2cd46563-6d9a-466d-abcd-c1d840f08695"},{"text":"Плазматическая<br />мембрана","target":"AmoebaBody_Src","localNormalPoint":{"x":1.2612185265736215,"y":-0.627261323135578,"z":0.8371196859819005},"localPoint":{"x":0.43681655292795396,"y":-0.0743000037017475,"z":0.7665521483865578},"spherical":{"radius":1.7698648256673004,"phi":1.95476876223365,"theta":1.18682389135614},"offsetCenter":"spherical","radius":0.77,"uuid":"3aa67650-eec5-4032-b1a4-171a60d8c918"},{"text":"Пищеварительная<br />вакуоль","target":"Object002","localNormalPoint":{"x":-0.021184611099566375,"y":0.9949993514455855,"z":1.3473861717155802},"localPoint":{"x":-0.021184611099566375,"y":-0.005000648554414511,"z":1.3473861717155802},"spherical":{"radius":1.5336677825611953,"phi":1.18682389135614,"theta":5.02654824574367},"offsetCenter":"spherical","radius":0.92,"uuid":"8723cfc6-6fb5-4766-80ae-29e01993f10a"},{"text":"Псевдоподии<br />(ложноножки)","target":"FishBody","localNormalPoint":{"x":0.09199668677947946,"y":-0.959054046406716,"z":0.28129807273770663},"localPoint":{"x":0.002159716423254299,"y":-0.016679394576874302,"z":0.012254339861623834},"spherical":{"radius":0.8243246649008829,"phi":2.00712863979348,"theta":0.0174532925199433},"offsetCenter":"spherical","radius":0.75,"uuid":"efe4369d-dc0b-4f79-8a25-7221f35fd5a1"}]' ) );
        } );

        const langItems = []
        
        view3d.addEventListener( 'added', ( event ) => 
        {
            event.points.forEach( point => 
            {
                const { type, uuid, text } = point;
                const pointElement = document.createElement( 'div' );
                
                pointElement.dataset.uuid = type + '-' + uuid;
                pointElement.classList.add( type + '-point' );
                
                layer.appendChild( pointElement );
                
                if( type == 'surface' )
                {
                    const lineElement = document.createElement( 'div' );
                    
                    lineElement.dataset.uuid = 'line-' + uuid;
                    lineElement.classList.add( 'line' );
                    
                    layer.appendChild( lineElement );
                }
                else if( type == 'offset' )
                {			
                    // pointElement.onpointerdown = ( event ) => pointerdown( event.target, event.target.innerHTML );
                    pointElement.onclick = ( event ) => pointerdown( event.target, event.target.innerHTML );
                    langItems.push(pointElement)
                }
            } );
        } );
        
        view3d.addEventListener( 'removed', ( event ) => 
        {
            event.points.forEach( point => 
            {
                const { type, uuid } = point;
                const pointElement = layer.querySelector( '[data-uuid="' + type + '-' + uuid + '"]' );
                const lineElement = ( type == 'surface' ) ? layer.querySelector( '[data-uuid="line-' + uuid + '"]' ) : null;
                
                pointElement?.remove();
                lineElement?.remove();
            } );
        } );
        
        view3d.addEventListener( 'update', ( event ) => 
        {				
            event.points.forEach( point => 
            {
                const { type, uuid, x, y, visible, text } = point;
                const pointElement = layer.querySelector( '[data-uuid="' + type + '-' + uuid + '"]' );
                const lineElement = ( type == 'surface' ) ? layer.querySelector( '[data-uuid="line-' + uuid + '"]' ) : null;
                
                if( visible )
                {
                    pointElement.style.left = x + 'px';
                    pointElement.style.top = y-82 + 'px';
                    
                    if( type == 'offset' )
                        pointElement.innerHTML = text;
                    
                    if( lineElement )
                    {	
                        const offsetPoint = event.points.find( point => point.uuid == uuid && point.type == 'offset' );
                        
                        if( offsetPoint.visible )
                        {
                            const dx = offsetPoint.x - x;
                            const dy = offsetPoint.y - y;
                            const distance = Math.sqrt( dx * dx + dy * dy );
                            const angle = Math.atan2( dy, dx ) * 180 / Math.PI;
                            
                            lineElement.style.left = x + 'px';
                            lineElement.style.top = (y-82) + 'px';	
                            lineElement.style.width = distance + 'px';
                            lineElement.style.transform = 'rotate(' + angle + 'deg)';
                            
                            
                        }
                        else 
                        {
                            lineElement.style.width = '1px';
                            lineElement.style.left =
                            lineElement.style.top = '9999px';
                        }
                    }
                }
                else 
                {
                    pointElement.style.left = 
                    pointElement.style.top = '9999px';
                    
                    if( lineElement )
                    {	
                        lineElement.style.width = '1px';
                        lineElement.style.left =
                        lineElement.style.top = '9999px';
                    }
                }
                
                layer.appendChild( pointElement );
                
                if( lineElement )
                    layer.appendChild( lineElement );
            } );
        } );
            