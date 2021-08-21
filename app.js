const password = document.querySelector('.form__password');
password.addEventListener('input', (e) => {
    const inputValue = e.target.value
    checkPasswordLevel (inputValue)
})
let strenth
const maxStrength = 5
function checkPasswordLevel(value) {
    strength = 0
    // Regular expressions for each field
    const charactersRegex = new RegExp('(?=.{6,})').test(value) ? strength++ : null
    const lowerCaseRegex = new RegExp('(?=.*[a-z])').test(value) ? strength++ : null
    const upperCaseRegex = new RegExp('(?=.*[A-Z])').test(value) ? strength++ : null
    const numberRegex = new RegExp('(?=.*[0-9])').test(value) ? strength++ : null
    const specialsRegex =new RegExp('(?=.*[@./*?_-])').test(value) ? strength++ : null
    changeProgressBarWidth ()

    // li Eements, this is to cross out the elements
    const characters = document.querySelector('#characters');
    const lowerCase = document.querySelector('#lowercase');
    const upperCase = document.querySelector('#uppercase');
    const numbers = document.querySelector('#numbers');
    const specials = document.querySelector('#specials');
    dynamicallyCrossOut(charactersRegex, characters)
    dynamicallyCrossOut(lowerCaseRegex, lowerCase)
    dynamicallyCrossOut(upperCaseRegex, upperCase)
    dynamicallyCrossOut(numberRegex, numbers)
    dynamicallyCrossOut(specialsRegex, specials)
}

function dynamicallyCrossOut (expression, selector) {
    // Si el selector existe
    if(selector !== null) {
        if(expression !== null) {
            selector.classList.add('form__item--active')
        } else {
            selector.classList.remove('form__item--active')
        }
    }
}

function changeProgressBarWidth() {
    // El width dinámico de la carga
    const progressBar = document.querySelector('.form__progressbar');
    const currentProgress = progressBar.querySelector('.form__progress')
    if(calculatePercent(strength, maxStrength, 100)) {
        progressBar.dataset.pass = 'Strong'
        progressBar.className = 'form__progressbar strong'
        currentProgress.style.width = '100%'
    }

    if(calculatePercent(strength, maxStrength, 90)) {
        progressBar.dataset.pass = 'Good'
        progressBar.className = 'form__progressbar good'
        currentProgress.style.width = '75%'
    }

    if(calculatePercent(strength, maxStrength, 60)) {
        progressBar.dataset.pass = 'Medium'
        progressBar.className = 'form__progressbar medium'
        currentProgress.style.width = '50%'
    }

    if(calculatePercent(strength, maxStrength, 40)) {
        progressBar.dataset.pass = 'Weak'
        progressBar.className = 'form__progressbar weak'
        currentProgress.style.width = '25%'
    }

    if(calculatePercent (strength, maxStrength, 0)) {
        progressBar.dataset.pass = 'Level'
        progressBar.className = 'form__progressbar good'
        currentProgress.style.width = '0'
    }
}


function calculatePercent (strength, maxStrength, percent) {
    // Conversión para sacar el 100% de cualquier cifra
    return (strength * 100 / maxStrength) <= percent
}