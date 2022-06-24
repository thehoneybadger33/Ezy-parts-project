const btn = document.getElementById("myBtn");
btn.addEventListener("click", displayMenu);

function displayMenu() {
    document.querySelector(".nav-bar").classList.toggle("active");
}

const burger = document.getElementById("myBurger");
burger.addEventListener("click", displayCatalogue);

function displayCatalogue() {
    document.querySelector(".catalogue-list").classList.toggle("active-burger");
}


const shopLine = document.getElementById("shopLine");
if (shopLine) {
    shopLine.addEventListener("click", displayContent);
} 
function displayContent() {
    document.getElementById("js-switch").classList.add("card-active");
}


const shopMain = document.getElementById("shopMain");
if (shopMain) {
    shopMain.addEventListener("click", displayButtonSwitch);
}
function displayButtonSwitch() {
    document.getElementById("js-switch").classList.remove("card-active");
}


const gear = document.getElementById("aside-switch");
if (gear) {
    gear.addEventListener("click", gearButton);
}
function gearButton() {
    document.querySelector(".aside").classList.toggle("aside-active");
}


const tabs = document.querySelector(".tab-panel");
const tabButton = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab");

if (tabs) {
    tabs.addEventListener('click', e => {
        const id = e.target.dataset.id;
        if (id) {
            tabButton.forEach(btn => {
                btn.classList.remove("active-tab-button");
            });
            e.target.classList.add("active-tab-button");

            contents.forEach(content => {
                content.classList.remove("active-tab");
            });
            const element = document.getElementById(id);
            element.classList.add("active-tab");
        }
    })
}

$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    focusOnSelect: true
});
