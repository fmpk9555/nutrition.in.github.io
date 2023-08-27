

const check_box = document.getElementById('checkbox_form_input');
check_box.addEventListener('click', change);

function change() {
    if (check_box.checked) {
        var status = document.getElementById('billing_form_con');
        status.classList.add('collapse');
    } else {
        var status = document.getElementById('billing_form_con');
        status.classList.remove('collapse');
    }
}