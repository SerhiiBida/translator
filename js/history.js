'use strict'

import {deleteCookie, getCookie, setCookie} from "./cookies.js";


// Show history
const showRecordsButton = document.querySelector('.history-show-button');
const historyBlock = document.querySelector('.history-wrapper');
const recordsBlock = document.querySelector('.history-records');

const getHistory = () => {
    let history = {
        records: []
    };

    if (localStorage.hasOwnProperty('history')) {
        history = JSON.parse(localStorage.getItem('history'));
    }

    return history;
}

const loadRecordsToPage = (records, start = 0) => {
    for (let i = start; i < records.length; i++) {
        recordsBlock.insertAdjacentHTML('afterbegin',
            `<article class="history-record" data-index="${i}">
                    <div class="history-record-header">
                        <p>
                            ${records[i].inputLanguage} -> ${records[i].outputLanguage}
                        </p>
                        <p>
                            ${records[i].date}
                            <button class="history-record-delete-button">
                                <img src="img/close_32x32.png" alt="close">
                            </button>
                        </p>
                    </div>
                    <div class="history-record-body">
                        <p class="history-record-input-text">
                            ${records[i].inputText}
                        </p>
                        <p class="history-record-output-text">
                            ${records[i].outputText}
                        </p>
                    </div>
                </article>`
        );

        const deleteButton = recordsBlock.firstElementChild.querySelector('.history-record-delete-button');

        deleteButton.addEventListener('click', deleteRecord);
    }
}

const showRecords = () => {
    recordsBlock.innerHTML = '';

    if (historyBlock.classList.contains('show')) {
        historyBlock.classList.remove('show');
        return;
    }

    const history = getHistory();

    if (history.records.length) {
        loadRecordsToPage(history.records);
    }

    historyBlock.classList.add('show');
}

showRecordsButton.addEventListener('click', showRecords);

// deleteCookie('amountCharactersPerDay')
// deleteCookie('amountCharactersPerDayEndDate')

// Show amount of translated characters
const amountCharactersPerDayBlock = document.querySelector('.history-header-characters-per-day > p:last-child');

showRecordsButton.addEventListener('click', function () {
    if (!historyBlock.classList.contains('show')) {
        return;
    }

    const amountCharacters = getCookie('amountCharactersPerDay');

    if (amountCharacters) {
        amountCharactersPerDayBlock.textContent = amountCharacters + ' chars';
    } else {
        amountCharactersPerDayBlock.textContent = '0 chars';
    }
});


// Delete selected record
const deleteRecord = (event) => {
    const deleteButton = event.target;
    const record = deleteButton.closest('.history-record');

    const index = Number(record.getAttribute('data-index'));

    const history = getHistory();

    history.records.splice(index, 1);

    recordsBlock.innerHTML = '';

    if (history.records.length) {
        loadRecordsToPage(history.records);
    }

    localStorage.setItem('history', JSON.stringify(history));
}


// Delete all records
const deleteAllButton = document.querySelector('.history-delete-all-button');

deleteAllButton.addEventListener('click', function () {
    if (localStorage.hasOwnProperty('history')) {
        localStorage.removeItem('history');

        recordsBlock.innerHTML = '';
    }
});


export const saveRecord = (inputText, outputText, inputLanguage, outputLanguage) => {
    const history = getHistory();

    history.records.push({
        inputText: inputText,
        outputText: outputText,
        inputLanguage: inputLanguage,
        outputLanguage: outputLanguage,
        date: new Date().toLocaleString()
    });

    localStorage.setItem('history', JSON.stringify(history));
}

export const showRecord = () => {
    if (!historyBlock.classList.contains('show')) {
        return;
    }

    const history = getHistory();

    const records = history.records;

    if (records.length) {
        loadRecordsToPage(records, records.length - 1);
    }
}

// Save amount of translated characters
export const saveAmountCharacters = (amountCharacters) => {
    const amountCharactersPerDay = getCookie('amountCharactersPerDay');

    if (!amountCharactersPerDay) {
        const nowDate = new Date();
        const endDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, -nowDate.getTimezoneOffset() / 60);

        setCookie('amountCharactersPerDay', `${amountCharacters}`, {expires: endDate});
        setCookie('amountCharactersPerDayEndDate', `${endDate.toUTCString()}`, {expires: endDate});
        return;
    }

    let endDate = getCookie('amountCharactersPerDayEndDate');

    if (!endDate) {
        return;
    }

    setCookie('amountCharactersPerDay', `${+amountCharactersPerDay + amountCharacters}`, {expires: endDate});
}