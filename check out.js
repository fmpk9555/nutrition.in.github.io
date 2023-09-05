

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
    if(document.getElementById('checkbox6') = checked) {
        
    }
}