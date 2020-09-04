const country_one = document.getElementById("currency-one");
const money_one = document.getElementById("amount-one");
const country_two = document.getElementById("currency-two");
const money_two = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

function huansuan() {
    const one = country_one.value;
    const two = country_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)
        .then(a => a.json())
        .then(data => {
            const bilv = data.rates[two];
            rate.innerText = `1 ${one} = ${bilv} ${two}`;
            money_two.value = (money_one.value * bilv).toFixed(2);
        });

}
country_one.addEventListener('click', huansuan);
money_one.addEventListener('input', huansuan);
country_two.addEventListener('click', huansuan);
money_two.addEventListener('input', huansuan);
swap.addEventListener('click', () => {
    const b = country_one.value;
    country_one.value = country_two.value;
    country_two.value = b;
    huansuan();
});
huansuan();