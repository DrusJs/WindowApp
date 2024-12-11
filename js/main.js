const popupCloseButtons = document.querySelectorAll('.popup-close')

if (popupCloseButtons.length > 0) {
    popupCloseButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.currentTarget.closest('.popup-container').classList.remove('active')
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

                active.classList.remove('active')
                e.currentTarget.classList.add('active')
                selectValue.innerHTML = e.currentTarget.innerHTML
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

const popupContainer = document.querySelector('#popup-info')
const popupTitle = popupContainer.querySelector('.popup-title span')
const popupText = popupContainer.querySelector('.popup-text')

function changePopupInfo() {
    if (!popupContainer.classList.contains('active')) { popupContainer.classList.add('active') }

    popupTitle.innerHTML = ''
    popupText.innerHTML = ''
}