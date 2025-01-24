const popupCloseButtons = document.querySelectorAll('.popup-close')

const burgerButton = document.querySelector('.burger-button')
const burgerMenu = document.querySelector('.header-menu')

if (burgerButton) {
    burgerButton.addEventListener('click', (e) => {
        
        e.currentTarget.classList.toggle('active')
        burgerMenu.classList.toggle('active')
        settingsContainer.classList.remove('active')
    })
}

export let language = "ru"

if (popupCloseButtons.length > 0) {
    popupCloseButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.currentTarget.closest('.popup-container').classList.remove('active')
            popupClose()
        })
    })
}

function popupClose() {
    if (document.querySelector('.offset-point.selected')) {
        document.querySelector('.offset-point.selected').classList.remove('selected')
        document.getElementById('play-sound').classList.remove('show')
    }
}




document.addEventListener('click', (event) => { 
    const popup = document.querySelector('.settings-dropdown')
    const isInsidePopup = popup && popup.contains(event.target)
    const play = document.querySelector('.js-settings-show')
    const isInsidePlay = play && play.contains(event.target)
    const slide = document.querySelector('.slide-panel')
    const isInsideSlide = slide && slide.contains(event.target)

    if (popup) {
        if (!isInsidePopup && !isInsidePlay) {
            popup.classList.remove('active')
            play.classList.remove('active')
        }
    }

    if (slide) {
        if (!isInsideSlide && !isDragging) {
            slide.style.transition = '200ms'
            slide.style.height = '40px'
    
            setTimeout(()=>{ slide.style.transition = 'none' }, 210)
        }
    }
});

const headerActionButtons = document.querySelectorAll('.action-button')
const settingsContainer = document.querySelector('.settings-dropdown')

if (headerActionButtons.length > 0) {
    headerActionButtons.forEach(button => {
        button.addEventListener('click', (e)=>{            
            if (e.currentTarget.classList.contains('js-settings-show')) {
                settingsContainer.classList.toggle('active')
                burgerMenu.classList.remove('active')
                burgerButton.classList.remove('active')      
            }

            if (e.currentTarget.classList.contains('sound-btn')) {
                let audioDuration = 0
                let audioInterval
                const audioItem = document.getElementById('audio')
                const audioPlay = document.getElementById('play-sound')

                if (audioPlay.classList.contains('active')) {
                    audioItem.pause()
                    clearTimeout(audioInterval)
                } else {
                    audioItem.currentTime = 0
                    audioItem.play()
                    audioDuration = Math.round(audioItem.duration*1000) + 2000

                    setTimeout(()=>{
                        audioPlay.classList.add('active')
                    }, 20)
                    audioInterval = setTimeout(()=>{
                        audioPlay.classList.remove('active')
                    }, audioDuration)
                }
            }
            e.currentTarget.classList.toggle('active')
        })
    })
}

const slidePanel = document.querySelector('.slide-panel')


if (slidePanel) {
    let isDragging = false
    let startY = 0
    let startBottom = 40
    
    const minBottom = 40
    let maxBottom = document.querySelector('.slide-text').scrollHeight + 100
    
    slidePanel.addEventListener('mousedown', (e) => {
        isDragging = true
        startY = e.clientY
        startBottom = parseInt(window.getComputedStyle(slidePanel).height)
        document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaY = startY - e.clientY
            let newBottom = startBottom + deltaY
    
            if (newBottom < minBottom) newBottom = minBottom
            if (newBottom > maxBottom) newBottom = maxBottom
    
            slidePanel.style.height = `${newBottom}px`
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false
            document.body.style.userSelect = ''
        }
    });
    
    slidePanel.addEventListener('touchstart', (e) => {
        const touch = e.touches[0]
        isDragging = true
        startY = touch.clientY
        startBottom = parseInt(window.getComputedStyle(slidePanel).height)
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0]
            const deltaY = startY - touch.clientY
            let newBottom = startBottom + deltaY
    
            if (newBottom < minBottom) newBottom = minBottom
            if (newBottom > maxBottom) newBottom = maxBottom
    
            slidePanel.style.height = `${newBottom}px`
        }
    });
    
    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

}




