// Loading supported languages
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

const defaultLanguagesButtons = () => {
    const inputLanguage = document.querySelector(".selection-input-language");
    const outputLanguage = document.querySelector(".selection-output-language");

    inputLanguage.textContent = languages[inputLanguageIndex].name;
    outputLanguage.textContent = languages[outputLanguageIndex].name;

    inputLanguage.setAttribute("data-code-country", languages[inputLanguageIndex].code);
    outputLanguage.setAttribute("data-code-country", languages[outputLanguageIndex].code);
}

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
    const inputLanguagesList = document.querySelector(".selection-input-language-list");
    const outputLanguagesList = document.querySelector(".selection-output-language-list");

    creatingListItems(inputLanguagesList, inputLanguageIndex);
    creatingListItems(outputLanguagesList, outputLanguageIndex);
}

document.addEventListener("DOMContentLoaded", defaultLanguagesButtons);
document.addEventListener("DOMContentLoaded", defaultLanguagesLists);

// Dropdown list


// Dynamic textarea
const textInput = document.getElementById("translator-input");

textInput.addEventListener("input", function (event) {
    const textarea = event.target;

    textarea.style.height = "auto";  // Сброс высоты под текст
    textarea.style.height = `${textarea.scrollHeight + 1}` + "px";
});