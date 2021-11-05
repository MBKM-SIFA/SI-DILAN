const modal_popup = document.getElementById('modal');
const modal_buttons = document.querySelectorAll('.modal-button');

const showOrHideModal = function (){
    console.log(modal_popup.style.display);

    if(modal_popup.style.display == "none" || modal_popup.style.display == "")
        modal_popup.style.display = "flex";
    else
        modal_popup.style.display = "none";
}

for (let index = 0; index < modal_buttons.length; index++) {
    modal_buttons[index].addEventListener('click',showOrHideModal);
}