const partsContainer = document.querySelector('.parts-absolute')

if (partsContainer) {
    const partsToggleButtons = partsContainer.querySelectorAll('.primary-button')
    
    partsToggleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const self = e.currentTarget

            if (!self.classList.contains('active')) {
                const active = partsContainer.querySelector('.primary-button.active')

                if (active) { active.classList.remove('active') }
                self.classList.add('active')

            }

        })
    })
}

const toggleSettings = document.querySelectorAll('.js-toggle-settings')

if (toggleSettings.length > 0) {
    toggleSettings.forEach(container => {
        const buttons = Array.from(container.children)

        buttons.forEach(el => {
            el.addEventListener('click', (e)=>{
                const self = e.currentTarget
                const next = self.nextElementSibling
                const first = self.parentElement.firstElementChild
                
                self.classList.remove('active')
                if (next) {
                    next.classList.add('active')
                    initSettingsAction(container.dataset.type, next)
                } else {
                    first.classList.add('active')
                    initSettingsAction(container.dataset.type, first)
                }
            })
        })
    })
}

function initSettingsAction(type, item) {
    switch (type) {
        case 'language':
            changeLanguage(item.dataset.lang)
          break;
          case 'fontsize':
              changeFontSize(item.dataset.font)
            break;
        case 'backcolor':
            changeBackground(item.dataset.color)
          break;
        case 'theme':
            changeTheme()
          break;
      }
}

function changeBackground(color) {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        document.body.style.backgroundColor = color;
    }
}

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]')
    const active = document.querySelector('.offset-point.selected')
    language = lang

    elements.forEach(el => {
        const key = el.dataset.i18n;
        const text = key.split('.').reduce((o, i) => o[i], localeObject[lang])

        if (text) {
            el.textContent = text
        }
    });
    
    if (active) { active.click() }
}

function changeFontSize(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large')
    document.body.classList.add(`font-${size}`)
}

function changeTheme() {
    document.body.classList.toggle('dark-theme')
}

