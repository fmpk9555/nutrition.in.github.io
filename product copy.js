{//search bar
    const search_icon_con = document.getElementById('search_icon_con');
    const search_icon = document.getElementById('search_icon');
    const search_input = document.getElementById('nav_search_id');
    const cross_icon = document.getElementById('cross_icon');
    search_icon.addEventListener('click', function() {
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

    cross_icon.addEventListener('click', function() {
        search_icon_con.style.backgroundColor = 'rgb(241, 227, 164)';
        search_input.style.opacity = '0';
        search_input.style.height = '15px';
        search_input.style.width = '0';
        search_icon.style.transform = 'rotate(0deg)';
        search_icon.style.zIndex = "0";
        cross_icon.style.zIndex = "-1";
        cross_icon.style.transform = 'rotate(-135deg)';
    })
}


{//Page Operations
    const urlParams = new URLSearchParams(window.location.search);
    const sSKU = urlParams.get('SKU');

    const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
    const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
    var rel_Range = 0;
    const rel_sheet_name = 'Related Products';

    {
    const sheet_name = 'Products';
    const range = 'A3:BU';
    var username= 'good';

    var zoom_img = 0;

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.values);

            data.values.Each(product => {
                const [ram, sam, pam, nam, SKU,Brand, title, mrp, imageUrl, price, dis, rating, ] = product;

            if (sSKU = SKU ) {

                {//Product Images
                    zoom_img = data.values[i+1][25];

                    img_setter ();

                    const pr_img_1 = document.getElementById('pr-img-1');
                    pr_img_1.src = data.values[i+1][25];

                    const pr_img_2 = document.getElementById('pr-img-2');
                    pr_img_2.src = data.values[i+1][26];

                    const pr_img_3 = document.getElementById('pr-img-3');
                    pr_img_3.src = data.values[i+1][27];

                    const pr_img_4 = document.getElementById('pr-img-4');
                    pr_img_4.src = data.values[i+1][28];

                    const pr_img_5 = document.getElementById('pr-img-5');
                    pr_img_5.src = data.values[i+1][29];

                    const pr_img_6 = document.getElementById('pr-img-6');
                    pr_img_6.src = data.values[i+1][30];

                    const pr_img_7 = document.getElementById('pr-img-7');
                    pr_img_7.src = data.values[i+1][31];

                    const pr_img_8 = document.getElementById('pr-img-8');
                    pr_img_8.src = data.values[i+1][32];
                }
                const brandname = document.getElementById('pr_brand_name');
                brandname.textContent = data.values[i+1][9];

                const productName = document.getElementById('pr_name');
                productName.textContent = data.values[i+1][10];

                const productratingcon = document.getElementById('pr_hero_rating');
                for (var j = 0; j < 5; j++){
                    const stars = document.createElement('div');
                    stars.classList.add('stars');
                    if (j < data.values[i+1][46]){
                        stars.classList.add('golden');
                    }
                    productratingcon.appendChild(stars);
                }

                {//for Product Reviews
                    {//review 1
                        const review1_pic = document.querySelector('#review-1 .rew-pro-pic');
                        if (data.values[i+1][48]==""){
                            review1_pic.innerHTML = `<i class="fa-regular fa-circle-user fa-3x"></i>`;
                        } else { 
                            review1_pic.innerHTML = `<img src="${data.values[i+1][48]}" alt="image">`;
                        }

                        const review1_username = document.querySelector('#review-1 .id-con-rew h1');
                        review1_username.textContent = data.values[i+1][49];

                        const review1_usernote = document.querySelector('#review-1 .id-con-rew p');
                        review1_usernote.textContent = data.values[i+1][50];

                        {//review 1 rating
                                        const review1_rating_stars = document.querySelector('#review-1 #ind-stars');
                                        if (data.values[i+1][51] == 1){
                                            review1_rating_stars.innerHTML = `
                                            <div id="star">
                                            <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                            <i class="fa-solid fa-star fa-1x star-2"></i>
                                            <i class="fa-solid fa-star fa-1x star-3"></i>
                                            <i class="fa-solid fa-star fa-1x star-4"></i>
                                            <i class="fa-solid fa-star fa-1x star-5"></i>
                                            </div>`
                                            } else if (data.values[i+1][51] == 2) {
                                                review1_rating_stars.innerHTML = `
                                                <div id="star">
                                                <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                <i class="fa-solid fa-star fa-1x star-3"></i>
                                                <i class="fa-solid fa-star fa-1x star-4"></i>
                                                <i class="fa-solid fa-star fa-1x star-5"></i>
                                                </div>`
                                                } else if (data.values[i+1][51] == 3) {
                                                    review1_rating_stars.innerHTML = `
                                                    <div id="star">
                                                    <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                    <i class="fa-solid fa-star fa-1x star-4"></i>
                                                    <i class="fa-solid fa-star fa-1x star-5"></i>
                                                    </div>`
                                                    } else if (data.values[i+1][51] == 4) {
                                                        review1_rating_stars.innerHTML = `
                                                        <div id="star">
                                                        <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                        <i class="fa-solid fa-star fa-1x star-5"></i>
                                                        </div>`
                                                        } else if (data.values[i+1][51] == 5) {
                                                            review1_rating_stars.innerHTML = `
                                                            <div id="star">
                                                            <i class="fa-solid fa-star fa-1x     star-1"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-5"></i>
                                                            </div>`
                                                            }
                            }

                        const review1_description = document.querySelector('#review-1 #rew-description');
                        review1_description.textContent = data.values[i+1][52];
                    }

                    {//review 2
                        const review1_pic = document.querySelector('#review-2 .rew-pro-pic');
                        if (data.values[i+1][53]==""){
                            review1_pic.innerHTML = `<i class="fa-regular fa-circle-user fa-3x"></i>`;
                        } else {
                            review1_pic.innerHTML = `<img id="image3_rew" src="${data.values[i+1][53]}" alt="image">`
                        }

                        const review1_username = document.querySelector('#review-2 .id-con-rew h1');
                        review1_username.textContent = data.values[i+1][54];

                        const review1_usernote = document.querySelector('#review-2 .id-con-rew p');
                        review1_usernote.textContent = data.values[i+1][55];

                        {//review 2 rating
                                        const review1_rating_stars = document.querySelector('#review-2 #ind-stars');
                                        if (data.values[i+1][56] == 1){
                                            review1_rating_stars.innerHTML = `
                                            <div id="star">
                                            <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                            <i class="fa-solid fa-star fa-1x star-2"></i>
                                            <i class="fa-solid fa-star fa-1x star-3"></i>
                                            <i class="fa-solid fa-star fa-1x star-4"></i>
                                            <i class="fa-solid fa-star fa-1x star-5"></i>
                                            </div>`
                                            } else if (data.values[i+1][56] == 2) {
                                                review1_rating_stars.innerHTML = `
                                                <div id="star">
                                                <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                <i class="fa-solid fa-star fa-1x star-3"></i>
                                                <i class="fa-solid fa-star fa-1x star-4"></i>
                                                <i class="fa-solid fa-star fa-1x star-5"></i>
                                                </div>`
                                                } else if (data.values[i+1][56] == 3) {
                                                    review1_rating_stars.innerHTML = `
                                                    <div id="star">
                                                    <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                    <i class="fa-solid fa-star fa-1x star-4"></i>
                                                    <i class="fa-solid fa-star fa-1x star-5"></i>
                                                    </div>`
                                                    } else if (data.values[i+1][56] == 4) {
                                                        review1_rating_stars.innerHTML = `
                                                        <div id="star">
                                                        <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                        <i class="fa-solid fa-star fa-1x star-5"></i>
                                                        </div>`
                                                        } else if (data.values[i+1][56] == 5) {
                                                            review1_rating_stars.innerHTML = `
                                                            <div id="star">
                                                            <i class="fa-solid fa-star fa-1x     star-1"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-5"></i>
                                                            </div>`
                                                            }
                            }

                        const review1_description = document.querySelector('#review-2 #rew-description');
                        review1_description.textContent = data.values[i+1][57];
                    }

                    {//review 3
                        const review1_pic = document.querySelector('#review-3 .rew-pro-pic');
                        if (data.values[i+1][58]==""){
                            review1_pic.innerHTML = `<i class="fa-regular fa-circle-user fa-3x"></i>`;
                        } else {
                            review1_pic.innerHTML = `<img id="image3_rew" src="${data.values[i+1][58]}" alt="image">` 
                        }

                        const review1_username = document.querySelector('#review-3 .id-con-rew h1');
                        review1_username.textContent = data.values[i+1][59];

                        const review1_usernote = document.querySelector('#review-3 .id-con-rew p');
                        review1_usernote.textContent = data.values[i+1][60];

                        {//review 3 rating
                                        const review1_rating_stars = document.querySelector('#review-3 #ind-stars');
                                        if (data.values[i+1][61] == 1){
                                            review1_rating_stars.innerHTML = `
                                            <div id="star">
                                            <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                            <i class="fa-solid fa-star fa-1x star-2"></i>
                                            <i class="fa-solid fa-star fa-1x star-3"></i>
                                            <i class="fa-solid fa-star fa-1x star-4"></i>
                                            <i class="fa-solid fa-star fa-1x star-5"></i>
                                            </div>`
                                            } else if (data.values[i+1][61] == 2) {
                                                review1_rating_stars.innerHTML = `
                                                <div id="star">
                                                <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                <i class="fa-solid fa-star fa-1x star-3"></i>
                                                <i class="fa-solid fa-star fa-1x star-4"></i>
                                                <i class="fa-solid fa-star fa-1x star-5"></i>
                                                </div>`
                                                } else if (data.values[i+1][61] == 3) {
                                                    review1_rating_stars.innerHTML = `
                                                    <div id="star">
                                                    <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                    <i class="fa-solid fa-star fa-1x star-4"></i>
                                                    <i class="fa-solid fa-star fa-1x star-5"></i>
                                                    </div>`
                                                    } else if (data.values[i+1][61] == 4) {
                                                        review1_rating_stars.innerHTML = `
                                                        <div id="star">
                                                        <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                        <i class="fa-solid fa-star fa-1x star-5"></i>
                                                        </div>`
                                                        } else if (data.values[i+1][61] == 5) {
                                                            review1_rating_stars.innerHTML = `
                                                            <div id="star">
                                                            <i class="fa-solid fa-star fa-1x     star-1"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-5"></i>
                                                            </div>`
                                                            }
                            }

                        const review1_description = document.querySelector('#review-3 #rew-description');
                        review1_description.textContent = data.values[i+1][62];
                    }

                    {//review 4
                        const review1_pic = document.querySelector('#review-4 .rew-pro-pic');
                        if (data.values[i+1][63]==""){
                            review1_pic.innerHTML = `<i class="fa-regular fa-circle-user fa-3x"></i>`;
                        } else {
                            review1_pic.innerHTML = `<img src="${data.values[i+1][63]}" alt="image">`;
                        }

                        const review1_username = document.querySelector('#review-4 .id-con-rew h1');
                        review1_username.textContent = data.values[i+1][64];

                        const review1_usernote = document.querySelector('#review-4 .id-con-rew p');
                        review1_usernote.textContent = data.values[i+1][65];

                        {//review 4 rating
                                        const review1_rating_stars = document.querySelector('#review-4 #ind-stars');
                                        if (data.values[i+1][66] == 1){
                                            review1_rating_stars.innerHTML = `
                                            <div id="star">
                                            <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                            <i class="fa-solid fa-star fa-1x star-2"></i>
                                            <i class="fa-solid fa-star fa-1x star-3"></i>
                                            <i class="fa-solid fa-star fa-1x star-4"></i>
                                            <i class="fa-solid fa-star fa-1x star-5"></i>
                                            </div>`
                                            } else if (data.values[i+1][66] == 2) {
                                                review1_rating_stars.innerHTML = `
                                                <div id="star">
                                                <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                <i class="fa-solid fa-star fa-1x star-3"></i>
                                                <i class="fa-solid fa-star fa-1x star-4"></i>
                                                <i class="fa-solid fa-star fa-1x star-5"></i>
                                                </div>`
                                                } else if (data.values[i+1][66] == 3) {
                                                    review1_rating_stars.innerHTML = `
                                                    <div id="star">
                                                    <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                    <i class="fa-solid fa-star fa-1x star-4"></i>
                                                    <i class="fa-solid fa-star fa-1x star-5"></i>
                                                    </div>`
                                                    } else if (data.values[i+1][66] == 4) {
                                                        review1_rating_stars.innerHTML = `
                                                        <div id="star">
                                                        <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                        <i class="fa-solid fa-star fa-1x star-5"></i>
                                                        </div>`
                                                        } else if (data.values[i+1][66] == 5) {
                                                            review1_rating_stars.innerHTML = `
                                                            <div id="star">
                                                            <i class="fa-solid fa-star fa-1x     star-1"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-5"></i>
                                                            </div>`
                                                            }
                            }

                        const review1_description = document.querySelector('#review-4 #rew-description');
                        review1_description.textContent = data.values[i+1][67];
                    }

                    {//review 5
                        const review1_pic = document.querySelector('#review-5 .rew-pro-pic');
                        if (data.values[i+1][68]==""){
                            review1_pic.innerHTML = `<i class="fa-regular fa-circle-user fa-3x"></i>`;
                        } else {
                            review1_pic.innerHTML = `<img src="${data.values[i+1][68]}" alt="image">`;
                        }

                        const review1_username = document.querySelector('#review-5 .id-con-rew h1');
                        review1_username.textContent = data.values[i+1][69];

                        const review1_usernote = document.querySelector('#review-5 .id-con-rew p');
                        review1_usernote.textContent = data.values[i+1][70];

                        {//review 5 rating
                                        const review1_rating_stars = document.querySelector('#review-5 #ind-stars');
                                        if (data.values[i+1][71] == 1){
                                            review1_rating_stars.innerHTML = `
                                            <div id="star">
                                            <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                            <i class="fa-solid fa-star fa-1x star-2"></i>
                                            <i class="fa-solid fa-star fa-1x star-3"></i>
                                            <i class="fa-solid fa-star fa-1x star-4"></i>
                                            <i class="fa-solid fa-star fa-1x star-5"></i>
                                            </div>`
                                            } else if (data.values[i+1][71] == 2) {
                                                review1_rating_stars.innerHTML = `
                                                <div id="star">
                                                <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                <i class="fa-solid fa-star fa-1x star-3"></i>
                                                <i class="fa-solid fa-star fa-1x star-4"></i>
                                                <i class="fa-solid fa-star fa-1x star-5"></i>
                                                </div>`
                                                } else if (data.values[i+1][71] == 3) {
                                                    review1_rating_stars.innerHTML = `
                                                    <div id="star">
                                                    <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                    <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                    <i class="fa-solid fa-star fa-1x star-4"></i>
                                                    <i class="fa-solid fa-star fa-1x star-5"></i>
                                                    </div>`
                                                    } else if (data.values[i+1][71] == 4) {
                                                        review1_rating_stars.innerHTML = `
                                                        <div id="star">
                                                        <i class="fa-solid fa-star fa-1x checked star-1"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                        <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                        <i class="fa-solid fa-star fa-1x star-5"></i>
                                                        </div>`
                                                        } else if (data.values[i+1][71] == 5) {
                                                            review1_rating_stars.innerHTML = `
                                                            <div id="star">
                                                            <i class="fa-solid fa-star fa-1x     star-1"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-2"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-3"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-4"></i>
                                                            <i class="fa-solid fa-star fa-1x checked star-5"></i>
                                                            </div>`
                                                            }
                            }

                        const review1_description = document.querySelector('#review-5 #rew-description');
                        review1_description.textContent = data.values[i+1][72];
                    }
                }   
            }

    })});

    {function img_setter () {
        const productImage = document.getElementById('zoomed-Image');
        productImage.src = zoom_img;
    }
    document.getElementById('pr-img-1').addEventListener('click', img_changer_1);
    function img_changer_1 () {
        const pr_img_change = document.getElementById('pr-img-1');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }
    document.getElementById('pr-img-2').addEventListener('click', img_changer_2);
    function img_changer_2 () {
        const pr_img_change = document.getElementById('pr-img-2');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }
    document.getElementById('pr-img-3').addEventListener('click', img_changer_3);
    function img_changer_3 () {
        const pr_img_change = document.getElementById('pr-img-3');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }
    document.getElementById('pr-img-4').addEventListener('click', img_changer_4);
    function img_changer_4 () {
        const pr_img_change = document.getElementById('pr-img-4');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }
    document.getElementById('pr-img-5').addEventListener('click', img_changer_5);
    function img_changer_5 () {
        const pr_img_change = document.getElementById('pr-img-5');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }
    document.getElementById('pr-img-6').addEventListener('click', img_changer_6);
    function img_changer_6 () {
        const pr_img_change = document.getElementById('pr-img-6');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }
    document.getElementById('pr-img-7').addEventListener('click', img_changer_7);
    function img_changer_7 () {
        const pr_img_change = document.getElementById('pr-img-7');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }
    document.getElementById('pr-img-8').addEventListener('click', img_changer_8);
    function img_changer_8 () {
        const pr_img_change = document.getElementById('pr-img-8');
        zoom_img = pr_img_change.getAttribute('src');
        img_setter ();
    }}}

    {
        const range = 'A2:j';

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${rel_sheet_name}!${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {

            console.log(data.values);

            for(var i = 0; i < data.values.length; i++) {
                if(SKU == data.values[i][0]){
                    rel_Range = `C${i+2}:J${i+6}`;
                    rel_Product();
                }
            }
        })  
    };


    //Functions for Related Products Start//
    function rel_Product() {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${rel_sheet_name}!${rel_Range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {

            console.log(data.values);

        const productList = document.getElementById('rel_pr_con');

        data.values.forEach(product => {
            const [SKU, Brand, title, mrp, imageUrl, price, dis, rating, ] = product;

            const productElement = document.createElement('div');
            productElement.classList.add('rel_product');
            productElement.setAttribute('id', 'rel_product');

            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const discard = document.createElement('div');
            discard.classList.add('discard');
            const discartText = document.createElement('h2');
            discartText.setAttribute('id', 'dis-card-text');
            discartText.textContent = dis + '% OFF';
            discard.appendChild(discartText);
            productDiv.appendChild(discard);

            const imagecon = document.createElement('div');
            imagecon.classList.add('img-con');
            const image = document.createElement('img');
            image.src = imageUrl;
            imagecon.appendChild(image);
            productDiv.appendChild(imagecon);

            const Brand_c = document.createElement('div');
            Brand_c.classList.add('Brand_c');
            const Brand_name = document.createElement('h3');
            Brand_name.textContent = Brand;
            Brand_c.appendChild(Brand_name);
            productDiv.appendChild(Brand_c);

            const title_c = document.createElement('div');
            title_c.classList.add('title_c');
            const titleText = document.createElement('h5');
            titleText.setAttribute('id', 'rel_pr_title');
            titleText.textContent = title.slice(0, 50)+'...';
            title_c.appendChild(titleText);
            productDiv.appendChild(title_c);

            const pricing_cart = document.createElement('div');
            pricing_cart.classList.add('pricing_cart');

            const pricing_1 = document.createElement('div');
            pricing_1.classList.add('pricing-1');

            const MRPValue = document.createElement('h5');
            MRPValue.textContent = 'Rs. ' + mrp;
            pricing_1.appendChild(MRPValue);
            
            const OfferPriceValue = document.createElement('h1');
            OfferPriceValue.textContent = 'Rs. ' + price;
            pricing_1.appendChild(OfferPriceValue);
            
            pricing_cart.appendChild(pricing_1);

            const pricing_2 = document.createElement('div');
            pricing_2.classList.add('pricing-2');

            const cart2_image = document.createElement('div');
            cart2_image.classList.add('cart2-image');
            const star = document.createElement('div');
            star.setAttribute('id', 'star');
            for(var k = 0; k < 5; k++) {
                const iElement = document.createElement('i');
                iElement.classList.add('fa-solid');
                iElement.classList.add('fa-star');
                iElement.classList.add('fa-1x');
                if (k < rating){
                iElement.classList.add('checked');
                }
                iElement.classList.add(`star-${k+1}`);
                star.appendChild(iElement);
            }
            cart2_image.appendChild(star);
            const rel_rating_text = document.createElement('h2');
            rel_rating_text.textContent = rating;
            cart2_image.appendChild(rel_rating_text);
            pricing_2.appendChild(cart2_image);

            pricing_cart.appendChild(pricing_2);

            productDiv.appendChild(pricing_cart);
            productElement.appendChild(productDiv);
            productList.appendChild(productElement);

            productElement.addEventListener('click', () => {
            window.location.href = `product.html?SKU=${SKU}`;
            })
            
        })})
    }

    //FUNCTION TO WRITE START//
    function write(){
        if (username == "nothing"){
            const popup = document.getElementById('Pop-up');
            popup.classList.remove('Pop_up_OFF');
            popup.classList.add('Pop_up_ON');
        }
        else {
        const QuanSelect = document.querySelector('#quan');
        const Quan = QuanSelect.options[QuanSelect.selectedIndex].value;

        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([["CName", SKU, Quan, `=vlookup("${SKU}",Products!E:BE,6,false)`, `=vlookup("${SKU}",Products!E:BE,7,false)`, `=vlookup("${SKU}",Products!E:BE,22,false)`, `=vlookup("${SKU}",Products!E:BE,9,false)`, `=vlookup("${SKU}",Products!E:BE,8,false)`, `=vlookup("${SKU}",Products!E:BE,12,false)`, `=vlookup("${SKU}",Products!E:BE,13,false)`, `=vlookup("${SKU}",Products!E:BE,14,false)`,SKU*Quan ]])
    }};

    fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Cart", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        alert(`Thank you for submitting the form`);
    }

    function user_creation (response) {
        const mobile_no = document.getElementById("mobile_no").value;
        const full_name = document.getElementById("full_name").value;
        username = mobile_no;

        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([[full_name,mobile_no]])
    };

    fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Users", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        write();

        const popup = document.getElementById('Pop-up');
        popup.classList.remove('Pop_up_ON');
        popup.classList.add('Pop_up_OFF');

    }
    //FUNCTION TO WRITE END//

    //Get the button element by ID
    const addButton = document.getElementById('add-to-cart');
    //Add a click event listener to the button
    addButton.addEventListener('click', write);

    //Get the button element by ID
    const user_creation_Button = document.getElementById('user_creation');
    //Add a click event listener to the button
    user_creation_Button.addEventListener('click', user_creation)
}