// Supported languages
const languages = {
    "en": "Англійська",
    "ar": "Арабська",
    "bn": "Бенгальська",
    "vi": "В'єтнамська",
    "nl": "Голландська",
    "el": "Грецька",
    "da": "Данська",
    "es": "Іспанська",
    "it": "Італійська",
    "zh": "Китайська",
    "ko": "Корейська",
    "de": "Німецька",
    "no": "Норвезька",
    "pt": "Португальська",
    "ru": "Російська",
    "sw": "Суахілі",
    "tr": "Турецька",
    "uk": "Українська",
    "fi": "Фінська",
    "fr": "Французька",
    "ja": "Японська"
};

let inputLanguageCode = "en";
let outputLanguageCode = "ja";


// Default languages lists
const inputLanguagesList = document.querySelector(".selection-input-language-list");
const outputLanguagesList = document.querySelector(".selection-output-language-list");

const creatingListItems = (list, activeLanguageCode) => {
    for (let languageCode in languages) {
        const item = document.createElement("option");

        item.textContent = languages[languageCode];
        item.value = languageCode;

        if (languageCode === activeLanguageCode) {
            item.selected = true;
        }

        list.append(item);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    creatingListItems(inputLanguagesList, inputLanguageCode);
    creatingListItems(outputLanguagesList, outputLanguageCode);
});


// Language selection
inputLanguagesList.addEventListener("change", function (event) {
    inputLanguageCode = event.target.value;
});
outputLanguagesList.addEventListener("change", function (event) {
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

swapButton.addEventListener("click", function () {
    swapLanguages(inputLanguagesList, inputLanguageCode, outputLanguageCode);
    swapLanguages(outputLanguagesList, outputLanguageCode, inputLanguageCode);

    [inputLanguageCode, outputLanguageCode] = [outputLanguageCode, inputLanguageCode];
});


// Dynamic textarea
const textInput = document.getElementById("translator-input");

textInput.addEventListener("input", function (event) {
    const textarea = event.target;

    textarea.style.height = "auto";  // Сброс высоты под текст
    textarea.style.height = `${textarea.scrollHeight + 1}` + "px";
});