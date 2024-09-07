const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
})

for(let select of dropdowns){
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amntVal = amount.value;
    console.log(amntVal);
    if(amntVal == "" || amntVal < 0){
        amntVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(URL);
        if(!response.ok) {
            throw new Error("Failed to fetch exchange rate");
        }
        let data = await response.json();
    } catch (error) {
        msg.innerText = "Error: Unable to fetch exchange rate.";
        msg.style.color = "red";
    }
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amntVal * rate;
    msg.innerText = `${amntVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})