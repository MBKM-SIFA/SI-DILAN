const toggle = document.querySelector('#toggle');
const dropDown = document.querySelector('#floating-dropdown');

const mobileToggle = document.querySelector('#mobile-toggle');
const mobileDropdown = document.querySelector('#mobile-dropdown');

toggle.addEventListener('click',()=>{
    const dropped = dropDown.style.display;
    
    if(dropped == "" || dropped == "flex")
        dropDown.style.display = "none";
    else
        dropDown.style.display = "flex";
});


mobileToggle.addEventListener('click',()=>{
    const dropped = mobileDropdown.style.display;


    if(dropped == "" || dropped == "none")
        mobileDropdown.style.display = "flex";
    else
        mobileDropdown.style.display = "none";
});