export const localeObject = {
    ru: {
            model: [
                        {
                            title: "Плазматическая мембрана",
                            description: "Гибкая мембрана, окружающая цитоплазму клетки. Она регулирует обмен веществ между клеткой и окружающей средой и участвует в амебоидном движении.",
                            audio: "sound/Плазматическая мембрана_рус.mp3"
                        },
                        {
                            title: "Уроид",
                            description: "Это специализированная органелла амеб, которая находится в задней части клетки. Она участвует в регуляции и выведении продуктов метаболизма и внешних загрязняющих веществ из клетки. В процессе передвижения амебы уроид помогает в выделении токсичных веществ, тем самым обеспечивая защиту и поддержание внутреннего гомеостаза амебы.",
                            audio: "sound/Уроид_рус.mp3"
                        },
                        {
                            title: "Ядро",
                            description: "Содержит генетический материал амебы. Регулирует процессы жизнедеятельности клетки, включая размножение путем деления.",
                            audio: "sound/Ядро_рус.mp3"
                        },
                        {
                            title: "Сократительная вакуоль",
                            description: "Специализированная органелла, задействованная в регуляции осмотического давления внутри клетки. Она аккумулирует избыток воды из цитоплазмы и периодически выталкивает ее наружу.",
                            audio: "sound/Сократительная вакуоль_рус.mp3"
                        },
                        {
                            title: "Псевдоподии (ложноножки)",
                            description: "Временные выросты цитоплазмы, используемые для передвижения и захвата пищи. Псевдоподии образуются благодаря течению цитоплазмы и способствуют амебоидному движению.",
                            audio: "sound/Псевдоподии (ложноножки)_рус.mp33"
                        },
                        {
                            title: "Пищеварительная вакуоль",
                            description: "Образуются в процессе фагоцитоза, когда амеба окружает и захватывает частицы пищи с помощью псевдоподий. Внутри вакуоли происходит расщепление пищевых частиц с помощью ферментов.",
                            audio: "sound/Пищеварительная вакуоль_рус.mp3"
                        },
                    ],
            settings: {
                language: "Язык",
                fontSize: "Размер шрифта",
                backgroundColor: "Цвет фона",
                theme: "Тема",
                orderModel: "Заказ 3D модели",
                help: "Помощь",
                feedback: "Обратная связь",
            },
            title: "Амёба", 
            slideText: "С другой стороны начало повседневной работы по формированию позиции требуют от нас анализа направлений прогрессивного развития. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения новых предложений. Не следует, однако забывать, что консультация с широким активом представляет собой интересный эксперимент проверки дальнейших направлений развития.",   
            setFont: {
                small: "Маленький",
                medium: "Средний",
                large: "Большой",
            },        
            setTheme: {
                light: "Светлая",
                dark: "Темная",
            },
            popup: {
                title: "Окно помощи",
                description: "",
                actionA: "Action 1",
                actionB: "Action 2"
            },
            sections: {
                1: "Раздел 1",
                2: "Раздел 2",
                3: "Раздел 3",
                4: "Раздел 4",
                5: "Раздел 5",
                6: "Раздел 6"
            },
            login: {
                email: "Почта",
                pass: "Пароль",
                passRepeat: "Повторите пароль",
                privacy: "Я подтверждаю, что ознакомился с политикой конфидециальности",
                btnSubmit: "Войти",
                btnReg: "Зарегистрироваться", 
            }
            
    },
    
    kz: {
        model: [
                    {
                        title: "Плазмалық мембрана",
                        description: "Жасушаның цитоплазмасын қоршап тұрған икемді мембрана. Ол жасуша мен қоршаған орта арасындағы зат алмасуды реттейді және амебоидты қозғалысқа қатысады.",
                        audio: "sound/Плазмалық мембрана_каз.mp3"
                    },
                    {
                        title: "Уроид",
                        description: "Бұл жасушаның артқы жағында орналасқан амебалардың арнайы органелласы. Ол жасушадан зат алмасу өнімдерін және сыртқы ластаушы заттарды реттеуге және шығаруға қатысады. Амебаның қозғалысы кезінде уроид улы заттардың бөлінуіне көмектеседі, сол арқылы амебаның ішкі гомеостазын қорғайды және сақтайды.",
                        audio: "sound/Уроид_каз.mp3"
                    },
                    {
                        title: "Ядро",
                        description: "Амебаның генетикалық материалы бар. Жасушаның өмірлік процестерін, онымен қоса ішінде бөліну арқылы көбеюін реттейді.",
                        audio: "sound/Ядро_каз.mp3"
                    },
                    {
                        title: "Жиырылғыш вакуолi",
                        description: "Жасуша ішіндегі осмостық қысымды реттеуге қатысатын арнайы органоид. Ол цитоплазмадағы артық суды жинайды және оны мезгіл сайын сыртқа шығарады.",
                        audio: "sound/Жиырылғыш вакуольi_каз.mp3"
                    },
                    {
                        title: "Псевдоподиялар",
                        description: "Цитоплазманың уақытша өсінділері қозғалыс және тағамды ұстау үшін пайдаланылады. Псевдоподиялар цитоплазма ағыны есебінен қалыптасады және амебоидты қозғалысқа ықпал етеді.",
                        audio: "sound/Псевдоподиялар_каз.mp3"
                    },
                    {
                        title: "Асқорыту вакуолi",
                        description: "Фагоцитоз процесі кезінде, амеба псевдоподия көмегімен тамақ бөлшектерін қоршап, ұстағанда түзіледі. Вакуоль ішінде тамақ бөлшектері ферменттердің көмегімен ыдырайды.",
                        audio: "sound/Асқорыту вакуолi_каз.mp3"
                    },
                ],
        settings: {
            language: "Язык",
            fontSize: "Қаріп өлшемі",
            backgroundColor: "Фон түсі",
            theme: "Түс тақырыбы",
            orderModel: "3D модельге тапсырыс",
            help: "Көмек",
            feedback: "Кері байланыс",
        },
        title: "Амёба", 
        slideText: "Екінші жағынан, позицияны қалыптастыру бойынша күнделікті жұмыстың басталуы бізден прогрессивті даму бағыттарын талдауды талап етеді. Дегенмен, тұрақты сандық өсім мен қызметіміздің ауқымы жаңа ұсыныстарды анықтауды және нақтылауды қажет ететінін ұмытпауымыз керек. Дегенмен, кең активпен кеңесу дамудың болашақ бағыттарын сынаудағы қызықты эксперимент екенін ұмытпау керек.",     
        setFont: {
            small: "Кішкентай",
            medium: "Орташа",
            large: "Үлкен",
        },        
        setTheme: {
            light: "Жарық",
            dark: "Қараңғы",
        },
        sections: {
            1: "1 Бөлім",
            2: "2 Бөлім",
            3: "3 Бөлім",
            4: "4 Бөлім",
            5: "5 Бөлім",
            6: "6 Бөлім"
        },
        login: {
            email: "Пошта",
            pass: "Құпия сөз",
            passRepeat: "Құпия сөзді қайталаңыз",
            privacy: "Мен құпиялылық саясатын оқығанымды растаймын",
            btnSubmit: "Жүйеге кіру",
            btnReg: "Тіркелу", 
        }
    },
    
    en: {
        model: [
                    {
                        title: "Plasma Membrane",
                        description: "A flexible membrane surrounding the cytoplasm of the cell. It regulates the exchange of substances between the cell and its environment and participates in amoeboid movement.",
                        audio: "sound/Plasma Membrane.mp3"                    
                    },
                    {
                        title: "Uroid",
                        description: "A specialized organelle of amoebae located at the rear part of the cell. It participates in the regulation and excretion of metabolic products and external pollutants from the cell. During the movement of the amoeba, the uroid assists in the elimination of toxic substances, thus providing protection and maintaining the internal homeostasis of the amoeba.",
                        audio: "sound/Uroid.mp3"                    
                    },
                    {
                        title: "Nucleus",
                        description: "Contains the genetic material of the amoeba. It regulates the life processes of the cell, including reproduction through division.",
                        audio: "sound/Nucleus.mp3"                    
                    },
                    {
                        title: "Contractile Vacuole",
                        description: "A specialized organelle involved in regulating the osmotic pressure inside the cell. It accumulates excess water from the cytoplasm and periodically expels it outward.",
                        audio: "sound/Contractile Vacuole.mp3"                    
                    },
                    {
                        title: "Pseudopodia",
                        description: "Temporary protrusions of the cytoplasm, used for movement and capturing food. Pseudopodia are formed by the flow of cytoplasm and facilitate amoeboid movement.",
                        audio: "sound/Pseudopodia.mp3"                    
                    },
                    {
                        title: "Digestive Vacuole",
                        description: "Forms during the process of phagocytosis, when the amoeba surrounds and captures food particles using pseudopodia. Inside the vacuole, the breakdown of food particles occurs with the help of enzymes.",
                        audio: "sound/Digestive Vacuole.mp3"                    
                    },
                ],
        settings: {
            language: "Language",
            fontSize: "Font Size",
            backgroundColor: "Background Color",
            theme: "Theme",
            orderModel: "3D Model Order",
            help: "Help",
            feedback: "Feedback",
        },
        title: "Amoeba",  
        slideText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",       
        setFont: {
            small: "Small",
            medium: "Medium",
            large: "Large",
        },        
        setTheme: {
            light: "Light",
            dark: "Dark",
        },
        sections: {
            1: "Part 1",
            2: "Part 2",
            3: "Part 3",
            4: "Part 4",
            5: "Part 5",
            6: "Part 6"
        },
        login: {
            email: "Email",
            pass: "Password",
            passRepeat: "Repeat apssword",
            privacy: "I confirm that I have read the privacy policy",
            btnSubmit: "Login",
            btnReg: "Registration", 
        }
    }
}