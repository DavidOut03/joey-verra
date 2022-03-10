// query selectors
const navLogo = document.querySelector(".navigation__logo");
const body = document.querySelector("html");

const imageGrid = document.querySelector(".image-grid");

const shootButton = document.querySelector(".btn-shoot");
const tourButton = document.querySelector(".btn-tour");
const formButton = document.querySelector(".form__button");

const lightModeSwitch = document.querySelector(".lightmode__checkbox");
var lightMode = false;

// Events
if(lightModeSwitch) {
    lightModeSwitch.addEventListener("change", (e) => {
        switch(lightMode) {
            case false: lightMode = true; break;
            case true: lightMode = false; break;
        }
    
        //Swap the body colours.
        if(body) {
            body.classList.toggle("light");
        }
    
    
        //Swap the logo image
        if(navLogo) {
            switch(lightMode) {
                case false: navLogo.src = "images/logo.svg"; break;
                case true: navLogo.src = "images/logo-light.svg"; break;
            }
        }
    })
}

if(shootButton) {
    shootButton.addEventListener("click", (e) => {
        renderPhotos("photoshoot");
        e.target.classList.add("btn-primary");
        tourButton.classList.remove("btn-primary");
    })
}

if(tourButton) {
    tourButton.addEventListener("click", (e) => {
        renderPhotos("tour");
        e.target.classList.add("btn-primary");
        shootButton.classList.remove("btn-primary");
    })
}

if(formButton) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    formButton.addEventListener("click", async (e) => {
        e.preventDefault();

        if(canSubmit() == true)  {
            e.target.classList.remove("btn-primary")
            e.target.innerText = "Versturen...";
            e.target.disabled = true;
            console.log("Email aan het versturen");

            const response = await emailjs.send("joey-verra","template_hfqe9zb",{
                from_name: `${name.value}`,
                to_name: "Joey Verra",
                message: `${message.value}`,
                reply_to: `${email.value}`,
            }).then((res) => {
                console.log(res.status);
              if(res.status == 200) {
                e.target.classList.add("btn-success")
                e.target.innerText = "Verstuurd";

                name.value = "";
                email.value = "";
                message.value = "";
                const success = document.querySelector(".success");
                success.classList.add("shown");

                setTimeout(() => {
                    e.target.innerText = "Versturen";
                    e.target.classList.add("btn-primary");
                    e.target.classList.remove("btn-success");
                    e.target.disabled = false;
                },5000);
              }
            });



          
        }
    })
}

function canSubmit(e) {
    const name = document.getElementById("name");
    const nameLabel = name.parentElement.querySelector(".form__label");

    const email = document.getElementById("email");
    const emailLabel = email.parentElement.querySelector(".form__label");

    const message = document.getElementById("message");
    const messageLabel = message.parentElement.querySelector(".form__label");


   

    if(name.value === "") {
        nameLabel.classList.add("shown");
    } else {
        nameLabel.classList.remove("shown");
    }

    if(email.value === "") {
        emailLabel.classList.add("shown");
    } else {
        emailLabel.classList.remove("shown");
    }

    if(message.value === "") {
        messageLabel.classList.add("shown");
    } else {
        messageLabel.classList.remove("shown");
    }
    if(name.value !== "" && email.value != "" && message.value != "") {
        return true;
    } else {
        return false;
    }
}

// Scrollbar
window.addEventListener("scroll", (e) => {
    const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    const scrollLabelBox = document.querySelector(".navigation__label");
    scrollLabelBox.style.background = 
    "linear-gradient(var(--nav-toggler-background), var(--nav-toggler-background)) padding-box, linear-gradient(to bottom, var(--color-primary) " + scrollPercentage + "%, var(--nav-toggler-progressbar) " + (scrollPercentage) + "%) border-box";
    // 
    // ` 
    // linear-gradient(var(--nav-toggler-background), var(--nav-toggler-background)) padding-box,
    // linear-gradient(to bottom, var(--color-primary) 0%, var(--nav-toggler-progressbar) ${scrollPercentage}%) border-box;`;
})

// photo grid rendering

