const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';

var i = 0;
var totalprice = 0;
var prices = [];
var final = 0;
var mode = 0;
var date_time = 0;
var InvoiceNo = 0;
var orderId = 0;
var Delivery = 300;
var Discount = 15;
var TotalSku = [];
var dis_and_pay = [];

var cartvalue = 0;
var flatoff = 0;
var coupon = 0;


const sheet_name = 'Cart';
const range = 'A2:L';

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
    const productList = document.getElementById('cart-list');

    data.values.forEach(product => {
        const [CName, SKU, Quantity, Brand, title, imageUrl, Size, Flavor, mrp, dis, price,] = product;

        const productElement = document.createElement('div');
        productElement.classList.add('cart-product');

        const product_mElement = document.createElement('div');
        product_mElement.classList.add('cart-product-m');

        const imgeElement = document.createElement('div');
        imgeElement.classList.add('img-con');
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imgeElement.appendChild(imageElement);
        product_mElement.appendChild(imgeElement);

        const text_cElement = document.createElement('div');
        text_cElement.classList.add('text-con');
        const BrandElement = document.createElement('h3');
        BrandElement.textContent = Brand;
        const titleElement = document.createElement('h2');
        titleElement.textContent = title.slice(0, 90)+'...';
        text_cElement.appendChild(BrandElement);
        text_cElement.appendChild(titleElement);

        const fla_size_cElement = document.createElement('div');
        fla_size_cElement.classList.add('fla-size-con');

        const flavorElement = document.createElement('h2');
        flavorElement.textContent = 'Flavour: ' + Flavor;
        fla_size_cElement.appendChild(flavorElement);

        const sizeElement = document.createElement('h2');
        sizeElement.classList.add('size-space-giver');
        sizeElement.textContent = 'Size: ' + Size;
        fla_size_cElement.appendChild(sizeElement);

        text_cElement.appendChild(fla_size_cElement);
        product_mElement.appendChild(text_cElement);

        productElement.appendChild(product_mElement);

        const qty_price_cElement = document.createElement('div');
        qty_price_cElement.classList.add('qty_price_con');
        
        const priceElement = document.createElement('h1');
        priceElement.classList.add('font-size');
        priceElement.textContent = price + '/-';
        qty_price_cElement.appendChild(priceElement);

        const QtyElement = document.createElement('h1');
        QtyElement.classList.add('font-size');
        QtyElement.textContent = Quantity;
        qty_price_cElement.appendChild(QtyElement);

        const totalElement = document.createElement('h1');
        totalElement.classList.add('font-size');
        totalElement.textContent = price*Quantity + '/-'
        qty_price_cElement.appendChild(totalElement);

        prices[i] = price*Quantity;
        TotalSku[i] = [CName, date_time, orderId, InvoiceNo, SKU, imageUrl, Brand, title, mrp, dis, price, Quantity, price*Quantity,];

        productElement.appendChild(qty_price_cElement);

        i++;

        productList.appendChild(productElement);

    });

    for (let i = 0; i < prices.length; i++) {
        totalprice = totalprice + prices[i];
    }
    const write = document.getElementById('sum-of');
    write.textContent = totalprice.toFixed(2);
    cartvalue = totalprice.toFixed(2);
});

const D_charge = document.getElementById('D-charge');
D_charge.textContent = Delivery.toFixed(2);

const D_DIS = document.getElementById('show-dis');
D_DIS.textContent = ' (' + Discount + '%) '

setTimeout(calculate, 1200);

const button = document.getElementById('coupon_apply');
button.addEventListener('click',calculate);


function calculate() {

    var total_final = totalprice.toFixed(2);

    const D_discount = document.getElementById('discount-D');
    D_discount.textContent = ((total_final/100)*Discount).toFixed(2);
    flatoff = ((total_final/100)*Discount).toFixed(2);

    var C_discount = document.getElementById('coupon-input').value;
    coupon = document.getElementById('coupon-input').value;

    const show = document.getElementById('show-dis2');
    show.textContent = ' (' + C_discount + '%)';

    const C_disc = document.getElementById('C_disc');
    C_disc.textContent = ((total_final/100)*C_discount).toFixed(2);

    const total = document.getElementById('total'); 
    total.textContent = ((total_final - ((total_final/100)*Discount) - ((total_final/100)*C_discount))+Delivery).toFixed(2);
    Check_out();
}

async function getDateTime() {
    await orderID_IvoiceNo();
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        month = '0'+month;
    }
    if(day.toString().length == 1) {
        day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        second = '0'+second;
    }   
    var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;   
    date_time = dateTime;

    console.log("Date and time loaded");
    
}

async function orderID_IvoiceNo () {
    const sheet_name = 'Orders';
    const range = 'C3:D';
    const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
    const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {

            console.log(data.values);

            var k = data.values.length;
            InvoiceNo = data.values[k-1][1];
            orderId = data.values[k-1][0];

            console.log("Invoice number and Order ID loaded")
    }   )
}


async function Check_out() {
    await getDateTime();
    dis_and_pay[0] = document.getElementById('coupon-input').value;
    dis_and_pay[1] = ((totalprice/100)*dis_and_pay[0]).toFixed(2);
    dis_and_pay[2] = ((totalprice - ((totalprice/100)*Discount) - ((totalprice/100)*dis_and_pay[0]))+Delivery).toFixed(2);
    for (var j = 0; j < TotalSku.length; j++) {
        TotalSku[j][1] = date_time;
        TotalSku[j][2] = parseFloat(orderId) + 1;
        TotalSku[j][3] = parseFloat(InvoiceNo) + 1;
    }

    TotalSku[0][13] = cartvalue;
    TotalSku[0][14] = flatoff;
    TotalSku[0][15] = dis_and_pay[0];
    TotalSku[0][16] = dis_and_pay[1];
    TotalSku[0][17] = Delivery.toFixed(2);
    TotalSku[0][18] = dis_and_pay[2];
    
}; 

function writeOrder () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(TotalSku)
    };
    
    fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Orders", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        window.location.href = `check out.html?OrderId=${TotalSku[0][2]}&InvoiceNo=${TotalSku[0][3]}`;
    })
    .catch(error => console.log('error', error));
}

setTimeout(Check_out, 2000);
const check_out_button = document.getElementById('check-out');
check_out_button.addEventListener('click', writeOrder);
    