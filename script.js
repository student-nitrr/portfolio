// Typing Animation

const roles = [
    "Software Developer",
    "Competitive Programmer",
    "Machine Learning Enthusiast",
    "Web Developer"
];

let roleIndex = 0;
let charIndex = 0;
let currentText = "";

function typeEffect(){

    if(charIndex < roles[roleIndex].length){

        currentText += roles[roleIndex][charIndex];

        document.getElementById("typing").textContent =
        currentText;

        charIndex++;

        setTimeout(typeEffect,100);
    }
    else{
        setTimeout(eraseEffect,1500);
    }
}

function eraseEffect(){

    if(currentText.length > 0){

        currentText =
        currentText.slice(0,-1);

        document.getElementById("typing").textContent =
        currentText;

        setTimeout(eraseEffect,50);
    }
    else{

        roleIndex =
        (roleIndex + 1) % roles.length;

        charIndex = 0;

        setTimeout(typeEffect,300);
    }
}

typeEffect();


// Scroll Reveal

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");

            if(entry.target.id === "skills"){
                animateSkills();
            }

            observer.unobserve(entry.target);
        }

    });

});

document.querySelectorAll(".hidden")
.forEach(el => observer.observe(el));


// Skill Animation

function animateSkills(){

    document.querySelectorAll(".skill-card").forEach(card => {

        const score = Number(card.dataset.skill || 0);
        const scoreValue = card.querySelector(".skill-score strong");
        const meterFill = card.querySelector(".skill-meter span");

        let current = 0;
        const duration = 1200;
        const stepTime = 16;
        const increment = Math.max(1, Math.ceil(score / (duration / stepTime)));

        if(meterFill){
            meterFill.style.width = `${score}%`;
        }

        const updateScore = () => {
            current = Math.min(score, current + increment);

            if(scoreValue){
                scoreValue.textContent = `${current}/100`;
            }

            if(current < score){
                requestAnimationFrame(updateScore);
            }
        };

        requestAnimationFrame(updateScore);
    });
}


// Active Navbar

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop =
        section.offsetTop;

        if(window.scrollY >= sectionTop - 200){
            current =
            section.getAttribute("id");
        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === "#" + current
        ){
            link.classList.add("active");
        }

    });

});


// Back To Top

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){
        topBtn.style.display = "block";
    }
    else{
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});


// Dynamic Year

document.getElementById("year")
.textContent =
new Date().getFullYear();