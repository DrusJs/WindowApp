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