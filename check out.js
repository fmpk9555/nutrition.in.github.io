{//for page effects
    // Add event listeners to all payment method buttons
document.getElementById("UPI_BTN").addEventListener("click", function() {
    collapseDiv("UPI_BTN", "upi_ent");
});

document.getElementById("Card_BTN").addEventListener("click", function() {
    collapseDiv("Card_BTN", "card_ent");
});

document.getElementById("Wallet_BTN").addEventListener("click", function() {
    collapseDiv("Wallet_BTN", "wallet_int");
});

document.getElementById("NetBank_BTN").addEventListener("click", function() {
    collapseDiv("NetBank_BTN", "netbanking_int");
});

document.getElementById("COD_BTN").addEventListener("click", function() {
    collapseDiv("COD_BTN", "COD_int");
});



const check_box = document.getElementById('checkbox_form_input');
check_box.addEventListener('click', change);

{//Card Enetery
    const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cardLogo = document.getElementById('card-logo');

cardNumberInput.addEventListener('input', formatCardNumber);
expiryDateInput.addEventListener('input', formatExpiryDate);

function formatCardNumber() {
    let value = cardNumberInput.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    cardNumberInput.value = value;

    let cardProvider = 'unknown';
    if (/^4/.test(value)) {
        cardProvider = 'Card-provider/Rupay (1).png';
    } else if (/^5|^5[1-5]/.test(value)) {
        cardProvider = 'Card-provider/mastercard.png';
    } else if (/^6|^60|^61|^62|^652[1-9]|^6530|^6531/.test(value)) {
        cardProvider = 'Card-provider/visacard.png';
    } else {
        cardProvider = 'Card-provider/CARD.png';
    }
    // Add more card provider checks here

    cardLogo.src = cardProvider; // Replace with actual card provider logos
}

function formatExpiryDate() {
    let value = expiryDateInput.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    expiryDateInput.value = value;
}

document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Add your payment processing or validation logic here
});
}

{//net banking select collapse
    const formNetbanking = document.getElementById('form_netbanking');
    const netBankListCon = document.getElementById('net_bank_list_con');

    formNetbanking.addEventListener('change', function() {
        // Get the selected radio input within the form
        const selectedInput = document.querySelector('input[name="net_bank_int"]:checked');

        // Remove the 'collapse_pay' class initially
        netBankListCon.classList.remove('collapse_pay');

        // Check if the selected radio input is checkbox6
        if (selectedInput && selectedInput.id === 'checkbox6') {
            // If checkbox6 is selected, remove the 'collapse_pay' class again
            netBankListCon.classList.remove('collapse_pay');
        } else {
            // If any other radio input is selected, add the 'collapse_pay' class
            netBankListCon.classList.add('collapse_pay');
        }
    });
}



//Functions
function change() {
    if (check_box.checked) {
        var status = document.getElementById('billing_form_con');
        status.classList.add('collapse');
    } else {
        var status = document.getElementById('billing_form_con');
        status.classList.remove('collapse');
    }
}

function netbankother() {
    if(document.getElementById('checkbox6') = selected) {
        document.getElementById('net_bank_list_con').textContent = "Ram";
    } else {
        document.getElementById('net_bank_list_con').textContent = "Shyam";
    }
}

function collapseDiv(clickedButtonId, divId) {
    const clickedButton = document.getElementById(clickedButtonId);
    const targetDiv = document.getElementById(divId);

    // Add the 'collapse_pay' class to all divs except the target div
    const allDivs = document.querySelectorAll("#options_entery .option");
    allDivs.forEach((div) => {
        if (div !== targetDiv) {
            div.classList.add("collapse_pay");
        } else if (div == targetDiv) {
            div.classList.remove("collapse_pay");
        }
    });

    // Remove the 'collapse_pay' class from the target div
    targetDiv.classList.remove("collapse_pay");
}
}

{//data fetch
    const urlParams = new URLSearchParams(window.location.search);
    const order_ID = urlParams.get('OrderId');
    const invoice_no = urlParams.get('InvoiceNo');
    const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
    const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
    const sheet_name = 'Orders';
    const range = "A3:AI";

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        for(var i =0; i < data.values.length; i++) {
            if(data.values[i][2] === order_ID){
                console.log(data.values[i]);
                break;
            }
        }
    });
}