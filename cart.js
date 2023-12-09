//Global Variables
const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';

var ct_pr_value = 0;
var coupon_code = 0;
var coupon_discount = 0;
var payable = 0;
var Delivery = 300;
const Total_PR_Cart = [];
const row_id_find = [];

{//search bar
    const search_icon_con = document.getElementById('search_icon_con');
    const search_icon = document.getElementById('search_icon');
    const search_input = document.getElementById('nav_search_id');
    const cross_icon = document.getElementById('cross_icon');
    search_icon.addEventListener('click', function () {
        search_icon_con.style.backgroundColor = 'White';
        search_input.style.opacity = '1';
        search_input.style.height = '15px';
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
        search_input.style.height = '15px';
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

{//Cart Products Lister
    const sheet_name = 'Cart';
    const range = 'A2:L';

    // Array to store SKU and Price information

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('cart_all_pr_H');
            var j = 0;
            data.values.forEach(async product => {
                const [Customer_Username, SKU, Variation_SKU, Quantity, Brand, title, imageUrl, Size, Flavor, mrp, dis, price] = product;

                ct_pr_value = ct_pr_value + parseInt(price, 10);
                row_id_find[j] = [Variation_SKU, j];
                j++;

                const cart_ind_pr_H = document.createElement('div');
                cart_ind_pr_H.classList.add('cart_ind_pr_H');

                const pr_img = document.createElement('img');
                pr_img.src = imageUrl;
                cart_ind_pr_H.appendChild(pr_img);

                const pr_text_data_con = document.createElement('div');
                pr_text_data_con.classList.add('pr_text_data_con');

                const ct_pr_brand = document.createElement('p');
                ct_pr_brand.classList.add('ct_pr_brand');
                ct_pr_brand.textContent = Brand;
                pr_text_data_con.appendChild(ct_pr_brand);

                const pr_title = document.createElement('h4');
                pr_title.textContent = title;
                pr_text_data_con.appendChild(pr_title);

                const pr_vr_C = document.createElement('div');
                pr_vr_C.classList.add('pr_vr_C');

                const vr_size = document.createElement('p');
                vr_size.innerHTML = `<strong>Size: </strong> ${Size}`;
                pr_vr_C.appendChild(vr_size);

                const vr_flavor = document.createElement('p');
                vr_flavor.innerHTML = `<strong>Flavor: </strong> ${Flavor}`;
                pr_vr_C.appendChild(vr_flavor);

                pr_text_data_con.appendChild(pr_vr_C);
                cart_ind_pr_H.appendChild(pr_text_data_con);

                const pr_price = document.createElement('p');
                pr_price.setAttribute('id', 'pr_price');
                pr_price.textContent = '₹ ' + price + "/-"
                cart_ind_pr_H.appendChild(pr_price);

                const quantityH = document.createElement('div');
                quantityH.setAttribute('id', 'quantityH');
                quantityH.classList.add('pr_pricing_con');

                const qtymin = document.createElement('div');
                qtymin.setAttribute('id', 'qtymin');
                qtymin.classList.add('qtybtn');
                if (parseInt(Quantity, 10) === 1) {
                    qtymin.classList.add('btninactive');
                } else {
                    qtymin.classList.add('btnactive');
                }
                qtymin.innerHTML = `<i class="fa-solid fa-minus fa-sm"></i>`
                quantityH.appendChild(qtymin);

                const qtyH = document.createElement('h3')
                qtyH.setAttribute('id', 'qtyH');
                qtyH.textContent = Quantity;
                quantityH.appendChild(qtyH);

                const qtymax = document.createElement('div');
                qtymax.setAttribute('id', 'qtymax');
                qtymax.classList.add('qtybtn');
                qtymax.classList.add('btnactive');
                qtymax.innerHTML = `<i class="fa-solid fa-plus fa-sm"></i>`
                quantityH.appendChild(qtymax);
                cart_ind_pr_H.appendChild(quantityH);

                const pr_total = document.createElement('p');
                pr_total.setAttribute('id', 'pr_total');
                pr_total.classList.add('pr_pricing_con')

                cart_ind_pr_H.appendChild(pr_total);

                updateTotalPrice();

                // Add event listeners to the qtymin and qtymax divs
                qtymax.addEventListener('click', () => {
                    const currentQty = parseInt(qtyH.textContent);
                    var new_QTY = currentQty + 1;
                    qtyH.textContent = new_QTY;
                    UpdateQTY(Variation_SKU, new_QTY)
                    const currentprice = parseInt(price, 10);
                    ct_pr_value = ct_pr_value + currentprice;

                    updateTotalPrice();

                    qtymin.classList.add('btnactive');
                    qtymin.classList.remove('btninactive');
                });

                qtymin.addEventListener('click', () => {
                    const currentQty = parseInt(qtyH.textContent);
                    if (currentQty > 1) {
                        var new_QTY = currentQty - 1;
                        qtyH.textContent = new_QTY;
                        UpdateQTY(Variation_SKU, new_QTY)
                        const currentprice = parseInt(price, 10);
                        ct_pr_value = ct_pr_value - currentprice;
                        console.log(ct_pr_value);

                        updateTotalPrice();
                    }
                    if (currentQty === 2) {
                        qtymin.classList.remove('btnactive');
                        qtymin.classList.add('btninactive');
                    }
                });

                // Function to update the total price based on the quantity
                function updateTotalPrice() {
                    pr_total.textContent = '₹ ' + (parseInt(qtyH.textContent) * price) + '/-';
                    subtotal_setter();
                }
                productList.appendChild(cart_ind_pr_H);
            });
            subtotal_setter();
        });
}

{//Quantity Updater
    function row_id_finder(VSKU) {
        for (var i = 0; i < row_id_find.length; i++) {
            if (row_id_find[i][0] == VSKU) {
                var row_id = row_id_find[i][1] + 2;
            }
        }
        return row_id;
    }

    function UpdateQTY(VSKU, Qty) {
        var row_id = row_id_finder(VSKU);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "put",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
                "row_id": row_id,
                "Variation_SKU": VSKU,
                "QTY": Qty
            })
        };

        fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Cart", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}

