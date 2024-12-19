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
            
            if (e.currentTarget.classList.contains('js-settings-show')) {
                document.querySelector('.settings-dropdown').classList.toggle('active')
            }
        })
    })
}



const titlePage = ['Амёба', 'Амёба', 'Amoeba']

const languageSelect = document.querySelector('.language-select')

// if (languageSelect) {
//     const selectOptions = languageSelect.querySelectorAll('.select-dropdown .value')
//     const selectValue = languageSelect.querySelector('.select-head .value')

//     languageSelect.addEventListener('click', (e)=>{
//         e.currentTarget.classList.toggle('active')
//     })

//     selectOptions.forEach(option => {
//         option.addEventListener('click', (e) => {
//             if (!e.currentTarget.classList.contains('active')) {
//                 const active = languageSelect.querySelector('.value.active')
//                 const lang = e.currentTarget.dataset.lang

//                 active.classList.remove('active')
//                 e.currentTarget.classList.add('active')
//                 selectValue.innerHTML = e.currentTarget.innerHTML

//                 document.querySelectorAll('.offset-point').forEach((el, index) => {
//                     let info = modelConf2[lang][index].title
//                     el.innerHTML = info.replaceAll(' ', '<br />')
//                 })
//                 document.querySelector('.footer-inner .title').innerHTML = titlePage[lang]

                
//                 if (document.querySelector('.popup-container.active')) {
//                     document.querySelector('.popup-container.active').classList.remove('active')
//                 }
//                 if (document.querySelector('.offset-point.selected')) {
//                     document.querySelector('.offset-point.selected').classList.remove('selected')
//                 }
//             }
//         })
//     })
// }

const burgerButton = document.querySelector('.burger-button')
const burgerMenu = document.querySelector('.header-menu')

if (burgerButton) {
    burgerButton.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active')
        burgerMenu.classList.toggle('active')
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
            changeFontSize(item.dataset.theme)
          break;
      }
}

function changeBackground(color) {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        body.style.backgroundColor = color;
    }
}

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
        const key = el.dataset.i18n;
        const text = key.split('.').reduce((o, i) => o[i], localeObject[lang]);

        if (text) {
            el.textContent = text;
        }
    });
}

function changeFontSize(size) {
    body.classList.remove('font-small', 'font-medium', 'font-large');
    body.classList.add(`font-${size}`);
}

function changeTheme(theme) {
    body.classList.toggle('dark-theme', theme === 'dark');
}