'use strict'

// localStorage.clear();

export const addHistory = (inputText, outputText, inputLanguage, outputLanguage) => {
    let history = {
        records: []
    };

    if (localStorage.hasOwnProperty('history')) {
        history = JSON.parse(localStorage.getItem('history'));
    }

    history.records.push({
        inputText: inputText,
        outputText: outputText,
        inputLanguage: inputLanguage,
        outputLanguage: outputLanguage,
        date: new Date()
    });

    localStorage.setItem('history', JSON.stringify(history));
}