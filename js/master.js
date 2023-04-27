document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    this.classList.toggle('fa-spin');
    document.querySelector(".settings-box").classList.toggle("open");
};

let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-costom-color', mainColors);
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });

}
const colorsli = document.querySelectorAll(".colors-list li");
colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        // console.log(e.target.dataset.color);
        document.documentElement.style.setProperty('--main-costom-color', e.target.dataset.color);
        localStorage.setItem('color_option', e.target.dataset.color);
        handleActive(e);
    });

});

let backgroundOption = true;
let backgroundInterval;
let backgroundlocalitem = localStorage.getItem("background_option");
if (backgroundlocalitem != null) {
    if (backgroundlocalitem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundlocalitem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");

    }
}
const randombackel = document.querySelectorAll(".random-backgrounds span");
randombackel.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.backgrounds === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
let landingpage = document.querySelector(".landing-page");
let imgsArray = ["landing-1.jpg", "landing-2.jpg", "landing-3.jpg", "landing-4.jpg", "landing-5.jpg"];

function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingpage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 2000);
    }
}
randomizeImgs();

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop = (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;

        });

    }

};

let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgTxt = document.createTextNode(img.alt);
            imgHeading.appendChild(imgTxt);
            popupBox.appendChild(imgHeading);
        }
        let popupImage = document.createElement("img")
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        let closeButton = document.createElement('span');
        let closeButtonTxt = document.createTextNode('X');
        closeButton.appendChild(closeButtonTxt);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);

    });

});

document.addEventListener('click', (e) => {
    if (e.target.className == 'close-button') {
        // e.target.parentNode.remove();
        document.querySelector('.popup-box').remove();
        document.querySelector('.popup-overlay').remove();
    }

});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");



function scrolltosection(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });

        });
    });
}

scrolltosection(allBullets);
scrolltosection(allLinks);

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add('active');
}

let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalitem = localStorage.getItem('bullets_option');
if (bulletLocalitem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });
    if (bulletLocalitem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');

    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}


bulletsSpan.forEach(span => {
    span.addEventListener('click', (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets_option', 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets_option', 'none');
        }
        handleActive(e);
    });

});

document.querySelector('.reset-options').onclick = function () {
    // localStorage.clear();
    localStorage.removeItem('bullets_option');
    localStorage.removeItem('color_option');
    localStorage.removeItem('background_option');

    window.location.reload();

}
let toggleButton = document.querySelector('.toggle-menu');
let theLinks = document.querySelector('.links');
toggleButton.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle('menu-active');
    theLinks.classList.toggle('open');
}

document.addEventListener('click', (e) => {
    if (e.target !== toggleButton && e.target !== theLinks) {
        if (theLinks.classList.contains("open")) {
            toggleButton.classList.toggle('menu-active');
            theLinks.classList.toggle('open');
        }

    }
});

theLinks.onclick = function (e) {
    e.stopPropagation();
}