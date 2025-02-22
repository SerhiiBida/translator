'use strict'

import {saveRecord, showRecord, saveAmountCharacters, showAmountCharactersPerDay} from "./history.js";

// Supported languages
const languages = {
    'auto': 'Auto',
    'en': 'English',
    'ar': 'Arabic',
    'bn': 'Bengali',
    'vi': 'Vietnamese',
    'nl': 'Dutch',
    'el': 'Greek',
    'da': 'Danish',
    'es': 'Spanish',
    'it': 'Italian',
    'zh': 'Chinese',
    'ko': 'Korean',
    'de': 'German',
    'no': 'Norwegian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'sw': 'Swahili',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'fi': 'Finnish',
    'fr': 'French',
    'ja': 'Japanese'
};

let inputLanguageCode = 'en';
let outputLanguageCode = 'ja';


// Default languages lists
const inputLanguagesList = document.querySelector('.selection-input-language-list');
const outputLanguagesList = document.querySelector('.selection-output-language-list');

const createListItems = (list, activeLanguageCode, isOutputLanguagesList = false) => {
    for (let languageCode in languages) {
        if (isOutputLanguagesList && languageCode === 'auto') {
            continue;
        }

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
    createListItems(inputLanguagesList, inputLanguageCode);
    createListItems(outputLanguagesList, outputLanguageCode, true);
});


// Swap languages
const swapButton = document.querySelector(".selection-swap-languages");

const changeSelectedLanguage = (select, oldCode, newCode) => {
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

const swapLanguages = () => {
    if (outputTextarea.value) {
        // Swap text
        [inputTextarea.value, outputTextarea.value] = [outputTextarea.value, inputTextarea.value];
    }

    changeSelectedLanguage(inputLanguagesList, inputLanguageCode, outputLanguageCode);
    changeSelectedLanguage(outputLanguagesList, outputLanguageCode, inputLanguageCode);

    [inputLanguageCode, outputLanguageCode] = [outputLanguageCode, inputLanguageCode];
}

swapButton.addEventListener('click', function () {
    if (inputLanguageCode === 'auto') {
        return;
    }

    swapLanguages();
});


// Language selection
inputLanguagesList.addEventListener('change', function (event) {
    if (event.target.value === outputLanguageCode) {
        swapLanguages();
        return;
    }

    inputLanguageCode = event.target.value;

    if (inputTextarea.value) {
        startTranslator(0);
    }
});

outputLanguagesList.addEventListener('change', function (event) {
    if (event.target.value === inputLanguageCode) {
        swapLanguages();
        return;
    }

    outputLanguageCode = event.target.value;

    if (inputTextarea.value) {
        startTranslator(0);
    }
});


// Dynamic textarea
const inputTextarea = document.getElementById('translator-input');
const outputTextarea = document.getElementById('translator-output');

inputTextarea.addEventListener('input', function (event) {
    const textarea = event.target;

    textarea.style.height = 'auto';  // Сброс высоты под текст
    textarea.style.height = `${textarea.scrollHeight + 1}` + 'px';
});


// Amount characters in inputTextarea
const amountCharactersBlock = document.querySelector('.translator-input-info p');

inputTextarea.addEventListener('input', function () {
    const amountCharacters = inputTextarea.value.length;

    amountCharactersBlock.textContent = `${amountCharacters} / 2000`;
});


// Translation
const RAPID_API_KEY = 'e42deb1a7amsh39fe1a63df9f61cp192bfbjsn4378f1d52d1e';
const RAPID_API_HOST = 'simple-translate2.p.rapidapi.com';

let translationTimer;

const getOptions = (method, headers = {}, body) => {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    };
}

const getTranslation = async (text) => {
    const url = `https://simple-translate2.p.rapidapi.com/translate?source_lang=${inputLanguageCode}&target_lang=${outputLanguageCode}`;

    const sourceText = {
        sourceText: text
    }

    const options = getOptions('POST', {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
    }, sourceText);

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        return result['data']['targetText'];
    } catch (error) {
        return 'Error...';
    }
}

const translator = async () => {
    if (inputTextarea.value.length > 2000) {
        return;
    }

    const text = inputTextarea.value.trim();

    if (!text) {
        return;
    }

    const translatedText = await getTranslation(text);

    saveRecord(text, translatedText, languages[inputLanguageCode], languages[outputLanguageCode]);
    showRecord();

    saveAmountCharacters(inputTextarea.value.length);
    showAmountCharactersPerDay();

    outputTextarea.value = translatedText;

    outputTextarea.style.height = 'auto';
    outputTextarea.style.height = `${outputTextarea.scrollHeight + 1}` + 'px';
}

const startTranslator = (delay) => {
    // Reset
    clearTimeout(translationTimer);

    outputTextarea.value = '';

    outputTextarea.style.height = 'auto';
    outputTextarea.style.height = `${outputTextarea.scrollHeight + 1}` + 'px';

    translationTimer = setTimeout(translator, delay);
}

inputTextarea.addEventListener('input', function () {
    startTranslator(1500);
});