const Player_1 = document.getElementById('Player_1');
Player_1.addEventListener('click', function () {
    Player_1.classList.add('active');
    Player_2.classList.remove('active');
})

const Player_2 = document.getElementById('Player_2');
Player_2.addEventListener('click', function () {
    Player_2.classList.add('active');
    Player_1.classList.remove('active');
})

var back_color = 'green';

    const cell_1 = document.getElementById('Cell_1');
    cell_1.addEventListener('click', function(){
        cell_1.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_2 = document.getElementById('Cell_2');
    cell_2.addEventListener('click', function(){
        cell_2.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_3 = document.getElementById('Cell_3');
    cell_3.addEventListener('click', function(){
        cell_3.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_4 = document.getElementById('Cell_4');
    cell_4.addEventListener('click', function(){
        cell_4.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_5 = document.getElementById('Cell_5');
    cell_5.addEventListener('click', function(){
        cell_5.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_6 = document.getElementById('Cell_6');
    cell_6.addEventListener('click', function(){
        cell_6.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_7 = document.getElementById('Cell_7');
    cell_7.addEventListener('click', function(){
        cell_7.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_8 = document.getElementById('Cell_8');
    cell_8.addEventListener('click', function(){
        cell_8.style.backgroundColor = back_color;
        check_for_winner ();
    })

    const cell_9 = document.getElementById('Cell_9');
    cell_9.addEventListener('click', function(){
        cell_9.style.backgroundColor = back_color;
        check_for_winner ();
    })

function check_for_winner () {
    if (cell_1.style.backgroundColor && cell_2.style.backgroundColor && cell_2.style.backgroundColor === cell_3.style.backgroundColor      ) {
        document.querySelector('#Player_2 h1').textContent = 'Winner';
    };
    if (cell_4.style.backgroundColor === cell_5.style.backgroundColor && cell_5.style.backgroundColor === cell_6.style.backgroundColor      ) {
        document.querySelector('#Player_2 h1').textContent = 'Winner';
    }
}