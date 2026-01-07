// Select Elements
const amountEl = document.getElementById("amount");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const rateDisplay = document.getElementById("rate-display");
const resultDisplay = document.getElementById("result-display");
const btn = document.getElementById("convert-btn");

// Function to do the math and update UI
function updateValues() {
    // 1. Get Values
    const amount = parseFloat(amountEl.value);
    const from = fromEl.value;
    const to = toEl.value;

    // 2. Validation
    if (isNaN(amount) || amount <= 0) {
        rateDisplay.innerText = "Invalid Amount";
        resultDisplay.innerText = "0.00";
        return;
    }

    // 3. If same currency
    if (from === to) {
        rateDisplay.innerText = `1 ${from} = 1 ${to}`;
        resultDisplay.innerText = `${amount} ${to}`;
        return;
    }

    // 4. Fetch Rate
    // We fetch rate for 1 unit to get the multiplier
    const url = `https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`;

    resultDisplay.innerText = "Loading...";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[to]; // The exchange rate (e.g., 83.25)
            
            // Update Top Text: "1 USD = 83.25 INR"
            rateDisplay.innerText = `1 ${from} = ${rate.toFixed(2)} ${to}`;
            
            // Update Bottom Text: "Amount * Rate" (e.g., "10 * 83.25 = 832.50")
            const finalAmount = amount * rate;
            resultDisplay.innerText = `${finalAmount.toFixed(2)} ${to}`;
        })
        .catch(err => {
            resultDisplay.innerText = "Error";
            console.error(err);
        });
}

// 5. Add Listeners
// Update whenever user clicks button, changes dropdown, or types
btn.addEventListener("click", updateValues);
fromEl.addEventListener("change", updateValues);
toEl.addEventListener("change", updateValues);
amountEl.addEventListener("input", updateValues);

// 6. Run once on page load
updateValues();