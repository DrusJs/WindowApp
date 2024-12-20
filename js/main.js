const popupCloseButtons = document.querySelectorAll('.popup-close')

if (popupCloseButtons.length > 0) {
    popupCloseButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.currentTarget.closest('.popup-container').classList.remove('active')
            if (document.querySelector('.offset-point.selected')) {
                document.querySelector('.offset-point.selected').classList.remove('selected')
            }
        })
    })
}

const headerActionButtons = document.querySelectorAll('.action-button')
const settingsContainer = document.querySelector('.settings-dropdown')

if (headerActionButtons.length > 0) {
    headerActionButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.currentTarget.classList.toggle('active')
            
            if (e.currentTarget.classList.contains('js-settings-show')) {
                settingsContainer.classList.toggle('active')
                burgerMenu.classList.remove('active')
                burgerButton.classList.remove('active')
                
            }
        })
    })
}

const slidePanel = document.querySelector('.slide-panel')
const slideBtn = document.querySelector('.button-slide')

let isDragging = false;
let startY = 0;
let startBottom = 60;

const minBottom = 60;
let maxBottom = document.querySelector('.slide-text').scrollHeight + 60

slidePanel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startBottom = parseInt(window.getComputedStyle(slidePanel).bottom);
    document.body.style.userSelect = 'none'; 
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaY = startY - e.clientY;
        let newBottom = startBottom + deltaY;
        console.log(deltaY, newBottom)

        if (newBottom < minBottom) newBottom = minBottom;
        if (newBottom > maxBottom) newBottom = maxBottom;

        slidePanel.style.height = `${newBottom}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
    }
});

slidePanel.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    isDragging = true;
    startY = touch.clientY;
    startBottom = parseInt(window.getComputedStyle(slidePanel).bottom);
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        const deltaY = startY - touch.clientY;
        let newBottom = startBottom + deltaY;

        if (newBottom < minBottom) newBottom = minBottom;
        if (newBottom > maxBottom) newBottom = maxBottom;

        slidePanel.style.height = `${newBottom}px`;
    }
});

document.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
    }
});


const burgerButton = document.querySelector('.burger-button')
const burgerMenu = document.querySelector('.header-menu')

if (burgerButton) {
    burgerButton.addEventListener('click', (e) => {
        
        e.currentTarget.classList.toggle('active')
        burgerMenu.classList.toggle('active')
        settingsContainer.classList.remove('active')
    })
}


const partsContainer = document.querySelector('.parts-absolute')
const partsToggleButtons = partsContainer.querySelectorAll('.primary-button')

if (partsContainer) {
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
    const elements = document.querySelectorAll('[data-i18n]');
    const active = document.querySelector('.offset-point.selected')

    elements.forEach(el => {
        const key = el.dataset.i18n;
        const text = key.split('.').reduce((o, i) => o[i], localeObject[lang]);

        if (text) {
            el.textContent = text;
        }
    });

    document.querySelectorAll('.offset-point').forEach((el, index) => {
        const info = localeObject[lang].model[index].title
        el.innerHTML = info.replaceAll(' ', '<br />');
    })
    
    console.log(active)
    if (active) { active.click() }
}

function changeFontSize(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
}

function changeTheme() {
    document.body.classList.toggle('dark-theme');
}

const localeObject = {
    ru: {
            model: [
                        {
                            title: "Плазматическая мембрана",
                            description: "Гибкая мембрана, окружающая цитоплазму клетки. Она регулирует обмен веществ между клеткой и окружающей средой и участвует в амебоидном движении.",
                        },
                        {
                            title: "Уроид",
                            description: "Это специализированная органелла амеб, которая находится в задней части клетки. Она участвует в регуляции и выведении продуктов метаболизма и внешних загрязняющих веществ из клетки. В процессе передвижения амебы уроид помогает в выделении токсичных веществ, тем самым обеспечивая защиту и поддержание внутреннего гомеостаза амебы.",
                        },
                        {
                            title: "Ядро",
                            description: "Содержит генетический материал амебы. Регулирует процессы жизнедеятельности клетки, включая размножение путем деления.",
                        },
                        {
                            title: "Сократительная вакуоль",
                            description: "Специализированная органелла, задействованная в регуляции осмотического давления внутри клетки. Она аккумулирует избыток воды из цитоплазмы и периодически выталкивает ее наружу.",
                        },
                        {
                            title: "Псевдоподии (ложноножки)",
                            description: "Временные выросты цитоплазмы, используемые для передвижения и захвата пищи. Псевдоподии образуются благодаря течению цитоплазмы и способствуют амебоидному движению.",
                        },
                        {
                            title: "Пищеварительная вакуоль",
                            description: "Образуются в процессе фагоцитоза, когда амеба окружает и захватывает частицы пищи с помощью псевдоподий. Внутри вакуоли происходит расщепление пищевых частиц с помощью ферментов.",
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
                first: "Раздел 1",
                second: "Раздел 2"
            }
            
    },
    
    kz: {
        model: [
                    {
                        title: "Плазмалық мембрана ",
                        description: "Жасушаның цитоплазмасын қоршап тұрған икемді мембрана. Ол жасуша мен қоршаған орта арасындағы зат алмасуды реттейді және амебоидты қозғалысқа қатысады.",
                    },
                    {
                        title: "Уроид",
                        description: "Бұл жасушаның артқы жағында орналасқан амебалардың арнайы органелласы. Ол жасушадан зат алмасу өнімдерін және сыртқы ластаушы заттарды реттеуге және шығаруға қатысады. Амебаның қозғалысы кезінде уроид улы заттардың бөлінуіне көмектеседі, сол арқылы амебаның ішкі гомеостазын қорғайды және сақтайды.",
                    },
                    {
                        title: "Ядро",
                        description: "Амебаның генетикалық материалы бар. Жасушаның өмірлік процестерін, онымен қоса ішінде бөліну арқылы көбеюін реттейді.",
                    },
                    {
                        title: "Жиырылғыш вакуолi",
                        description: "Жасуша ішіндегі осмостық қысымды реттеуге қатысатын арнайы органоид. Ол цитоплазмадағы артық суды жинайды және оны мезгіл сайын сыртқа шығарады.",
                    },
                    {
                        title: "Псевдоподиялар",
                        description: "Цитоплазманың уақытша өсінділері қозғалыс және тағамды ұстау үшін пайдаланылады. Псевдоподиялар цитоплазма ағыны есебінен қалыптасады және амебоидты қозғалысқа ықпал етеді.",
                    },
                    {
                        title: "Асқорыту вакуолi",
                        description: "Фагоцитоз процесі кезінде, амеба псевдоподия көмегімен тамақ бөлшектерін қоршап, ұстағанда түзіледі. Вакуоль ішінде тамақ бөлшектері ферменттердің көмегімен ыдырайды.",
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
            first: "1 Бөлім",
            second: "2 Бөлім"
        }
    },
    
    en: {
        model: [
                    {
                        title: "Plasma Membrane",
                        description: "A flexible membrane surrounding the cytoplasm of the cell. It regulates the exchange of substances between the cell and its environment and participates in amoeboid movement.",
                    },
                    {
                        title: "Uroid",
                        description: "A specialized organelle of amoebae located at the rear part of the cell. It participates in the regulation and excretion of metabolic products and external pollutants from the cell. During the movement of the amoeba, the uroid assists in the elimination of toxic substances, thus providing protection and maintaining the internal homeostasis of the amoeba.",
                    },
                    {
                        title: "Nucleus",
                        description: "Contains the genetic material of the amoeba. It regulates the life processes of the cell, including reproduction through division.",
                    },
                    {
                        title: "Contractile Vacuole",
                        description: "A specialized organelle involved in regulating the osmotic pressure inside the cell. It accumulates excess water from the cytoplasm and periodically expels it outward.",
                    },
                    {
                        title: "Pseudopodia",
                        description: "Temporary protrusions of the cytoplasm, used for movement and capturing food. Pseudopodia are formed by the flow of cytoplasm and facilitate amoeboid movement.",
                    },
                    {
                        title: "Digestive Vacuole",
                        description: "Forms during the process of phagocytosis, when the amoeba surrounds and captures food particles using pseudopodia. Inside the vacuole, the breakdown of food particles occurs with the help of enzymes.",
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
            first: "Part 1",
            second: "Part 2"
        }
    }
}