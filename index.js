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




{//Functions
  const SHEET_ID = '1oKZkAlaECmEaYfXpqZ7Vo0EpxqQ-hfJ2GdqNLHE5vVI';
  const API_KEY = 'AIzaSyCa_LiyI9rO2fdH93USdYjmIMk9k8vqQJs';
  const sheet_name = 'HOME-PAGE';

  {const range = 'B3:C9';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {

      var i = 0;

      function autoscroll_forward () {

        i++;
        if(i > 6) {
          i = 0;
        }

        var hero_banner= document.getElementById("banner-1");
        hero_banner.style.backgroundImage=data.values[i][0];
        hero_banner.addEventListener('click', function() {
          location.href = data.values[i][1];
        });
      };

      function autoscroll_backward () {

        i--;
        if(i < 0) {
          i = 6;
        }

        var hero_banner= document.getElementById("banner-1");
        hero_banner.style.backgroundImage=data.values[i][0];
        hero_banner.addEventListener('click', function() {
          location.href = data.values[i][1];
        });
      };

      setInterval(autoscroll_forward, 2000);
      const banner_f_button = document.getElementById('button_right');
      banner_f_button.addEventListener('click', autoscroll_forward);
      const banner_b_button = document.getElementById('button_left');
      banner_b_button.addEventListener('click', autoscroll_backward);

    })
  };

  {
    const range = 'A45:E49';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.values[0]);
      //testimonial 1
      const test_1_userimage = document.querySelector('#testimonial_1 .test_person_id .test_img_con');
      test_1_userimage.style.backgroundImage = `url(${data.values[0][1]})`;
      test_1_userimage.style.backgroundSize = 'cover';

      const test_1_username = document.querySelector('#testimonial_1 .test_person_id div h1');
      test_1_username.textContent = data.values[0][0];

      const test_1_userrating = document.querySelector('#testimonial_1 .test_person_id div .test_stars_con');
      for (let i = 0; i < 5; i++) {
        var star = document.createElement('div');
        star.classList.add('stars');
        if (i < data.values[0][2]){
          star.classList.add('golden');
        }
        test_1_userrating.appendChild(star);
      }

      const test_1_userrewheading = document.querySelector('#testimonial_1 .test_review_pr_name div h2');
      test_1_userrewheading.textContent = data.values[0][3];

      const test_1_userrewtext = document.querySelector('#testimonial_1 .test_review_pr_name div .para_test p');
      test_1_userrewtext.textContent = '"'+data.values[0][4]+'"';
    }) 
  }

