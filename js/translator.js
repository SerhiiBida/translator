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
    const inputLanguageSelection = document.querySelector(".selection-input-language-wrapper");
    const outputLanguageSelection = document.querySelector(".selection-output-language-wrapper");

    const inputLanguage = document.createElement("button");
    const outputLanguage = document.createElement("button");

    inputLanguage.classList.add("selection-input-language");
    outputLanguage.classList.add("selection-output-language");

    inputLanguage.textContent = languages[inputLanguageIndex].name;
    outputLanguage.textContent = languages[outputLanguageIndex].name;

    inputLanguage.setAttribute("data-code-country", languages[inputLanguageIndex].code);
    outputLanguage.setAttribute("data-code-country", languages[outputLanguageIndex].code);

    inputLanguageSelection.prepend(inputLanguage);
    outputLanguageSelection.append(outputLanguage);
}

document.addEventListener("DOMContentLoaded", defaultLanguagesButtons);


// Dynamic textarea
const textInput = document.getElementById("translator-input");

textInput.addEventListener("input", function (event) {
    const textarea = event.target;

    textarea.style.height = "auto";  // Сброс высоты под текст
    textarea.style.height = `${textarea.scrollHeight + 1}` + "px";
});