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

  {//testimonial
    const range = 'A45:E49';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.values[0]);
      { const testimonial_con = document.getElementById('testimonial_con');
        for (let i = 0; i < 5; i++) {
          const testimonial_each_con = document.createElement('div');
          testimonial_each_con.setAttribute("id", `testimonial_${i}`);
          testimonial_each_con.classList.add('testimonial');

          const test_person_id = document.createElement('div');
          test_person_id.classList.add('test_person_id');
          testimonial_each_con.appendChild(test_person_id);

          const test_image_con = document.createElement('div');
          test_image_con.classList.add('test_img_con');
          test_image_con.style.backgroundImage = `url(${data.values[i][1]})`;
          test_image_con.style.backgroundSize = 'cover';
          test_person_id.appendChild(test_image_con);

          const test_name_rate_con = document.createElement('div');

          const h1 = document.createElement('h1');
          h1.textContent = data.values[i][0];
          test_name_rate_con.appendChild(h1);

          const test_stars_con = document.createElement('div');
          test_stars_con.classList.add('test_stars_con');
          for (let j = 0; j < 5; j++) {
            var star = document.createElement('div');
            star.classList.add('stars');
            if (j < data.values[i][2]){
              star.classList.add('golden');
            }
            test_stars_con.appendChild(star);
          }
          test_name_rate_con.appendChild(test_stars_con);

          test_person_id.appendChild(test_name_rate_con);

          const test_review_pr_name = document.createElement('div');
          test_review_pr_name.classList.add('test_review_pr_name');

          const test_rew = document.createElement('div');
          const h2 = document.createElement('h2');
          h2.textContent = data.values[i][3];
          test_rew.appendChild(h2);
          test_review_pr_name.appendChild(test_rew);

          const para_test = document.createElement('div');
          const para = document.createElement('p');
          para.textContent =  '"'+data.values[i][4]+'"';
          para_test.appendChild(para);
          test_review_pr_name.appendChild(para_test);

          testimonial_each_con.appendChild(test_review_pr_name);
          testimonial_con.appendChild(testimonial_each_con);
        }
        {
          function smoothScroll(element, distance, duration, pauseDuration) {
            const totalWidth = element.scrollWidth;
            let scrollPosition = 0;
          
            function scroll() {
              if (scrollPosition + element.clientWidth <= totalWidth) {
                const start = scrollPosition;
                const startTime = performance.now();
          
                function animateScroll(timestamp) {
                  const currentTime = timestamp - startTime;
                  const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          
                  scrollPosition = start + distance * easeInOutQuad(currentTime / duration);
                  element.scrollLeft = scrollPosition;
          
                  if (currentTime < duration) {
                    requestAnimationFrame(animateScroll);
                  } else {
                    setTimeout(scroll, pauseDuration);
                  }
                }
          
                requestAnimationFrame(animateScroll);
              } else {
                // If we've reached the end, reset to the beginning
                scrollPosition = 0;
                element.scrollLeft = scrollPosition;
                setTimeout(scroll, pauseDuration);
              }
            }
          
            setTimeout(scroll, 3000); // Start scrolling after a 3-second delay
          }
          const scrollDistance = 915;
          const scrollDuration = 5000;
          const pauseDuration = 3000;
          
          smoothScroll(testimonial_con, scrollDistance, scrollDuration, pauseDuration);
          
          
        }
      }
    })
  }

  {//Top Selling
    const range = 'B12:J17';
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById('top-selling');
        
    
      data.values.forEach(product => {
        const [VSKU,SKU,Brand, title, mrp, imageUrl, price, dis, rating, ] = product;
        
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

        const  product_wish = document.createElement('div');
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
        pr_title.textContent = title.slice(0, 50)+'...';
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
        for (var i = 0; i < 5; i++){
            const stars = document.createElement('div');
            stars.classList.add('stars');
            if (i < rating){
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
      });
    });
  }

  {//new-launch
    const range = 'B20:J26';
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
    const productList = document.getElementById('new-launch');
    

    data.values.forEach(product => {
      const [VSKU,SKU,Brand, title, mrp, imageUrl, price, dis, rating, ] = product;
      

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

      const  product_wish = document.createElement('div');
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
      pr_title.textContent = title.slice(0, 50)+'...';
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
      for (var i = 0; i < 5; i++){
        const stars = document.createElement('div');
        stars.classList.add('stars');
        if (i < parseInt(rating, 10)){
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
    });
  });
  }

  {//community
    const range = 'B34:D41';
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet_name}!${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const communitycontainer = document.getElementById('community-row-con');
      data.values.forEach(communitymem => {
        const [Name, Bio, Image, ] = communitymem;

        const comcard = document.createElement('div');
        comcard.classList.add('com-card');

        const com_card_inner = document.createElement('div');
        com_card_inner.classList.add('com-card-inner');

        const com_card_front = document.createElement('div');
        com_card_front.classList.add('com-card-front');
        com_card_front.style.backgroundImage = `url(${Image})`;

        const com_title = document.createElement('h1');
        com_title.textContent = Name;
        com_card_front.appendChild(com_title);

        com_card_inner.appendChild(com_card_front);

        const com_card_back = document.createElement('div');
        com_card_back.classList.add('com-card-back');

        const com_card_back_h3 = document.createElement('h3');
        com_card_back_h3.textContent = 'About:';
        com_card_back.appendChild(com_card_back_h3);

        const com_card_back_p = document.createElement('p');
        com_card_back_p.textContent = Bio;
        com_card_back.appendChild(com_card_back_p);

        com_card_inner.appendChild(com_card_back);
        comcard.appendChild(com_card_inner);
        communitycontainer.appendChild(comcard);
      })
    })
  };

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