{const range = 'B12:I17';
  const R_sign = "Rs. ";
    
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
      const productList = document.getElementById('top-selling');
        
    
        data.values.forEach(product => {
          const [SKU,Brand, title, mrp, imageUrl, price, dis, rating, ] = product;
          
    
          const productElement = document.createElement('div');
          productElement.classList.add('product');

          const discardElement = document.createElement('div');
          discardElement.classList.add('discard');
          const discardtElement = document.createElement('h2');
          discardtElement.classList.add('dis-card-text');
          discardtElement.textContent = dis + '%' + ' OFF';
          discardElement.appendChild(discardtElement);
          productElement.appendChild(discardElement);

          const imgeElement = document.createElement('div');
          imgeElement.classList.add('img-con');
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          imgeElement.appendChild(imageElement);
          productElement.appendChild(imgeElement);

          const BRAND_cElement = document.createElement('div');
          BRAND_cElement.classList.add('Brand_c');
          const BrandElement = document.createElement('h3');
          BrandElement.textContent = Brand;
          BRAND_cElement.appendChild(BrandElement);
          productElement.appendChild(BRAND_cElement);

          const title_cElement = document.createElement('div');
          title_cElement.classList.add('title_c');
          const titleElement = document.createElement('h5');
          titleElement.textContent = title.slice(0, 50)+'...';
          title_cElement.appendChild(titleElement);
          productElement.appendChild(title_cElement);

          const pricing_cartElement = document.createElement('div');
          pricing_cartElement.classList.add('pricing_cart');

          const pricingElement = document.createElement('div');
          pricingElement.classList.add('pricing');

          const mrpElement = document.createElement('h5');
          mrpElement.textContent = R_sign + mrp;
          pricingElement.appendChild(mrpElement);
    
          const priceElement = document.createElement('h1');
          priceElement.textContent = R_sign + price;
          pricingElement.appendChild(priceElement);

          pricing_cartElement.appendChild(pricingElement);

          const pricing2Element = document.createElement('div');
          pricing2Element.classList.add('pricing2');

          const cart2_image = document.createElement('div');
          cart2_image.classList.add('cart2-image');
          if (rating == 1){
            cart2_image.innerHTML = `
            <div id="star">
            <i class="fa-solid fa-star fa-1x checked star-1"></i>
            <i class="fa-solid fa-star fa-1x star-2"></i>
            <i class="fa-solid fa-star fa-1x star-3"></i>
            <i class="fa-solid fa-star fa-1x star-4"></i>
            <i class="fa-solid fa-star fa-1x star-5"></i>
            </div>`
            } else if (rating == 2) {
              cart2_image.innerHTML = `
              <div id="star">
              <i class="fa-solid fa-star fa-1x checked star-1"></i>
              <i class="fa-solid fa-star fa-1x checked star-2"></i>
              <i class="fa-solid fa-star fa-1x star-3"></i>
              <i class="fa-solid fa-star fa-1x star-4"></i>
              <i class="fa-solid fa-star fa-1x star-5"></i>
              </div>`
              } else if (rating == 3) {
                cart2_image.innerHTML = `
                <div id="star">
                <i class="fa-solid fa-star fa-1x checked star-1"></i>
                <i class="fa-solid fa-star fa-1x checked star-2"></i>
                <i class="fa-solid fa-star fa-1x checked star-3"></i>
                <i class="fa-solid fa-star fa-1x star-4"></i>
                <i class="fa-solid fa-star fa-1x star-5"></i>
                </div>`
                } else if (rating == 4) {
                  cart2_image.innerHTML = `
                  <div id="star">
                  <i class="fa-solid fa-star fa-1x checked star-1"></i>
                  <i class="fa-solid fa-star fa-1x checked star-2"></i>
                  <i class="fa-solid fa-star fa-1x checked star-3"></i>
                  <i class="fa-solid fa-star fa-1x checked star-4"></i>
                  <i class="fa-solid fa-star fa-1x star-5"></i>
                  </div>`
                  } else if (rating == 5) {
                    cart2_image.innerHTML = `
                    <div id="star">
                    <i class="fa-solid fa-star fa-1x checked star-1"></i>
                    <i class="fa-solid fa-star fa-1x checked star-2"></i>
                    <i class="fa-solid fa-star fa-1x checked star-3"></i>
                    <i class="fa-solid fa-star fa-1x checked star-4"></i>
                    <i class="fa-solid fa-star fa-1x checked star-5"></i>
                    </div>`
                    }
          
          const disElement = document.createElement('h2');
          disElement.textContent = rating;
          cart2_image.appendChild(disElement);
          pricing2Element.appendChild(cart2_image);

          pricing_cartElement.appendChild(pricing2Element);

          productElement.appendChild(pricing_cartElement);
          productList.appendChild(productElement);
    
          productElement.addEventListener('click', () => {
            window.location.href = `product.html?SKU=${SKU}`;
          });
        });
      });
    }

  {const range = 'B20:I26';
    const R_sign = "Rs. ";
      
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
        const productList = document.getElementById('new-launch');
          
      
          data.values.forEach(product => {
            const [SKU,Brand, title, mrp, imageUrl, price, dis, rating, ] = product;
            
      
            const productElement = document.createElement('div');
            productElement.classList.add('product');
    
            const discardElement = document.createElement('div');
            discardElement.classList.add('discard');
            const discardtElement = document.createElement('h2');
            discardtElement.classList.add('dis-card-text');
            discardtElement.textContent = dis + '%' + ' OFF';
            discardElement.appendChild(discardtElement);
            productElement.appendChild(discardElement);
    
            const imgeElement = document.createElement('div');
            imgeElement.classList.add('img-con');
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imgeElement.appendChild(imageElement);
            productElement.appendChild(imgeElement);
    
            const BRAND_cElement = document.createElement('div');
            BRAND_cElement.classList.add('Brand_c');
            const BrandElement = document.createElement('h3');
            BrandElement.textContent = Brand;
            BRAND_cElement.appendChild(BrandElement);
            productElement.appendChild(BRAND_cElement);
    
            const title_cElement = document.createElement('div');
            title_cElement.classList.add('title_c');
            const titleElement = document.createElement('h5');
            titleElement.textContent = title.slice(0, 50)+'...';
            title_cElement.appendChild(titleElement);
            productElement.appendChild(title_cElement);
    
            const pricing_cartElement = document.createElement('div');
            pricing_cartElement.classList.add('pricing_cart');
    
            const pricingElement = document.createElement('div');
            pricingElement.classList.add('pricing');
    
            const mrpElement = document.createElement('h5');
            mrpElement.textContent = R_sign + mrp;
            pricingElement.appendChild(mrpElement);
      
            const priceElement = document.createElement('h1');
            priceElement.textContent = R_sign + price;
            pricingElement.appendChild(priceElement);
    
            pricing_cartElement.appendChild(pricingElement);
    
            const pricing2Element = document.createElement('div');
            pricing2Element.classList.add('pricing2');
    
            const cart2_image = document.createElement('div');
            cart2_image.classList.add('cart2-image');
            if (rating == 1){
              cart2_image.innerHTML = `
              <div id="star">
              <i class="fa-solid fa-star fa-1x checked star-1"></i>
              <i class="fa-solid fa-star fa-1x star-2"></i>
              <i class="fa-solid fa-star fa-1x star-3"></i>
              <i class="fa-solid fa-star fa-1x star-4"></i>
              <i class="fa-solid fa-star fa-1x star-5"></i>
              </div>`
              } else if (rating == 2) {
                cart2_image.innerHTML = `
                <div id="star">
                <i class="fa-solid fa-star fa-1x checked star-1"></i>
                <i class="fa-solid fa-star fa-1x checked star-2"></i>
                <i class="fa-solid fa-star fa-1x star-3"></i>
                <i class="fa-solid fa-star fa-1x star-4"></i>
                <i class="fa-solid fa-star fa-1x star-5"></i>
                </div>`
                } else if (rating == 3) {
                  cart2_image.innerHTML = `
                  <div id="star">
                  <i class="fa-solid fa-star fa-1x checked star-1"></i>
                  <i class="fa-solid fa-star fa-1x checked star-2"></i>
                  <i class="fa-solid fa-star fa-1x checked star-3"></i>
                  <i class="fa-solid fa-star fa-1x star-4"></i>
                  <i class="fa-solid fa-star fa-1x star-5"></i>
                  </div>`
                  } else if (rating == 4) {
                    cart2_image.innerHTML = `
                    <div id="star">
                    <i class="fa-solid fa-star fa-1x checked star-1"></i>
                    <i class="fa-solid fa-star fa-1x checked star-2"></i>
                    <i class="fa-solid fa-star fa-1x checked star-3"></i>
                    <i class="fa-solid fa-star fa-1x checked star-4"></i>
                    <i class="fa-solid fa-star fa-1x star-5"></i>
                    </div>`
                    } else if (rating == 5) {
                      cart2_image.innerHTML = `
                      <div id="star">
                      <i class="fa-solid fa-star fa-1x checked star-1"></i>
                      <i class="fa-solid fa-star fa-1x checked star-2"></i>
                      <i class="fa-solid fa-star fa-1x checked star-3"></i>
                      <i class="fa-solid fa-star fa-1x checked star-4"></i>
                      <i class="fa-solid fa-star fa-1x checked star-5"></i>
                      </div>`
                      }
            
            const disElement = document.createElement('h2');
            disElement.textContent = rating;
            cart2_image.appendChild(disElement);
            pricing2Element.appendChild(cart2_image);
    
            pricing_cartElement.appendChild(pricing2Element);
    
            productElement.appendChild(pricing_cartElement);
            productList.appendChild(productElement);
        
            productElement.addEventListener('click', () => {
              window.location.href = `product.html?SKU=${SKU}`;
            });
          });
        });
    }

  {const range = 'B34:D41';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          
          document.getElementById('card-1-name').textContent = data.values[0][0];
          document.getElementById('card-1-details').textContent = data.values[0][1].slice(0, 250)+'...';
          document.getElementById('card-1').style.backgroundImage="url("+data.values[0][2]+")";

          document.getElementById('card-2-name').textContent = data.values[1][0];
          document.getElementById('card-2-details').textContent = data.values[1][1].slice(0, 250)+'...';
          document.getElementById('card-2').style.backgroundImage="url("+data.values[1][2]+")";

          document.getElementById('card-3-name').textContent = data.values[2][0];
          document.getElementById('card-3-details').textContent = data.values[2][1].slice(0, 250)+'...';
          document.getElementById('card-3').style.backgroundImage="url("+data.values[2][2]+")";

          document.getElementById('card-4-name').textContent = data.values[3][0];
          document.getElementById('card-4-details').textContent = data.values[3][1].slice(0, 250)+'...';
          document.getElementById('card-4').style.backgroundImage="url("+data.values[3][2]+")";

          document.getElementById('card-5-name').textContent = data.values[4][0];
          document.getElementById('card-5-details').textContent = data.values[4][1].slice(0, 250)+'...';
          document.getElementById('card-5').style.backgroundImage="url("+data.values[4][2]+")";

          document.getElementById('card-6-name').textContent = data.values[5][0];
          document.getElementById('card-6-details').textContent = data.values[5][1].slice(0, 250)+'...';
          document.getElementById('card-6').style.backgroundImage="url("+data.values[5][2]+")";

          document.getElementById('card-7-name').textContent = data.values[6][0];
          document.getElementById('card-7-details').textContent = data.values[6][1].slice(0, 250)+'...';
          document.getElementById('card-7').style.backgroundImage="url("+data.values[6][2]+")";

          document.getElementById('card-8-name').textContent = data.values[7][0];
          document.getElementById('card-8-details').textContent = data.values[7][1].slice(0, 250)+'...';
          document.getElementById('card-8').style.backgroundImage="url("+data.values[7][2]+")";

    })};

  { //Product heading button for top selling
    const buttonRight = document.getElementById('button-right-top');
      const buttonLeft = document.getElementById('button-left-top');

      buttonRight.onclick = function () {
        document.getElementById('top-selling').scrollLeft += 150 ;
      };
      buttonLeft.onclick = function () {
        document.getElementById('top-selling').scrollLeft -= 150;
      };
  }

  { //Product heading button for new launch
    const buttonRight = document.getElementById('button-right-new');
      const buttonLeft = document.getElementById('button-left-new');

      buttonRight.onclick = function () {
        document.getElementById('new-launch').scrollLeft += 150 ;
      };
      buttonLeft.onclick = function () {
        document.getElementById('new-launch').scrollLeft -= 150;
      };
  }


    const footer_form = document.getElementById('Footer-form');

    function handleSubmit(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get form data
      const formData = new FormData(footer_form);
      const name = formData.get('name');
      const email = formData.get('email');
      const contact = formData.get('contact');

      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "post",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify([name, email, contact])
    };

    fetch("https://v1.nocodeapi.com/kumarpintu9555/google_sheets/OAJVjKyAUvWCdxrY?tabId=News Later", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      // Display a confirmation message
      alert(`Thank you for submitting the form, ${name}!`);
      
      // You can perform additional client-side actions here before or instead of the alert.

      // Reset the form (optional)
      footer_form.reset();
    }

    // Attach the event listener to the form's submit event
    document.getElementById('footer_form_button').addEventListener('click', handleSubmit);
}