function renderPhotos(edition) {

    if(imageGrid) {
        imageGrid.innerHTML = '';
      if(edition) {
        switch(edition) {
            case "photoshoot": renderPhotoShootPhotos(); break;
            case "tour": renderTourPhotos(); break;
         }
        }
    }

    const photos = document.querySelectorAll(".image-grid__photo");
    const moveInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
    
            if(entry.isIntersecting) {
               moveInObserver.unobserve(entry.target);
            }
        })
    }, 
    {
        threshold: 0.5});
    
    
    
    photos.forEach(element => {
        moveInObserver.observe(element);
    });
}

renderPhotos("tour");



function renderPhotoShootPhotos() {
    const dir = "./images/car-fotos/shoot-edition/";
    let totalImages = 21;
    let rows = 4;

    if(window.matchMedia("(max-width: 1200px)").matches) {
        rows = 3;
    } 

    if(window.matchMedia("(max-width: 900px)").matches) {
        rows = 2;
    } 
    if(window.matchMedia("(max-width: 600px)").matches) {
        rows = 1;
    }
    

    if(imageGrid) {
        var totalColumns = 1;
        var columnSize = 0;
        var column = document.createElement("div");
        column.classList.add("image-grid__column");
        imageGrid.appendChild(column);


        for(var i = 1; i < (totalImages + 1); i++) {
            columnSize++;
            
            if(columnSize === (Math.round((totalImages/rows)))) {
                columnSize = 0;

                if(column) {
                    var image = document.createElement("img");
                    image.classList.add("image-grid__photo");
                    image.src = dir + "" + i + ".jpg";
                    column.appendChild(image);
                }

                totalColumns++;
                if(totalColumns <= rows) {
                    column = document.createElement("div");
                    column.classList.add("image-grid__column");
                    imageGrid.appendChild(column);
                }
            } else if(column) {
                var image = document.createElement("img");
                image.classList.add("image-grid__photo");
                image.src = dir + "" + i + ".jpg";
                column.appendChild(image);
            }        
        }
    }
}

function renderTourPhotos() {
    const dir = "./images/car-fotos/tour-edition/";
    let totalImages = 24;
    let rows = 4;

    if(window.matchMedia("(max-width: 1200px)").matches) {
        rows = 3;
    } 

    if(window.matchMedia("(max-width: 900px)").matches) {
        rows = 2;
    } 
    if(window.matchMedia("(max-width: 600px)").matches) {
        rows = 1;
    }
    

    if(imageGrid) {
        var totalColumns = 1;
        var columnSize = 0;
        var column = document.createElement("div");
        column.classList.add("image-grid__column");
        imageGrid.appendChild(column);


        for(var i = 1; i < (totalImages + 1); i++) {
            columnSize++;
            
            if(columnSize === (Math.round((totalImages/rows)))) {
                columnSize = 0;

                if(column) {
                    var image = document.createElement("img");
                    image.classList.add("image-grid__photo");
                    image.src = dir + "" + i + ".jpg";
                    column.appendChild(image);
                }

                totalColumns++;
                if(totalColumns <= rows) {
                    column = document.createElement("div");
                    column.classList.add("image-grid__column");
                    imageGrid.appendChild(column);
                }
            } else if(column) {
                var image = document.createElement("img");
                image.classList.add("image-grid__photo");
                image.classList.add("bottom");
                image.src = dir + "" + i + ".jpg";
                column.appendChild(image);
            }        
        }
    }
}

// IntersectionObservers
const moveInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);

        if(entry.isIntersecting) {
           moveInObserver.unobserve(entry.target);
        }
    })
}, {threshold: 0.5});

const slowlyRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);

        if(entry.isIntersecting) {
            slowlyRevealObserver.unobserve(entry.target);
        }
    })
}, {threshold: 0.5});


// Animations
const moveIn = document.querySelectorAll(".moveIn");
moveIn.forEach(element => {
    moveInObserver.observe(element);
});

// title text animations
const title = document.querySelectorAll(".hero-section__title");
const subTitle = document.querySelectorAll(".hero-section__sub-title");


title.forEach(element => {
    slowlyRevealObserver.observe(element);
});

subTitle.forEach(element => {
    slowlyRevealObserver.observe(element);
});


/// Form setup

function sendEmail(from, message, emailToRespondTo) {
   
}