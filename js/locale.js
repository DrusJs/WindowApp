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
        }
    }
}