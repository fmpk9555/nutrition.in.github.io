{//page animations
    {//Search Bar
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
    }

    {
        const qty_plus_btn = document.getElementById("qtymax");
        qty_plus_btn.addEventListener("click", incrementQuantity);
        const qty_minus_btn = document.getElementById("qtymin");
        qty_minus_btn.addEventListener("click", decrementQuantity);

        // Function to increment quantity
        function incrementQuantity() {
            var quantityElement = document.getElementById("qtyH");
            var currentQuantity = parseInt(quantityElement.textContent, 10);
            quantityElement.textContent = currentQuantity + 1;
            qty_minus_btn.classList.remove('btninactive');
            qty_minus_btn.classList.add('btnactive');
        }

        // Function to decrement quantity
        function decrementQuantity() {
            var quantityElement = document.getElementById("qtyH");
            var currentQuantity = parseInt(quantityElement.textContent, 10);
            // Ensure quantity does not go below 1
            if (currentQuantity > 1) {
                quantityElement.textContent = currentQuantity - 1;
            }
            if (currentQuantity == 2) {
                qty_minus_btn.classList.add('btninactive');
                qty_minus_btn.classList.remove('btnactive');
            }
        }

    }
}

{//Page Operations
    const urlParams = new URLSearchParams(window.location.search);
    const sSKU = urlParams.get('VSKU');
    const sentSKU = urlParams.get('SKU');

    const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
    const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
    var rel_Range = 0;
    const rel_sheet_name = 'Related Products';
    const reviews_of_product = [];
    var rel_Range = 0;
    const username = "kumarpintu9555@gmail.com";
    const writetocart = [];
    const AvlvariationType = [];


    const sheet_name = 'Products';
    const range = 'A3:CA';

    var zoom_img = 0;

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        data.values.forEach(product => {
            const [Product_Type, SKU, Variation, Variation_No, Variation_SKU, Variation_Type, Variation_Value, HSN, FSSAI, Brand_Name, Product_Title, Flavor, Size, Diet_Type, Stock, MRP, Discount_Type, Discount, Offer_Price, Settlement_Value, Bullet_Point_1, Bullet_Point_2, Bullet_Point_3, Bullet_Point_4, Bullet_Point_5, Usage_Direction, Image_1, Image_2, Image_3, Image_4, Image_5, Image_6, Image_7, Image_8, Description, Length, Width, Height, Weight, Manufacturer, Manufacturer_Address, MFG_Date, Self_Life_Months, Form, Storage_Type, Color, Heat_Sesitive, Total_Rating, Total_Reviews, User_Pic_1, User_Name_1, User_date_1, User_Note_1, Review_1, Comment_1, User_Pic_2, User_Name_2, User_date_2, User_Note_2, Review_2, Comment_2, User_Pic_3, User_Name_3, User_date_3, User_Note_3, Review_3, Comment_3, User_Pic_4, User_Name_4, User_date_4, User_Note_4, Review_4, Comment_4, User_Pic_5, User_Name_5, User_date_5, User_Note_5, Review_5, Comment_5
            ] = product;

            if (Variation_SKU === sSKU) {
                {//Product Images
                        const pr_img_1 = document.getElementById('pr-img-1');
                        pr_img_1.src = Image_1;
                        const hero_img = document.getElementById('hero-Image');
                        hero_img.src = Image_1;
                        const pr_img_2 = document.getElementById('pr-img-2');
                        pr_img_2.src = Image_2;
                        const pr_img_3 = document.getElementById('pr-img-3');
                        pr_img_3.src = Image_3;
                        const pr_img_4 = document.getElementById('pr-img-4');
                        pr_img_4.src = Image_4;
                        const pr_img_5 = document.getElementById('pr-img-5');
                        pr_img_5.src = Image_5;
                        const pr_img_6 = document.getElementById('pr-img-6');
                        pr_img_6.src = Image_6;
                        const pr_img_7 = document.getElementById('pr-img-7');
                        pr_img_7.src = Image_7;
                        const pr_img_8 = document.getElementById('pr-img-8');
                        pr_img_8.src = Image_8;
                }

                {//Product Name brand and Rating
                        const brand_name = document.getElementById('pr_brand_name');
                        brand_name.textContent = Brand_Name;

                        const pr_title = document.getElementById('pr_name');
                        pr_title.textContent = Product_Title;

                        const pr_hero_rating = document.getElementById('pr_hero_rating');
                        for (var i = 0; i < 5; i++) {
                            const hero_star = document.createElement('div');
                            hero_star.classList.add('stars');
                            if (i < Total_Rating) {
                                hero_star.classList.add('golden');
                            }
                            pr_hero_rating.appendChild(hero_star);
                        }
                        const totalrating = document.createElement('p');
                        totalrating.textContent = `(${Total_Reviews})`;
                        pr_hero_rating.appendChild(totalrating);
                }

                {//MRP, Price, Dis, Wishlist, Share
                        const pr_mrp = document.getElementById('pr_mrp');
                        pr_mrp.innerHTML = `MRP: <span>₹${MRP}/-</span>`;

                        const pr_price = document.getElementById('pr_price');
                        pr_price.textContent = `Price: ₹${Offer_Price}/-`;

                        const dis_tag = document.getElementById('dis_tag');
                        dis_tag.textContent = Discount_Type;

                        const dis_con = document.getElementById('dis_con');
                        dis_con.textContent = `${Discount}%`;

                        const dis_tag_end = document.getElementById('dis_tag_end');
                        dis_tag_end.textContent = "OFF";


                }

                {//check variation availability
                        if (Variation == "No-Variation") {
                            const variantionH = document.getElementById('variantionH');
                            variantionH.innerHTML = `
                            <div class="vtypeH"><h2 class="vtypeHeading">Flavor:</h2><div class="avlVariations"><form class="form"><div class="Vari_T_one"><input id="radio_Flavor_1" name="radio" checked type="radio"><label for="radio_Flavor_1">${Flavor}</label></div></form></div></div>
                            <div class="vtypeH"><h2 class="vtypeHeading">Size:</h2><div class="avlVariations"><form class="form"><div class="Vari_T_one"><input id="radio_Size_1" name="radio" checked type="radio"><label for="radio_Size_1">${Size}</label></div></form></div></div>
                            `
                        } else {
                            variationcreator();
                        }
                }

                {
                        const Bullet_Point_H = document.getElementById('Bullet_Point_H');
                        Bullet_Point_H.innerHTML = `
                        <li>${Bullet_Point_1}</li>
                        <li>${Bullet_Point_2}</li>
                        <li>${Bullet_Point_3}</li>
                        <li>${Bullet_Point_4}</li>
                        <li>${Bullet_Point_5}</li>
                        `
                }

                {
                        const pr_identifier = document.getElementById('pr_identifier');
                        pr_identifier.innerHTML = `
                        <P><strong>SKU:</strong> ${Variation_SKU}</P>
                        <P><strong>Product Type:</strong> ${Product_Type}</P>
                        <P><strong>Color:</strong> ${Color}</P>
                        <P><strong>Form:</strong> ${Form}</P>
                        <P><strong>Flavor:</strong> ${Flavor}</P>
                        <P><strong>Diet Type:</strong> ${Diet_Type}</P>
                        `;
                }

                {//Product Description
                        const Description_Con = document.getElementById('Description_Con');
                        Description_Con.textContent = Description;

                        const Des_H = document.getElementById('Des_H');
                        Des_H.addEventListener('click', function () {
                            Description_Con.textContent = Description;
                            Des_H.classList.add('Des_H_Con_Active');
                            UD_H.classList.remove('Des_H_Con_Active');
                        })

                        const UD_H = document.getElementById('UD_H');
                        UD_H.addEventListener('click', function () {
                            Description_Con.textContent = Usage_Direction;
                            Des_H.classList.remove('Des_H_Con_Active');
                            UD_H.classList.add('Des_H_Con_Active');
                        })
                }

                {//Review Generator
                        const total_rew_sum = document.getElementById('total_rew_sum');
                        total_rew_sum.textContent = Total_Rating;

                        const rew_sum_con = document.querySelector('#rew_sum_con p');
                        rew_sum_con.textContent = Total_Reviews;

                        const sum_rew_star_con = document.getElementById('sum_rew_star_con');
                        for (let l = 0; l < 5; l++) {
                            const ind_star = document.createElement('div');
                            ind_star.classList.add('rew_star');
                            if (l < Total_Rating) {
                                ind_star.classList.add('golden');
                            }
                            sum_rew_star_con.appendChild(ind_star);
                        }

                        reviews_of_product[0] = [User_Pic_1, User_Name_1, User_date_1, User_Note_1, Review_1, Comment_1]
                        reviews_of_product[1] = [User_Pic_2, User_Name_2, User_date_2, User_Note_2, Review_2, Comment_2]
                        reviews_of_product[2] = [User_Pic_3, User_Name_3, User_date_3, User_Note_3, Review_3, Comment_3]
                        reviews_of_product[3] = [User_Pic_4, User_Name_4, User_date_4, User_Note_4, Review_4, Comment_4]
                        reviews_of_product[4] = [User_Pic_5, User_Name_5, User_date_5, User_Note_5, Review_5, Comment_5]
                        reviewwriter();
                }

                {//Related Products
                        const range = 'A2:j';

                        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${rel_sheet_name}!${range}?key=${API_KEY}`)
                            .then(response => response.json())
                            .then(data => {
                                for (var i = 0; i < data.values.length; i++) {
                                    if (sSKU == data.values[i][0]) {
                                        rel_Range = `C${i + 2}:J${i + 6}`;
                                        rel_Product();
                                    }
                                }
                            })
                    }
            }
        })
    })



    {//Hero Image Changer
        const thumbnailImages = document.querySelectorAll('.pr_img_list img');

        const zoomedImage = document.getElementById('hero-Image');

        thumbnailImages.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function () {
                zoomedImage.src = thumbnail.src;
                zoomedImage.alt = thumbnail.alt;
            });
        });
    }

    function variationcreator() {
        const urlParams = new URLSearchParams(window.location.search);
        const sSKU = urlParams.get('VSKU');
        const sentSKU = urlParams.get('SKU');

        const sheet_name = 'Products';
        const range = 'A3:Z';
        const AAVholder = document.getElementById('variantionH');

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                data.values.forEach(product => {
                    const [Product_Type, SKU, Variation, Variation_No, Variation_SKU, Variation_Type, Variation_Value, HSN, FSSAI, Brand_Name, Product_Title, Flavor, Size, Diet_Type, Stock, MRP, Discount_Type, Discount, Offer_Price, Settlement_Value, Bullet_Point_1, Bullet_Point_2, Bullet_Point_3, Bullet_Point_4, Bullet_Point_5, Usage_Direction, Image_1, Image_2, Image_3, Image_4, Image_5, Image_6, Image_7, Image_8, Description, Length, Width, Height, Weight, Manufacturer, Manufacturer_Address, MFG_Date, Self_Life_Months, Form, Storage_Type, Color, Heat_Sesitive, Total_Rating, Total_Reviews, User_Pic_1, User_Name_1, User_Note_1, Review_1, Comment_1, User_Pic_2, User_Name_2, User_Note_2, Review_2, Comment_2, User_Pic_3, User_Name_3, User_Note_3, Review_3, Comment_3, User_Pic_4, User_Name_4, User_Note_4, Review_4, Comment_4, User_Pic_5, User_Name_5, User_Note_5, Review_5, Comment_5
                    ] = product;

                    if (sentSKU === SKU) {
                        const typeIndex = AvlvariationType.findIndex(item => item.type === Variation_Type);

                        if (typeIndex === -1) {
                            AvlvariationType.push({
                                type: Variation_Type,
                                values: [{ sku: Variation_SKU, value: Variation_Value }],
                            });
                        } else {
                            AvlvariationType[typeIndex].values.push({ sku: Variation_SKU, value: Variation_Value, Stock: Stock });
                        }
                    }
                });
                AvlvariationType.forEach(typeObject => {
                    const vtypeH = document.createElement('div');
                    vtypeH.classList.add('vtypeH');

                    const vtypeHeading = document.createElement('h2');
                    vtypeHeading.classList.add('vtypeHeading');
                    vtypeHeading.innerText = `${typeObject.type}:`;
                    vtypeH.appendChild(vtypeHeading);

                    const avlVariations = document.createElement('div');
                    avlVariations.classList.add('avlVariations');

                    const Vari_form = document.createElement('form');
                    Vari_form.classList.add('form');

                    var i = 0;

                    typeObject.values.forEach(valueObject => {

                        const Vari_T_one = document.createElement('div');
                        Vari_T_one.classList.add('Vari_T_one');
                        if (valueObject.Stock < 1) {
                            Vari_T_one.classList.add('crossed')
                        }

                        i++;

                        const Vari_One_in = document.createElement('input');
                        Vari_One_in.id = `radio_${typeObject.type}_${i}`;
                        Vari_One_in.name = `${typeObject.type}`;
                        Vari_One_in.type = 'radio';
                        Vari_One_in.checked = valueObject.sku === sSKU;
                        Vari_T_one.appendChild(Vari_One_in);

                        const Vari_One_L = document.createElement('label');
                        Vari_One_L.htmlFor = `radio_${typeObject.type}_${i}`;
                        Vari_One_L.innerText = valueObject.value;
                        Vari_T_one.appendChild(Vari_One_L);

                        Vari_T_one.addEventListener('click', () => {
                            window.location.href = `product.html?SKU=${sentSKU}&VSKU=${valueObject.sku}`;
                        });

                        Vari_form.appendChild(Vari_T_one);
                        avlVariations.appendChild(Vari_form);

                    });
                    vtypeH.appendChild(avlVariations);
                    AAVholder.appendChild(vtypeH);
                });
            });
    }

    function reviewwriter() {
        const reviews_con = document.getElementById('reviews_con');
        reviews_of_product.forEach(review => {
            const [User_Pic, User_Name, User_date, User_Note, Review, Comment] = review;

            const ind_rew = document.createElement('div');
            ind_rew.classList.add('ind_rew');

            const ind_rew_header = document.createElement('div');
            ind_rew_header.classList.add('ind_rew_header');

            const cust_name_img = document.createElement('div');
            cust_name_img.classList.add('cust_name_img');

            const img = document.createElement('div');
            img.classList.add('img');
            cust_name_img.appendChild(img);
            img.style.backgroundImage = `url(${User_Pic})`

            const cust_name = document.createElement('h2');
            cust_name.textContent = User_Name;
            cust_name_img.appendChild(cust_name);

            ind_rew_header.appendChild(cust_name_img);

            const rate_date = document.createElement('div');
            rate_date.classList.add('rate_date');

            const ind_star_con = document.createElement('div');
            ind_star_con.classList.add('ind_star_con');
            for (let l = 0; l < 5; l++) {
                const ind_star = document.createElement('div');
                ind_star.classList.add('ind_star');
                if (l < Review) {
                    ind_star.classList.add('golden');
                }
                ind_star_con.appendChild(ind_star);
            }
            rate_date.appendChild(ind_star_con);

            const date_con = document.createElement('p');
            date_con.classList.add('date_con');
            date_con.textContent = User_date;
            rate_date.appendChild(date_con);

            ind_rew_header.appendChild(rate_date);
            ind_rew.appendChild(ind_rew_header);

            const ind_rew_con_H_B = document.createElement('div');
            ind_rew_con_H_B.classList.add('ind_rew_con_H_B');

            const ind_rew_Heading = document.createElement('h4');
            ind_rew_Heading.classList.add('ind_rew_Heading');
            ind_rew_Heading.textContent = User_Note;
            ind_rew_con_H_B.appendChild(ind_rew_Heading);

            const ind_rew_B = document.createElement('p');
            ind_rew_B.classList.add('ind_rew_B');
            ind_rew_B.textContent = Comment;
            ind_rew_con_H_B.appendChild(ind_rew_B)

            ind_rew.appendChild(ind_rew_con_H_B);
            reviews_con.appendChild(ind_rew);
        })
    }

    function rel_Product() {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${rel_sheet_name}!${rel_Range}?key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {

                const productList = document.getElementById('rel_pr_list_con');

                data.values.forEach(product => {
                    const [VSKU, SKU, Brand, title, mrp, imageUrl, price, dis, rating,] = product;


                    const productElement = document.createElement('div');
                    productElement.classList.add('product');

                    const product_image_con = document.createElement('div');
                    product_image_con.classList.add('product_image_con');

                    const discardElement = document.createElement('div');
                    discardElement.classList.add('dis_text');
                    const discardtElement = document.createElement('h3');
                    discardtElement.textContent = dis + '%';
                    const discardpElement = document.createElement('p');
                    discardpElement.textContent = 'OFF';
                    discardElement.appendChild(discardpElement);
                    discardElement.appendChild(discardtElement);
                    product_image_con.appendChild(discardElement);

                    const product_wish = document.createElement('div');
                    product_wish.classList.add('product_wish');
                    product_wish.innerHTML = `<i class="fa-solid fa-heart fa-xl"></i>`;
                    product_image_con.appendChild(product_wish);

                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    product_image_con.appendChild(imageElement);

                    productElement.appendChild(product_image_con);

                    const product_data = document.createElement('div');
                    product_data.classList.add('product_data');

                    const product_title = document.createElement('div');
                    product_title.classList.add('product_title');
                    const Brand_c = document.createElement('h3');
                    Brand_c.classList.add('Brand_c');
                    Brand_c.textContent = Brand;
                    product_title.appendChild(Brand_c);
                    const pr_title = document.createElement('h1');
                    pr_title.textContent = title.slice(0, 50) + '...';
                    product_title.appendChild(pr_title);
                    product_data.appendChild(product_title);

                    const price_rating = document.createElement('div');
                    price_rating.classList.add('price_rating');

                    const pricing = document.createElement('div');
                    pricing.classList.add('pricing');

                    const mrp_C = document.createElement('p');
                    mrp_C.classList.add('mrp');
                    mrp_C.textContent = '₹ ' + mrp + '/-';
                    pricing.appendChild(mrp_C);

                    const selling_p = document.createElement('h3');
                    selling_p.classList.add('selling_p');
                    selling_p.textContent = '₹ ' + price + '/-';
                    pricing.appendChild(selling_p);

                    price_rating.appendChild(pricing);

                    const rating_stars = document.createElement('div');
                    rating_stars.classList.add('rating_stars');
                    for (var i = 0; i < 5; i++) {
                        const stars = document.createElement('div');
                        stars.classList.add('stars');
                        if (i < rating) {
                            stars.classList.add('golden');
                        }
                        rating_stars.appendChild(stars);
                    }
                    price_rating.appendChild(rating_stars);

                    product_data.appendChild(price_rating);
                    productElement.appendChild(product_data);
                    productList.appendChild(productElement);

                    productElement.addEventListener('click', () => {
                        window.location.href = `product.html?SKU=${SKU}&VSKU=${VSKU}`;
                    });
                })
            })
    }

    function generate_data_to_write () {
        const selectedQTY = document.getElementById('qtyH').textContent;
        console.log(selectedQTY);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([[username, sentSKU, sSKU, selectedQTY, `=vlookup("${sSKU}",Products!E:BE,6,false)`, `=vlookup("${sSKU}",Products!E:BE,7,false)`, `=vlookup("${sSKU}",Products!E:BE,23,false)`, `=vlookup("${sSKU}",Products!E:BE,9,false)`, `=vlookup("${sSKU}",Products!E:BE,8,false)`, `=vlookup("${sSKU}",Products!E:BE,12,false)`, `=vlookup("${sSKU}",Products!E:BE,14,false)`, `=vlookup("${sSKU}",Products!E:BE,15,false)` ]])
        };
        
        fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=Cart", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        
        alert(`Added to Cart, Thank you.`);
    }

    const addtocartbtn = document.getElementById('addtocartbtn');
    addtocartbtn.addEventListener('click',generate_data_to_write);
};
