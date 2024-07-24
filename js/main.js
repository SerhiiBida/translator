'use strict'


const changeThemeButton = document.querySelector('.site-theme-button');

const imgThemeDark = document.querySelector('.site-theme-dark');
const imgThemeLight = document.querySelector('.site-theme-light');

// Default theme
document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.hasOwnProperty('defaultTheme')) {
        localStorage.setItem('defaultTheme', 'light');

        imgThemeDark.classList.add('show-img');
        return;
    }

    const defaultTheme = localStorage.getItem('defaultTheme');

    if (defaultTheme === 'dark') {
        document.body.classList.add('dark');
        imgThemeLight.classList.add('show-img');
    } else {
        imgThemeDark.classList.add('show-img');
    }
})

// Change  theme
changeThemeButton.addEventListener('click', function () {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        imgThemeLight.classList.add('show-img');
        imgThemeDark.classList.remove('show-img');

        localStorage.setItem('defaultTheme', 'dark');
        return;
    }

    imgThemeDark.classList.add('show-img');
    imgThemeLight.classList.remove('show-img');

    localStorage.setItem('defaultTheme', 'light');
});