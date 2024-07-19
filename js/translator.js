'use strict'

import {addHistory} from "./history.js";

// Supported languages
const languages = {
    'auto': 'Не знаю',
    'en': 'Англійська',
    'ar': 'Арабська',
    'bn': 'Бенгальська',
    'vi': `В'єтнамська`,
    'nl': 'Голландська',
    'el': 'Грецька',
    'da': 'Данська',
    'es': 'Іспанська',
    'it': 'Італійська',
    'zh': 'Китайська',
    'ko': 'Корейська',
    'de': 'Німецька',
    'no': 'Норвезька',
    'pt': 'Португальська',
    'ru': 'Російська',
    'sw': 'Суахілі',
    'tr': 'Турецька',
    'uk': 'Українська',
    'fi': 'Фінська',
    'fr': 'Французька',
    'ja': 'Японська'
};

let inputLanguageCode = 'en';
let outputLanguageCode = 'ja';


// Default languages lists
const inputLanguagesList = document.querySelector('.selection-input-language-list');
const outputLanguagesList = document.querySelector('.selection-output-language-list');

const creatingListItems = (list, activeLanguageCode) => {
    for (let languageCode in languages) {
        const item = document.createElement('option');

        item.textContent = languages[languageCode];
        item.value = languageCode;

        if (languageCode === activeLanguageCode) {
            item.selected = true;
        }

        list.append(item);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    creatingListItems(inputLanguagesList, inputLanguageCode);
    creatingListItems(outputLanguagesList, outputLanguageCode);
});


// Language selection
inputLanguagesList.addEventListener('change', function (event) {
    inputLanguageCode = event.target.value;
});
outputLanguagesList.addEventListener('change', function (event) {
    outputLanguageCode = event.target.value;
});


// Swap languages
const swapButton = document.querySelector(".selection-swap-languages");

const swapLanguages = (select, oldCode, newCode) => {
    const list = select.querySelectorAll("option");

    list.forEach((item) => {
        const code = item.value;

        if (code === oldCode) {
            item.selected = false;
        }

        if (code === newCode) {
            item.selected = true;
        }
    });
}

swapButton.addEventListener('click', function () {
    swapLanguages(inputLanguagesList, inputLanguageCode, outputLanguageCode);
    swapLanguages(outputLanguagesList, outputLanguageCode, inputLanguageCode);

    [inputLanguageCode, outputLanguageCode] = [outputLanguageCode, inputLanguageCode];
});


// Dynamic textarea
const textInput = document.getElementById('translator-input');

textInput.addEventListener('input', function (event) {
    const textarea = event.target;

    textarea.style.height = 'auto';  // Сброс высоты под текст
    textarea.style.height = `${textarea.scrollHeight + 1}` + 'px';
});


// Translation
const RAPID_API_KEY = 'e42deb1a7amsh39fe1a63df9f61cp192bfbjsn4378f1d52d1e';
const RAPID_API_HOST = 'simple-translate2.p.rapidapi.com';

const inputTextarea = document.getElementById('translator-input');
const outputTextarea = document.getElementById('translator-output');

let translationTimer;

const getTranslation = async (text) => {
    const url = `https://simple-translate2.p.rapidapi.com/translate?source_lang=${inputLanguageCode}&target_lang=${outputLanguageCode}`;

    const sourceText = {
        sourceText: text
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': RAPID_API_HOST,
        },
        body: JSON.stringify(sourceText)
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        return result['data']['targetText'];
    } catch (error) {
        return 'Error...';
    }
}

const translator = async () => {
    const text = inputTextarea.value.trim();

    if (!text) {
        return;
    }
    const translatedText = await getTranslation(text);

    addHistory(text, translatedText, inputLanguageCode, outputLanguageCode);

    outputTextarea.value = translatedText;
}

inputTextarea.addEventListener('input', function () {
    // Сброс
    clearTimeout(translationTimer);

    outputTextarea.value = '...';

    translationTimer = setTimeout(translator, 1500);
});