{//cart value Writer
    function subtotal_setter() {
        const ct_subtotal = document.querySelector('#ct_subtotal .value');
        ct_subtotal.textContent = '₹ ' + ct_pr_value + "/-";
        payable_write();
    }

    const CP_APP_BTN = document.getElementById('CP_APP_BTN');
    CP_APP_BTN.addEventListener('click', coupon_writter);

    function coupon_writter() {
        const sheet_name = 'Coupon';
        const range = 'A2:D';

        const coupon_input = document.getElementById('ct_cp_in');
        var coupon_code_in = coupon_input.value;
        if (coupon_code_in.trim() !== '') {
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    const ct_subtotal = document.querySelector('#ct_coupon_dis .value');
                    coupon_input.style.border = '1px solid white';

                    console.log(data.values)

                    data.values.forEach(coupon => {
                        const [Coupon_Code, Coupon_Title, Discount_Type, Discount_Value] = coupon;
                        if (Coupon_Code == coupon_code_in) {
                            coupon_input.style.border = '1px solid white';
                            coupon_code = coupon_code_in;
                            if (Discount_Type == "Percentage") {
                                coupon_discount = parseInt((parseInt(ct_pr_value, 10) / 100) * parseInt(Discount_Value, 10), 10);
                                ct_subtotal.textContent = '₹ ' + coupon_discount + '/-';
                                var message = `<h3>Hooray! Your coupon code '${coupon_code_in}' has been applied and you have received ₹ ${coupon_discount}/- off on your order</h3>
                                <h3 style="margin-top: 20px;">Thank you.</h3>`;
                                show_notification(message);
                                payable_write();
                            } else if (Discount_Type == "Amount") {
                                coupon_discount = Discount_Value
                                ct_subtotal.textContent = '₹ ' + coupon_discount + '/-';
                                payable_write();
                                var message = `<h3>Hooray! Your coupon code '${coupon_code_in}' has been applied and you have received ₹ ${coupon_discount}/- off on your order</h3>
                                <h3 style="margin-top: 20px;">Thank you.</h3>`;
                                show_notification(message);
                            } else {
                                coupon_input.style.border = '1px solid white';
                            }
                        } else {
                            coupon_input.style.border = '1px solid red';
                        }
                    })
                })
        } else {
            coupon_input.style.border = '1px solid red';
        }
    }

    document.querySelector('#ct_delivery_ch .value').textContent = '₹ ' + Delivery + '/-';

    function payable_write() {
        var ct_payable = document.querySelector('#ct_payable .value');
        payable = parseInt(ct_pr_value, 10) + parseInt(Delivery, 10) - parseInt(coupon_discount, 10);
        ct_payable.textContent = '₹ ' + payable + '/-';
    }
}

