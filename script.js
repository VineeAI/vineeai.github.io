const words = [

"AI Engineer",

"Python Automation Engineer",

"FastAPI Developer",

"Generative AI Enthusiast",

"RAG Developer"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function type(){

    const current = words[wordIndex];

    if(!deleting){

        typing.textContent =
        current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(type,1500);

            return;

        }

    }else{

        typing.textContent =
        current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex===words.length){

                wordIndex=0;

            }

        }

    }

    setTimeout(type,deleting?40:90);

}

type();

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const value=+counter.innerText;

const increment=target/100;

if(value<target){

counter.innerText=
Math.ceil(value+increment);

setTimeout(update,15);

}else{

counter.innerText=target;

}

}

update();

});

const observer=
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section")
.forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=
section.offsetTop-150;

if(pageYOffset>=top){

current=section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.href.includes(current)){

link.classList.add("active");

}

});

});

const toggle=
document.querySelector(".menu-toggle");

const menu=
document.querySelector("#nav-menu");

toggle.onclick=()=>{

menu.classList.toggle("open");

}

const topBtn =
document.getElementById("topBtn");

window.onscroll=()=>{

topBtn.style.display=

window.scrollY>300

?

"block"

:

"none";

};

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
