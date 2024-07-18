// Supported languages
const languages = [
    {name: "Англійська", code: "en"},
    {name: "Арабська", code: "ar"},
    {name: "Африкаанс", code: "af"},
    {name: "Бенгальська", code: "bn"},
    {name: "В'єтнамська", code: "vi"},
    {name: "Голландська", code: "nl"},
    {name: "Грецька", code: "el"},
    {name: "Данська", code: "da"},
    {name: "Іспанська", code: "es"},
    {name: "Італійська", code: "it"},
    {name: "Китайська", code: "zh"},
    {name: "Корейська", code: "ko"},
    {name: "Німецька", code: "de"},
    {name: "Норвезька", code: "no"},
    {name: "Португальська", code: "pt"},
    {name: "Російська", code: "ru"},
    {name: "Суахілі", code: "sw"},
    {name: "Турецька", code: "tr"},
    {name: "Українська", code: "uk"},
    {name: "Фінська", code: "fi"},
    {name: "Французька", code: "fr"},
    {name: "Японська", code: "ja"}
];

let inputLanguageIndex = 0;
let outputLanguageIndex = languages.length - 1;


// Default languages on buttons
const inputLanguageButton = document.querySelector(".selection-input-language");
const outputLanguageButton = document.querySelector(".selection-output-language");

const defaultLanguagesButtons = () => {
    inputLanguageButton.textContent = languages[inputLanguageIndex].name;
    outputLanguageButton.textContent = languages[outputLanguageIndex].name;

    inputLanguageButton.setAttribute("data-code-country", languages[inputLanguageIndex].code);
    outputLanguageButton.setAttribute("data-code-country", languages[outputLanguageIndex].code);
}

document.addEventListener("DOMContentLoaded", defaultLanguagesButtons);


// Default languages lists
const inputLanguagesList = document.querySelector(".selection-input-language-list");
const outputLanguagesList = document.querySelector(".selection-output-language-list");

const creatingListItems = (list, activeLanguageIndex) => {
    for (let i = 0; i < languages.length; i++) {
        if (i === activeLanguageIndex) {
            continue;
        }

        const item = document.createElement("li");

        item.textContent = languages[i].name;
        item.setAttribute("data-code-country", languages[i].code);

        list.append(item);
    }
}

const defaultLanguagesLists = () => {
    creatingListItems(inputLanguagesList, inputLanguageIndex);
    creatingListItems(outputLanguagesList, outputLanguageIndex);
}

document.addEventListener("DOMContentLoaded", defaultLanguagesLists);


// Dropdown list
const showListLanguages = (event) => {
    const button = event.target;

    if (button.classList.contains("selection-input-language")) {
        inputLanguagesList.classList.toggle("show-list");
        outputLanguagesList.classList.remove("show-list");
        return;
    }

    outputLanguagesList.classList.toggle("show-list");
    inputLanguagesList.classList.remove("show-list");
}

const closeListLanguages = (event) => {
    const element = event.target;

    if (inputLanguageButton !== element || inputLanguagesList !== element) {
        console.log(event.target)
        inputLanguagesList.classList.remove("show-list");
    }

    if (outputLanguageButton !== element || outputLanguagesList !== element) {
        outputLanguagesList.classList.remove("show-list");
    }
}

inputLanguageButton.addEventListener("click", showListLanguages);
outputLanguageButton.addEventListener("click", showListLanguages);

document.addEventListener("click", closeListLanguages);


// Dynamic textarea
const textInput = document.getElementById("translator-input");

textInput.addEventListener("input", function (event) {
    const textarea = event.target;

    textarea.style.height = "auto";  // Сброс высоты под текст
    textarea.style.height = `${textarea.scrollHeight + 1}` + "px";
});