{//page operations
    {//search bar
        const search_icon_con = document.getElementById('search_icon_con');
        const search_icon = document.getElementById('search_icon');
        const search_input = document.getElementById('nav_search_id');
        const cross_icon = document.getElementById('cross_icon');
        search_icon.addEventListener('click', function () {
            search_icon_con.style.backgroundColor = 'White';
            search_input.style.opacity = '1';
            search_input.style.height = '25px';
            search_input.style.width = '50%';
            search_icon.style.transform = 'rotate(135deg)';
            search_icon.style.zIndex = "-1";
            cross_icon.style.zIndex = "0";
            cross_icon.style.opacity = "1";
            cross_icon.style.transform = 'rotate(0deg)';
        })

        cross_icon.addEventListener('click', function () {
            search_icon_con.style.backgroundColor = 'rgb(241, 227, 164)';
            search_input.style.opacity = '0';
            search_input.style.height = '25px';
            search_input.style.width = '0';
            search_icon.style.transform = 'rotate(0deg)';
            search_icon.style.zIndex = "0";
            cross_icon.style.zIndex = "-1";
            cross_icon.style.transform = 'rotate(-135deg)';
        })
    };
    {//notification
        const notification = document.getElementById('Notification');
        const not_content = document.getElementById('not_content');
        const not_close_btn = document.getElementById('not_close_btn');

        not_close_btn.addEventListener('click', function () {
            notification.classList.add('not-hide');
            notification.classList.remove('not-show');
            not_content.innerHTML = ``;
        })

        function show_notification(content) {
            notification.classList.remove('not-hide');
            notification.classList.add('not-show');
            not_content.innerHTML = content;
        }
    }
}

const sharedVariable = localStorage.getItem("sharedVariable");
const receivedarray = JSON.parse(sharedVariable)
console.log(receivedarray); // Outputs: Hello from file1!

