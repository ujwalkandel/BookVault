function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

function handleContact(e) {
    e.preventDefault();
    showToast("Message sent! We'll get back to you soon.");
    e.target.reset();
}

function requireAuth() {
    if (getCurrentUser()) {
        showDashboard();
        setTimeout(() => switchTabById("browse"), 100);
    } else {
        openAuth("register");
    }
}

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const slider = document.getElementById("slider");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;
let autoSlide;

function showSlide(index){

    slides.forEach(slide=>slide.classList.remove("active"));
    dots.forEach(dot=>dot.classList.remove("active"));

    if(index >= slides.length){
        currentSlide = 0;
    }
    else if(index < 0){
        currentSlide = slides.length - 1;
    }
    else{
        currentSlide = index;
    }
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function nextSlide(){
    showSlide(currentSlide + 1);
}

function previousSlide(){
    showSlide(currentSlide - 1);
}

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", previousSlide);

dots.forEach((dot,index)=>{
    dot.addEventListener("click",()=>{
        showSlide(index);
    });
});

function startSlider(){
    autoSlide = setInterval(nextSlide,4000);
}

startSlider();

slider.addEventListener("mouseenter",()=>{
    clearInterval(autoSlide);
});

slider.addEventListener("mouseleave",()=>{
    startSlider();
});

document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft"){
        previousSlide();
    }
    if(e.key==="ArrowRight"){
        nextSlide();
    }
});