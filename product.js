{//page animations
    {//Search Bar
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

    {
        const sheet_name = 'Products';
        const range = 'A3:BU';
        var username= 'good';

        var zoom_img = 0;

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.values);
            data.values.forEach(product => {
                const [Product_Type,SKU,Variation,Variation_No,Variation_SKU,Variation_Type,Variation_Value,HSN,FSSAI,Brand_Name,Product_Title,Flavor,Size,Diet_Type,Stock,MRP,Discount_Type,Discount,Offer_Price,Settlement_Value,Bullet_Point_1,Bullet_Point_2,Bullet_Point_3,Bullet_Point_4,Bullet_Point_5,Usage_Direction,Image_1,Image_2,Image_3,Image_4,Image_5,Image_6,Image_7,Image_8,Description,Length,Width,Height,Weight,Manufacturer,Manufacturer_Address,MFG_Date,Self_Life_Months,Form,Storage_Type,Color,Heat_Sesitive,Total_Rating,Total_Reviews,User_Pic_1,User_Name_1,User_Note_1,Review_1,Comment_1,User_Pic_2,User_Name_2,User_Note_2,Review_2,Comment_2,User_Pic_3,User_Name_3,User_Note_3,Review_3,Comment_3,User_Pic_4,User_Name_4,User_Note_4,Review_4,Comment_4,User_Pic_5,User_Name_5,User_Note_5,Review_5,Comment_5
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
                    variationcreator();

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

                }
            })
        })
    }


 //Hero Image Changer
    const thumbnailImages = document.querySelectorAll('.pr_img_list img');

    const zoomedImage = document.getElementById('hero-Image');

    thumbnailImages.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            zoomedImage.src = thumbnail.src;
            zoomedImage.alt = thumbnail.alt;
            console.log(`Clicked on image ${index + 1}`);
        });
    });

    function variationcreator() {
        const urlParams = new URLSearchParams(window.location.search);
        const sSKU = urlParams.get('VSKU');
        const sentSKU = urlParams.get('SKU');
        const AvlvariationType = [];
    
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
                        if (valueObject.Stock < 1){
                            Vari_T_one.classList.add('crossed')
                        }

                        i++;

                        const Vari_One_in = document.createElement('input');
                        Vari_One_in.id = `radio_${typeObject.type}_${i}`;
                        Vari_One_in.name = `radio`;
                        Vari_One_in.type = 'radio';
                        Vari_One_in.checked = valueObject.sku === sSKU;
                        Vari_T_one.appendChild(Vari_One_in);

                        const Vari_One_L = document.createElement('label');
                        Vari_One_L.htmlFor = `radio_${typeObject.type}_${i}`;
                        Vari_One_L.innerText = valueObject.value;
                        Vari_T_one.appendChild(Vari_One_L);
                        
                        console.log(valueObject.sku);
                        Vari_T_one.addEventListener('click', () => {
                            window.location.href = `product.html?SKU=${sentSKU}&VSKU=${valueObject.sku}`;
                        });

                        Vari_form.appendChild(Vari_T_one);
                        avlVariations.appendChild(Vari_form);
                
                    });
                    vtypeH.appendChild(avlVariations);
                    AAVholder.appendChild(vtypeH);
                });
                console.log(AvlvariationType);
            });
    }
    
    
    
};