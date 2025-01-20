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

export const View3D = ( domContainer, url ) =>
{		
	let width = 0;
	let height = 0;
	let renderer, camera, scene, light, controls, container;	
	let needsRender = true;

	const instance = new EventDispatcher();
	const loader = new GLTFLoader();
	const points = [];	
	const canvas = document.createElement( 'canvas' );
	const context = canvas.getContext( '2d' );

	const stringifyVector3 = ( v ) => v.x + ',' + v.y + ',' + v.z;
	const parseVector3 = ( s ) => 
	{
		const [ x, y, z ] = s.split( ',' ).map( v => Number.parseFloat( v ) );
		return Number.isNaN( x ) || Number.isNaN( y ) || Number.isNaN( z ) ? null : new Vector3( x, y, z );
	};
	
	const stringifySpherical = ( s ) => s.radius + ',' + s.phi + ',' + s.theta;
	const parseSpherical = ( s ) => 
	{
		const [ radius, phi, theta ] = s.split( ',' ).map( v => Number.parseFloat( v ) );
		return Number.isNaN( radius ) || Number.isNaN( phi ) || Number.isNaN( theta ) ? null : new Spherical( radius, phi, theta );
	};	
	
	const fromJSON = ( json ) =>
	{	
		const _points = [];
		
		try
		{
			json.forEach( point => 
			{	
				const target = container.getObjectByName( point.name );
				
				if( target )
				{
					const uuid = point.point_id;
					const position = parseVector3( point.position );
					const spherical = parseSpherical( point.spherical );
					
					if( uuid && position && spherical )
						_points.push( { uuid, target, position, spherical, added:true, removed:false } );
				}
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
		renderer = new WebGLRenderer( { antialias:true, preserveDrawingBuffer:true } ); 
		renderer.setClearColor( 0xFFFFFF );
		renderer.outputColorSpace = SRGBColorSpace;
		renderer.setPixelRatio( window.devicePixelRatio );
		
		domContainer.appendChild( renderer.domElement );

		light = new DirectionalLight( 0xFFFFFF, 1 );
		light.position.set( 500, 500, 500 );
		
		
		scene = new Scene();
		scene.add( camera = new PerspectiveCamera( 45, 1.0, 10, 10000 ) );
		scene.add( container = new Group() );
		scene.add( new AmbientLight( 0xFFFFFF, 1 ) );
		scene.add( light );


		controls = new OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', update );
		controls.screenSpacePanning = true;
		controls.enableDamping = true;
		controls.dampingFactor = 0.1;
		controls.minDistance = 100;
		controls.maxDistance = 100;
		controls.maxPolarAngle = controls.minPolarAngle = Math.PI / 180 * 50;
		controls.update();
		controls.saveState();

		render(); 
		
		controls.minPolarAngle = Math.PI / 180 * 0;
		controls.maxPolarAngle = Math.PI / 180 * 180;
		controls.minAzimuthAngle = -Infinity;
		controls.maxAzimuthAngle = Infinity;

		loader.load( url, ( gltf ) => 
		{	
			container.add( gltf.scene );

			fitToScreen();
			
			needsRender = true;
			
			instance.dispatchEvent( { type:'started' } );
		} );
	};
	
	const update = () => needsRender = true;

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
		
		needsRender = true;
	};
	
	const reset = () =>
	{
		controls.reset();
		fitToScreen();
	};

	const getCanvas = () => 
	{
		canvas.width = width;
		canvas.height = height;
		context.drawImage( renderer.domElement, 0, 0 );

		return canvas;
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
		
		if( needsRender )
		{
			needsRender = false;
			
			const projectionUUIDS = [];
			const projectionPoints = [];

			camera.updateMatrixWorld();

			for( let i = points.length - 1; i >= 0; i-- )
			{
				const point = points[ i ];
				const { target, position, uuid, time, added, removed, spherical } = point;
				const worldPoint = target.localToWorld( position.clone() );
				const direction = new Vector3().setFromSpherical( spherical ).normalize();

				//console.log( direction );

				const projection = worldPoint.clone().project( camera );
				const offsetPoint = worldPoint.clone().addScaledVector( direction, spherical.radius );
				const offsetProjection = offsetPoint.clone().project( camera );

				if( !removed )
				{
					const surfacePoint =
					{
						type:'surface',
						uuid,
						x: ( projection.x * rect.width / 2 ) + rect.width / 2, // rect.x + 
						y:-( projection.y * rect.height / 2 ) + rect.height / 2, // rect.x + 
						z:projection.z,
						visible:projection.z <= 1.0,
					};

					const offsetPoint =
					{
						type:'offset',
						uuid,
						x: ( offsetProjection.x * rect.width / 2 ) + rect.width / 2, // rect.x + 
						y:-( offsetProjection.y * rect.height / 2 ) + rect.height / 2, // rect.x + 
						z:offsetProjection.z,
						visible:offsetProjection.z <= 1.0,
					};

					projectionUUIDS.push( uuid );
					projectionPoints.push( surfacePoint, offsetPoint );

					if( added )
					{
						point.added = false;

						instance.dispatchEvent( { type:'added', time, uuid, points:[ surfacePoint, offsetPoint ] } );
					}
				}
				else
				{
					points.splice( i, 1 );

					instance.dispatchEvent( { type:'removed', uuid, time:performance.now(), points:
					[
						{ type:'surface', uuid },
						{ type:'offset', uuid },
					] } );
				}
			};

			projectionPoints.sort( ( a, b ) => b.z - a.z );

			//

			renderer.render( scene, camera );
		

			instance.dispatchEvent( { type:'update', uuids:projectionUUIDS, points:projectionPoints } );
		}
		
		window.requestAnimationFrame( render );
	}

	init();


	Object.assign( instance, { fromJSON, reset, fitToScreen, update, getCanvas } );

	return instance;
};