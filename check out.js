const urlParams = new URLSearchParams(window.location.search);
const order_ID = urlParams.get('OrderId');
const invoice_no = urlParams.get('InvoiceNo');
var row_id = 0;

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
    const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
    const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
    const sheet_name = 'Orders';
    const range = "A2:AI";

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        for(var i =0; i < data.values.length; i++) {
            if(data.values[i][2] === order_ID){
                console.log(data.values[i]);
                document.getElementById("checkfinal").textContent = "Rs. " + data.values[i][13] + "/-";
                document.getElementById("checkdis").textContent = "Rs. " + data.values[i][14] + "/-";
                document.getElementById("checkcdis").textContent = "Rs. " + data.values[i][16] + "/-";
                document.getElementById("checkafees").textContent = "Rs. " + data.values[i][17] + "/-";
                document.getElementById("checktpay").textContent = "Rs. " + data.values[i][18] + "/-";
                row_id = i + 2;
                console.log(row_id);
                break;
            }
        }
    });
}

{//get form data
    document.getElementById("addressForm").addEventListener("submit", function(event) {
        event.preventDefault();
        // Fetch the form data
        const formData = new FormData(event.target);

        // Create an object to store the collected data
        const addressData = {};

        formData.forEach((value, key) => {
            addressData[key] = value;
        });

        console.log(addressData);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "put",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
                "row_id":row_id,
                "ship_Customer Name": addressData["ship_Customer Name"],
                "ship_Mobile no.": addressData["ship_Mobile no."],
                "ship_Email ID": addressData["ship_Email ID"],
                "ship_Address": addressData["ship_Address"],
                "ship_City": addressData["ship_City"],
                "ship_State": addressData["ship_State"],
                "ship_Pincode": addressData["ship_Pincode"],
                "ship_Country": addressData["ship_Country"],
                "bil_Customer Name": addressData["bil_Customer Name"],
                "bil_Mobile no.": addressData["bil_Mobile no."],
                "bil_Email ID": addressData["bil_Email ID"],
                "bil_Address": addressData["bil_Address"],
                "bil_City": addressData["bil_City"],
                "bil_State": addressData["bil_State"],
                "bil_Pincode": addressData["bil_Pincode"],
                "bil_Country": addressData["bil_Country"],
                "Notes": addressData["del_notes"]
            })
        };

        fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Orders", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        const element = document.getElementById("btn_con");
        element.scrollIntoView({ behavior: "smooth" });
    })
}

{//confirm order and update payment method
    document.getElementById("COD_SBT_btn").addEventListener("click", function(event) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "put",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
                "row_id":row_id,
                "Paymet Method": "COD",
                "Payment ref. No.": invoice_no,
                "Status": "Complete"
            })
        };

        fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Orders", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        const element = document.getElementById("btn_con");
        element.scrollIntoView({ behavior: "smooth" });
    });
}