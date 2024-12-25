import { View3D } from './view3D.js';

        const view3d = View3D( document.querySelector( '#view3d' ) );
        const layer = document.querySelector( '#layer' );
        const layerVisibility = document.querySelector( '#layerVisibility' );
        const fitToScreenButton = document.querySelector( '#fitToScreen' );
        const screenshotButton = document.querySelector( '#screenshot' );

        const popupContainer = document.querySelector('#popup-info')
        const popupTitle = popupContainer.querySelector('.popup-title')
        const popupText = popupContainer.querySelector('.popup-text')

        const json = 
        [
            {
                "text": {
                    "ru": "Сократительная вакуоль",
                    "en": "Contractile Vacuole",
                    "kz": "Жиырылғыш вакуолi"
                },
                "target": "VacuoleContractile_Water",
                "localNormalPoint": {
                    "x": 0.16923829059998302,
                    "y": 1.0485668557613528,
                    "z": 0.14478291416607614
                },
                "localPoint": {
                    "x": 0.012636814341727583,
                    "y": 0.07778859195278764,
                    "z": 0.010800247942460373
                },
                "spherical": {
                    "radius": 1.8151003719563383,
                    "phi": 0.7044005842276875,
                    "theta": 4.79965544298441
                },
                "offsetCenter": "spherical",
                "radius": 0.83,
                "uuid": "0df8c8ff-1a23-440b-97d3-2d1f46068c37"
            },
            {
                "text": {
                    "ru": "Ядро",
                    "en": "Nucleus",
                    "kz": "Ядро"
                },
                "target": "Nucleus_Chromatin",
                "localNormalPoint": {
                    "x": -0.010967623216037838,
                    "y": 0.037663235562140504,
                    "z": 0.9997875725074259
                },
                "localPoint": {
                    "x": -0.010967648364180961,
                    "y": 0.040219682057149216,
                    "z": -0.00020914923711146122
                },
                "spherical": {
                    "radius": 0.5664322455932704,
                    "phi": 0.174532925199433,
                    "theta": 1.46607657167524
                },
                "offsetCenter": "spherical",
                "radius": 0.88,
                "uuid": "c8aef160-73c0-4714-afd0-184cc1b6e639"
            },
            {
                "text": {
                    "ru": "Уроид",
                    "en": "Uroid",
                    "kz": "Уроид"
                },
                "target": "VacuoleContractile_Water001",
                "localNormalPoint": {
                    "x": 0.3468913510731629,
                    "y": 0.9992004172460359,
                    "z": -0.18576484659237913
                },
                "localPoint": {
                    "x": 0.025922970852305882,
                    "y": 0.07406051101775636,
                    "z": -0.013954120223944932
                },
                "spherical": {
                    "radius": 1.6574201046836448,
                    "phi": 0.7512789209107242,
                    "theta": 1.6929693744345
                },
                "offsetCenter": "spherical",
                "radius": 0.8,
                "uuid": "2cd46563-6d9a-466d-abcd-c1d840f08695"
            },
            {
                "text": {
                    "ru": "Плазматическая мембрана",
                    "en": "Plasma Membrane",
                    "kz": "Плазмалық мембрана"
                },
                "target": "AmoebaBody_Src",
                "localNormalPoint": {
                    "x": 1.2612185265736215,
                    "y": -0.627261323135578,
                    "z": 0.8371196859819005
                },
                "localPoint": {
                    "x": 0.43681655292795396,
                    "y": -0.0743000037017475,
                    "z": 0.7665521483865578
                },
                "spherical": {
                    "radius": 1.7698648256673004,
                    "phi": 1.95476876223365,
                    "theta": 1.18682389135614
                },
                "offsetCenter": "spherical",
                "radius": 0.77,
                "uuid": "3aa67650-eec5-4032-b1a4-171a60d8c918"
            },
            {
                "text": {
                    "ru": "Пищеварительная вакуоль",
                    "en": "Digestive Vacuole",
                    "kz": "Асқорыту вакуолi"
                },
                "target": "Object002",
                "localNormalPoint": {
                    "x": -0.021184611099566375,
                    "y": 0.9949993514455855,
                    "z": 1.3473861717155802
                },
                "localPoint": {
                    "x": -0.021184611099566375,
                    "y": -0.005000648554414511,
                    "z": 1.3473861717155802
                },
                    "spherical": {
                    "radius": 1.5336677825611953,
                    "phi": 1.18682389135614,
                    "theta": 5.02654824574367
                },
                "offsetCenter": "spherical",
                "radius": 0.92,
                "uuid": "8723cfc6-6fb5-4766-80ae-29e01993f10a"
            },
            {
                "text": {
                    "ru": "Образование пищеварительной вакуоли",
                    "en": "Formation of a digestive vacuole",
                    "kz": "Асқорыту вакуолының түзілуі"
                },
                "target": "FishBody",
                "localNormalPoint": {
                    "x": 0.09199668677947946,
                    "y": -0.959054046406716,
                    "z": 0.28129807273770663
                },
                "localPoint": {
                    "x": 0.002159716423254299,
                    "y": -0.016679394576874302,
                    "z": 0.012254339861623834
                },
                "spherical": {
                    "radius": 0.8243246649008829,
                    "phi": 2.00712863979348,
                    "theta": 0.0174532925199433
                },
                "offsetCenter": "spherical",
                "radius": 0.75,
                "uuid": "efe4369d-dc0b-4f79-8a25-7221f35fd5a1"
            }
        ];
        

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
        fitToScreenButton.onclick = () => view3d.fitToScreen();
        screenshotButton.onclick = (e) => 
        {
            const _canvas = view3d.getCanvas();
            const canvas = document.createElement( 'canvas' );
            const context = canvas.getContext( '2d' );
            
            canvas.width = _canvas.width;
            canvas.height = _canvas.height;
            
            context.drawImage( _canvas, 0, 0 );
            
            html2canvas( layer, { canvas, backgroundColor:null } ).then( () =>
            {
                // document.body.appendChild( canvas );
                
                const a = document.createElement( 'a' );

                a.href = canvas.toDataURL();
                a.download = 'screenshot.png';
                a.click();
            } );

            setTimeout(()=>{
                e.currentTarget.classList.remove('active')
            }, 400)
        };

        view3d.addEventListener( 'started', () =>
			{				
				view3d.fromJSON( json );
			} );

        
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
                    const data = json.find( data => data.uuid == uuid );
                    // pointElement.onpointerdown = ( event ) => pointerdown( event.target, data.text[ language ] );
                    pointElement.onclick = ( event ) => pointerdown( event.target, data.text[ language ] );
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
                    
                    if( type == 'offset' ) {
                        const data = json.find( data => data.uuid == uuid );
                        pointElement.innerHTML = data.text[ language ];
                    }
                    
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
            