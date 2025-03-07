const wrapper =document.querySelector('.wrapper');
const loginLink =document.querySelector('.login-link');
const registerLink =document.querySelector('.register-link');
const btnPopup =document.querySelector('.btnLogin-popup');
const iconClose =document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active')
})

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});
//two person chatters...
function chatter() {
   const urName = document.getElementById("name-holder");

}
var searchBar = document.querySelector('#search');
var contentHolder = document.querySelector('.holder');

searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        var products = contentHolder.querySelectorAll('.product');
        products.forEach(element => {
             if (!element.textContent == searchBar.value) {
            element.style.display = "none";
        } else {
                 element.style.display = "block"
        }
        });
       
    }
});
