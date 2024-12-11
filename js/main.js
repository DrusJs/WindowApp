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

if (headerActionButtons.length > 0) {
    headerActionButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.currentTarget.classList.toggle('active')
        })
    })
}

const modelConf2 = [
    [
        {
            title: `Плазматическая мембрана`,
            description: `Гибкая мембрана, окружающая цитоплазму клетки. Она регулирует обмен веществ между клеткой и окружающей средой и участвует в амебоидном движении.`,
        },
        {
            title: `Уроид`,
            description: `Это специализированная органелла амеб, которая находится в задней части клетки. Она участвует в регуляции и выведении продуктов метаболизма и внешних загрязняющих веществ из клетки. В процессе передвижения амебы уроид помогает в выделении токсичных веществ, тем самым обеспечивая защиту и поддержание внутреннего гомеостаза амебы.`,
        },
        {
            title: `Ядро`,
            description: `Содержит генетический материал амебы. Регулирует процессы жизнедеятельности клетки, включая размножение путем деления.`,
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
            title: `Пищеварительная вакуоль`,
            description: `Образуются в процессе фагоцитоза, когда амеба окружает и захватывает частицы пищи с помощью псевдоподий. Внутри вакуоли происходит расщепление пищевых частиц с помощью ферментов.`,
        },
    ],
    [
        {
            title: `Плазмалық мембрана `,
            description: `Жасушаның цитоплазмасын қоршап тұрған икемді мембрана. Ол жасуша мен қоршаған орта арасындағы зат алмасуды реттейді және амебоидты қозғалысқа қатысады.`,
        },
        {
            title: `Уроид`,
            description: `Бұл жасушаның артқы жағында орналасқан амебалардың арнайы органелласы. Ол жасушадан зат алмасу өнімдерін және сыртқы ластаушы заттарды реттеуге және шығаруға қатысады. Амебаның қозғалысы кезінде уроид улы заттардың бөлінуіне көмектеседі, сол арқылы амебаның ішкі гомеостазын қорғайды және сақтайды.`,
        },
        {
            title: `Ядро`,
            description: `Амебаның генетикалық материалы бар. Жасушаның өмірлік процестерін, онымен қоса ішінде бөліну арқылы көбеюін реттейді.`,
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
            title: `Асқорыту вакуолi`,
            description: `Фагоцитоз процесі кезінде, амеба псевдоподия көмегімен тамақ бөлшектерін қоршап, ұстағанда түзіледі. Вакуоль ішінде тамақ бөлшектері ферменттердің көмегімен ыдырайды.`,
        },
    ],
    [
        {
            title: `Plasma Membrane`,
            description: `A flexible membrane surrounding the cytoplasm of the cell. It regulates the exchange of substances between the cell and its environment and participates in amoeboid movement.`,
        },
        {
            title: `Uroid`,
            description: `A specialized organelle of amoebae located at the rear part of the cell. It participates in the regulation and excretion of metabolic products and external pollutants from the cell. During the movement of the amoeba, the uroid assists in the elimination of toxic substances, thus providing protection and maintaining the internal homeostasis of the amoeba.`,
        },
        {
            title: `Nucleus`,
            description: `Contains the genetic material of the amoeba. It regulates the life processes of the cell, including reproduction through division.`,
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
            title: `Digestive Vacuole`,
            description: `Forms during the process of phagocytosis, when the amoeba surrounds and captures food particles using pseudopodia. Inside the vacuole, the breakdown of food particles occurs with the help of enzymes.`,
        },
    ],
]

const titlePage = ['Амёба', 'Амёба', 'Amoeba']

const languageSelect = document.querySelector('.language-select')

if (languageSelect) {
    const selectOptions = languageSelect.querySelectorAll('.select-dropdown .value')
    const selectValue = languageSelect.querySelector('.select-head .value')

    languageSelect.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active')
    })

    selectOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('active')) {
                const active = languageSelect.querySelector('.value.active')
                const lang = e.currentTarget.dataset.lang

                active.classList.remove('active')
                e.currentTarget.classList.add('active')
                selectValue.innerHTML = e.currentTarget.innerHTML

                document.querySelectorAll('.offset-point').forEach((el, index) => {
                    let info = modelConf2[lang][index].title
                    el.innerHTML = info.replaceAll(' ', '</br >')
                })
                document.querySelector('.topic-title').innerHTML = titlePage[lang]
                document.querySelector('.footer-inner .title').innerHTML = titlePage[lang]
            }
        })
    })
}

const burgerButton = document.querySelector('.burger-button')
const burgerMenu = document.querySelector('.header-menu')

if (burgerButton) {
    burgerButton.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active')
        burgerMenu.classList.toggle('active')
    })
}

