import { View3D } from './view3D.js';
import { html2canvas } from './html2canvas.esm.js';

import { language } from './main.js';

export const view3d = View3D( document.querySelector( '#view3d' ) );
const layer = document.querySelector( '#layer' );
const layerVisibility = document.querySelector( '#layerVisibility' );
const fitToScreenButton = document.querySelector( '#fitToScreen' );
const screenshotButton = document.querySelector( '#screenshot' );
const langChange = document.getElementById( 'change-lang' )

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
        "description": {
            "ru": "Специализированная органелла, задействованная в регуляции осмотического давления внутри клетки. Она аккумулирует избыток воды из цитоплазмы и периодически выталкивает ее наружу.",
            "en": "A specialized organelle involved in regulating the osmotic pressure inside the cell. It accumulates excess water from the cytoplasm and periodically expels it outward.",
            "kz": "Жасуша ішіндегі осмостық қысымды реттеуге қатысатын арнайы органоид. Ол цитоплазмадағы артық суды жинайды және оны мезгіл сайын сыртқа шығарады."
        },
        "sound": {
            "ru": "Сократительная вакуоль_рус.mp3",
            "en": "Contractile Vacuole.mp3",
            "kz": "Жиырылғыш вакуольi_каз.mp3"
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
        "description": {
            "ru": "Содержит генетический материал амебы. Регулирует процессы жизнедеятельности клетки, включая размножение путем деления.",
            "en": "Contains the genetic material of the amoeba. It regulates the life processes of the cell, including reproduction through division.",
            "kz": "Амебаның генетикалық материалы бар. Жасушаның өмірлік процестерін, онымен қоса ішінде бөліну арқылы көбеюін реттейді."
        },
        "sound": {
            "ru": "Ядро_рус.mp3",
            "en": "Nucleus.mp3",
            "kz": "Ядро_каз.mp3"
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
        "description": {
            "ru": "Это специализированная органелла амеб, которая находится в задней части клетки. Она участвует в регуляции и выведении продуктов метаболизма и внешних загрязняющих веществ из клетки. В процессе передвижения амебы уроид помогает в выделении токсичных веществ, тем самым обеспечивая защиту и поддержание внутреннего гомеостаза амебы.",
            "en": "A specialized organelle of amoebae located at the rear part of the cell. It participates in the regulation and excretion of metabolic products and external pollutants from the cell. During the movement of the amoeba, the uroid assists in the elimination of toxic substances, thus providing protection and maintaining the internal homeostasis of the amoeba.",
            "kz": "Бұл жасушаның артқы жағында орналасқан амебалардың арнайы органелласы. Ол жасушадан зат алмасу өнімдерін және сыртқы ластаушы заттарды реттеуге және шығаруға қатысады. Амебаның қозғалысы кезінде уроид улы заттардың бөлінуіне көмектеседі, сол арқылы амебаның ішкі гомеостазын қорғайды және сақтайды."
        },
        "sound": {
            "ru": "Уроид_рус.mp3",
            "en": "Uroid.mp3",
            "kz": "Уроид_каз.mp3"
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
        "description": {
            "ru": "Гибкая мембрана, окружающая цитоплазму клетки. Она регулирует обмен веществ между клеткой и окружающей средой и участвует в амебоидном движении.",
            "en": "A flexible membrane surrounding the cytoplasm of the cell. It regulates the exchange of substances between the cell and its environment and participates in amoeboid movement.",
            "kz": "Жасушаның цитоплазмасын қоршап тұрған икемді мембрана. Ол жасуша мен қоршаған орта арасындағы зат алмасуды реттейді және амебоидты қозғалысқа қатысады."
        },
        "sound": {
            "ru": "Плазматическая мембрана_рус.mp3",
            "en": "Plasma Membrane.mp3",
            "kz": "Плазмалық мембрана_каз.mp3"
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
        "description": {
            "ru": "Образуются в процессе фагоцитоза, когда амеба окружает и захватывает частицы пищи с помощью псевдоподий. Внутри вакуоли происходит расщепление пищевых частиц с помощью ферментов.",
            "en": "Forms during the process of phagocytosis, when the amoeba surrounds and captures food particles using pseudopodia. Inside the vacuole, the breakdown of food particles occurs with the help of enzymes.",
            "kz": "Фагоцитоз процесі кезінде, амеба псевдоподия көмегімен тамақ бөлшектерін қоршап, ұстағанда түзіледі. Вакуоль ішінде тамақ бөлшектері ферменттердің көмегімен ыдырайды."
        },
        "sound": {
            "ru": "Пищеварительная вакуоль_рус.mp3",
            "en": "Digestive Vacuole.mp3",
            "kz": "Асқорыту вакуолi_каз.mp3"
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
        "description": {
            "ru": "Временные выросты цитоплазмы, используемые для передвижения и захвата пищи. Псевдоподии образуются благодаря течению цитоплазмы и способствуют амебоидному движению.",
            "en": "Temporary protrusions of the cytoplasm, used for movement and capturing food. Pseudopodia are formed by the flow of cytoplasm and facilitate amoeboid movement.",
            "kz": "Цитоплазманың уақытша өсінділері қозғалыс және тағамды ұстау үшін пайдаланылады. Псевдоподиялар цитоплазма ағыны есебінен қалыптасады және амебоидты қозғалысқа ықпал етеді."
        },
        "sound": {
            "ru": "Псевдоподии (ложноножки)_рус.mp3",
            "en": "Pseudopodia.mp3",
            "kz": "Псевдоподиялар_каз.mp3"
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

const audioItem = document.getElementById('audio')
const audioPlay = document.getElementById('play-sound')

function changePopupInfo(text,desc) {
    if (!popupContainer.classList.contains('active')) { popupContainer.classList.add('active') }

    popupTitle.innerHTML = text
    popupText.innerHTML = desc
}

layerVisibility.onclick = ( event ) => layer.hidden = event.currentTarget.classList.contains('active');

const pointerdown = ( pointElement, text, sound, description ) =>
{
    text = text.replaceAll('<br />', ' ').replaceAll('<br>', ' ')
    if (document.querySelector('.offset-point.selected')) { document.querySelector('.offset-point.selected').classList.remove('selected') }

    pointElement.classList.add('selected')
    audioItem.src = `sounds/${sound}`
    audioPlay.classList.add('show')
    
    // document.querySelector('.burger-button').classList.remove('active')
    // document.querySelector('.header-menu').classList.remove('active')
    document.querySelector('.settings-dropdown').classList.remove('active')

    changePopupInfo(text, description)
};
fitToScreenButton.onclick = () => view3d.fitToScreen();
screenshotButton.onclick = () => 
{
    const _canvas = view3d.getCanvas();
    const canvas = document.createElement( 'canvas' );
    const context = canvas.getContext( '2d' );
    
    canvas.width = _canvas.width;
    canvas.height = _canvas.height;
    
    context.drawImage( _canvas, 0, 0 );
    
    html2canvas( layer, { canvas, backgroundColor:null } ).then( () =>
    {        
        const a = document.createElement( 'a' );

        a.href = canvas.toDataURL();
        a.download = 'screenshot.png';
        a.click();
    } );

    setTimeout(()=>{
        screenshotButton.classList.remove('active')
    }, 200)
};

let audioDuration = 0
let audioInterval

audioPlay.onclick = () => 
{
    if (audioPlay.classList.contains('active')) {
        audioItem.stop()
        audioPlay.classList.remove('active')
        clearTimeout(audioInterval)
    } else {
        audioItem.play()
        audioDuration = audioItem.duration
        setTimeout(()=>{
            audioPlay.classList.remove('active')
        }, audioDuration)
    }

};

langChange.onclick = () => {
    setTimeout( ()=>{view3d.update()}, 100 )
}

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

            pointElement.onclick = ( event ) => pointerdown( event.target, data.text[ language ], data.sound[ language ], data.description[ language ]);
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
    