{//Page Writer
    const urlParams = new URLSearchParams(window.location.search);
    const order_ID = urlParams.get('OrderId');
    const invoice_no = urlParams.get('InvoiceNo');
    var row_id = 0;

    { //change input as per method
        document.addEventListener('DOMContentLoaded', function () {
            var paymentOptions = document.getElementById('pay_options');
            var paymentMethods = paymentOptions.querySelectorAll('input[type="radio"]');

            for (var i = 0; i < paymentMethods.length; i++) {
                paymentMethods[i].addEventListener('change', handlePaymentMethodChange);
            }
        });

        function handlePaymentMethodChange(event) {
            var selectedMethod = event.target.id.replace('_checkbox', '');
            var optionsEntry = document.getElementById('options_entery');
            var paymentMethodDivs = optionsEntry.querySelectorAll('.option');

            for (var i = 0; i < paymentMethodDivs.length; i++) {
                var currentDiv = paymentMethodDivs[i];
                if (currentDiv.id.includes(selectedMethod)) {
                    currentDiv.classList.remove('collapse_pay');
                } else {
                    currentDiv.classList.add('collapse_pay');
                }
            }
        }
    }

    {//Card Entery Formatter
        const cardNumberInput = document.getElementById('card-number');
        const expiryDateInput = document.getElementById('expiry-date');

        cardNumberInput.addEventListener('input', formatCardNumber);
        expiryDateInput.addEventListener('input', formatExpiryDate);

        function formatCardNumber() {
            let value = cardNumberInput.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            cardNumberInput.value = value;
            cardLogo.src = cardProvider; // Replace with actual card provider logos
        }

        function formatExpiryDate() {
            let value = expiryDateInput.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            expiryDateInput.value = value;
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
                for (var i = 0; i < data.values.length; i++) {
                    if (data.values[i][2] === order_ID) {
                        document.querySelector('#ct_subtotal .value').textContent = "₹ " + data.values[i][13] + "/-";
                        document.querySelector('#ct_coupon_dis .value').textContent = "₹ " + data.values[i][15] + "/-";
                        document.querySelector('#ct_delivery_ch .value').textContent = "₹ " + data.values[i][16] + "/-";
                        document.querySelector('#ct_payable .value').textContent = "₹ " + data.values[i][17] + "/-";
                        row_id = i + 2;
                        break;
                    }
                }
            });
    }

    {//write address and form inactive  
        var check_box = document.getElementById('checkbox_form_input');
        var shipAddressForm = document.getElementById('shipaddressForm');
        check_box.addEventListener('change', function () {
            if (check_box.checked) {
                shipAddressForm.classList.add('collapse');
            } else {
                shipAddressForm.classList.remove('collapse');
            }
        })

        document.getElementById('Add_com_btn').addEventListener('click', function () {
            // Get the data from the billing address form
            var billAddressForm = document.getElementById('billaddressForm'); // Updated form ID
            var billFormData = new FormData(billAddressForm);
            var billAddressData = {};
            billFormData.forEach(function (value, key) {
                billAddressData[key] = value;
            });

            // Check if the billing address form is filled
            if (!isFormFilled(billAddressData)) {
                var message = `<h3>Please fill your billing address.</h3>
                <h3 style="margin-top: 20px;">Thank you.</h3>`;
                show_notification(message);
                return;
            }

            // Check if the checkbox is checked
            var checkboxChecked = check_box.checked;

            // Get the data from the shipping address form
            var shipFormData = new FormData(shipAddressForm);
            var shipAddressData = {};
            shipFormData.forEach(function (value, key) {
                shipAddressData[key] = value;
            });

            // Check if the checkbox is not checked and the shipping address form is not filled
            if (!checkboxChecked && !isFormFilled(shipAddressData)) {
                var message = `<h3>Please fill your Shipping address or check the box if it is same as billing address.</h3>
                <h3 style="margin-top: 20px;">Thank you.</h3>`;
                show_notification(message);
                return;
            }

            // Combine all data
            var addressData = {
                "row_id": row_id,
                "ship_Customer Name": shipAddressData["ship_Customer Name"],
                "ship_Mobile no.": shipAddressData["ship_Mobile no."],
                "ship_Email ID": shipAddressData["ship_Email ID"],
                "ship_Address": shipAddressData["ship_Address"],
                "ship_City": shipAddressData["ship_City"],
                "ship_State": shipAddressData["ship_State"],
                "ship_Pincode": shipAddressData["ship_Pincode"],
                "ship_Country": shipAddressData["ship_Country"],
                "bil_Customer Name": billAddressData["bil_Customer Name"],
                "bil_Mobile no.": billAddressData["bil_Mobile no."],
                "bil_Email ID": billAddressData["bil_Email ID"],
                "bil_Address": billAddressData["bil_Address"],
                "bil_City": billAddressData["bil_City"],
                "bil_State": billAddressData["bil_State"],
                "bil_Pincode": billAddressData["bil_Pincode"],
                "bil_Country": billAddressData["bil_Country"],
                "Notes": document.querySelector('textarea[name="del_notes"]').value
            };

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "put",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify(addressData)
            };

            fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Orders", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

            const element = document.getElementById("payment_method");
            element.scrollIntoView({ behavior: "smooth" });
        });

        function isFormFilled(formData) {
            var formFilled = true;

            for (var key in formData) {
                var inputElement = document.querySelector('[name="' + key + '"]');
                if (formData[key] === "") {
                    formFilled = false;
                    inputElement.style.border = "1px solid red"; // Change border color to red
                } else {
                    inputElement.style.border = "1px solid white"; // Reset border color
                }
            }

            return formFilled;
        }

    }

    {//confirm order and update payment method
        document.getElementById("COD_SBT_btn").addEventListener("click", function () {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: "put",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify({
                    "row_id": row_id,
                    "Payment Method": "COD",
                    "Payment ref. No.": invoice_no,
                    "Status": "Complete"
                })
            };

            fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Orders", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        // If the response status is not ok, reject the promise with the error status
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text(); // Return the response text if successful
                })
                .then(result => {
                    // Task 1: Execute when the data is successfully written to the Google Sheet
                    console.log("Write to Google Sheet successful:", result);

                    // Additional tasks can be executed here

                    var not_mess = `<h3>Hooray! Your order has been placed and will be dispatched soon. You will receive tracking Id and other details via Whatsapp once it gets dispatched.</h3>
                        <h3 style="margin-top: 20px;">Thank you.</h3>`;
                    show_notification(not_mess);

                    for (var k = 0; k <receivedarray.length; k++){
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        var requestOptions = {
                            method: "delete",
                            headers: myHeaders,
                            redirect: "follow",
                        
                        };
    
                        fetch(`https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Cart&row_id=2`, requestOptions)
                            .then(response => response.text())
                            .then(result => console.log(result))
                            .catch(error => console.log('error', error));
                    }
                })
                .catch(error => {
                    // Task 2: Execute when there's an error writing to the Google Sheet
                    console.log('Error writing to Google Sheet:', error);

                    // Additional error handling tasks can be executed here
                });
        });

    }
}