// Supported languages
const languages = [
    {name: "Англійська", code: "en"},
    {name: "Арабська", code: "ar"},
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


// Default languages lists
const inputLanguagesList = document.querySelector(".selection-input-language-list");
const outputLanguagesList = document.querySelector(".selection-output-language-list");

const creatingListItems = (list, activeLanguageIndex) => {
    for (let i = 0; i < languages.length; i++) {
        const item = document.createElement("option");

        item.textContent = languages[i].name;
        item.value = languages[i].code;

        if (i === activeLanguageIndex) {
            item.selected = true;
        }

        list.append(item);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    creatingListItems(inputLanguagesList, inputLanguageIndex);
    creatingListItems(outputLanguagesList, outputLanguageIndex);
});


// Language selection
const languageSelection = (event) => {
    const item = event.target.value;

    console.log(item)
}

inputLanguagesList.addEventListener("change", languageSelection);
outputLanguagesList.addEventListener("change", languageSelection);


// Swap languages
const swapButton = document.querySelector(".selection-swap-languages");

const swapLanguages = (select, oldIndex, newIndex) => {
    const list = select.querySelectorAll("option");

    list.forEach((item, index) => {
        if (index === oldIndex) {
            item.selected = false;
        }

        if (index === newIndex) {
            item.selected = true;
        }
    });
}

swapButton.addEventListener("click", function () {
    swapLanguages(inputLanguagesList, inputLanguageIndex, outputLanguageIndex);
    swapLanguages(outputLanguagesList, outputLanguageIndex, inputLanguageIndex);

    [inputLanguageIndex, outputLanguageIndex] = [outputLanguageIndex, inputLanguageIndex];
});


// Dynamic textarea
const textInput = document.getElementById("translator-input");

textInput.addEventListener("input", function (event) {
    const textarea = event.target;

    textarea.style.height = "auto";  // Сброс высоты под текст
    textarea.style.height = `${textarea.scrollHeight + 1}` + "px";
});