{//order writer
    async function getCurrentDateTime() {
        const now = new Date();
    
        // Get the date components
        const day = now.getDate();
        const month = now.getMonth() + 1; // Month is zero-based, so we add 1
        const year = now.getFullYear();
    
        // Get the time components
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
    
        // Format the date and time
        const formattedDateTime = `${padNumber(day)}/${padNumber(month)}/${year} ${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
    
        return formattedDateTime;
    }
    
    // Helper function to pad single-digit numbers with a leading zero
    function padNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    async function orderID() {
        const sheet_name = 'Orders';
        const range = 'C3:D';
        const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
        const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
    
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.values && data.values.length > 0) {
                const k = data.values.length;
                const orderId = Number(data.values[k - 1][0]); // Convert to number
                const neworderId = orderId + 1;
    
                return neworderId;
            } else {
                throw new Error("No data found in the response.");
            }
        } catch (error) {
            console.error('Error fetching or processing data:', error);
            throw error;
        }
    }
    
    async function Invoice() {
        const sheet_name = 'Orders';
        const range = 'C3:D';
        const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
        const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
    
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.values && data.values.length > 0) {
                const k = data.values.length;
                const InvoiceNo = Number(data.values[k - 1][1]); // Convert to number
                const newInvoiceNo = InvoiceNo + 1;

                return newInvoiceNo;
            } else {
                throw new Error("No data found in the response.");
            }
        } catch (error) {
            console.error('Error fetching or processing data:', error);
            throw error;
        }
    }
    
    async function arrayGet () {
        const sheet_name = 'Cart';
        const range = 'A2:L';
    
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`);
            const data = await response.json();

            var date_time = await getCurrentDateTime();
            var OrderID = await orderID();
            var Invoiceno = await Invoice();
            var j = 0;
    
            data.values.forEach(async product => {
                const [Customer_Username, SKU, Variation_SKU, Quantity, Brand, title, imageUrl, Size, Flavor, mrp, dis, price] = product;
                Total_PR_Cart [j] = [Customer_Username, date_time, OrderID, Invoiceno, Variation_SKU, imageUrl, Brand, title, mrp, dis, price, Quantity, price*Quantity];
                j++;
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    document.getElementById('place_order').addEventListener('click', async function () {
        await arrayGet ();
        Total_PR_Cart[0][13] = ct_pr_value;
        Total_PR_Cart[0][14] = coupon_code;
        Total_PR_Cart[0][15] = coupon_discount;
        Total_PR_Cart[0][16] = Delivery;
        Total_PR_Cart[0][17] = payable.toFixed(2);
        console.log(Total_PR_Cart);

                var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "post",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(Total_PR_Cart)
        };
        
        fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Orders", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            localStorage.setItem("sharedVariable", JSON.stringify(row_id_find));
            window.location.href = `check out.html?OrderId=${Total_PR_Cart[0][2]}&InvoiceNo=${Total_PR_Cart[0][3]}`;
        })
        .catch(error => console.log('error', error));

    });
    
}
