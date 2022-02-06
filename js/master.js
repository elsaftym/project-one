


// cheak if there is color in local storage
let colorOption = window.localStorage.getItem("color-option")

if (colorOption !== null) {
    document.documentElement.style.setProperty("--main-color", colorOption)


    document.querySelectorAll(".colors-list li").forEach((li) => {
        li.classList.remove("active")
    })
    document.querySelector(`[data-color="${colorOption}"]`).classList.add("active")

    document.documentElement.style.setProperty("--main-filter", window.localStorage.getItem("color-filter"))

}

// start toggle setting box
let settingBox = document.querySelector(".setting-box")
let toggleSetting = document.querySelector(".setting-box .toggle-setting")
let gear = document.querySelector(".setting-box .toggle-setting .fa-gear")

toggleSetting.addEventListener("click", () => {
    settingBox.classList.toggle("open")
    gear.classList.toggle("fa-spin")

})

document.addEventListener("click", (e) => {
    if (e.target !== settingBox) {
        settingBox.classList.remove("open")
        gear.classList.remove("fa-spin")
    }
})

settingBox.onclick = (e) => {
    e.stopPropagation()
}

let backgroundOption = true
// cheak if there is background item in local storage
let bgLocalItem = window.localStorage.getItem("background-option")

if (bgLocalItem !== null) {
    if (bgLocalItem === "true") {
        backgroundOption = true
    } else if (bgLocalItem === "false") {
        backgroundOption = false
    } else {
        backgroundOption = false
        document.querySelector(".landing").style.backgroundImage = `url(../${bgLocalItem})`
    }
    document.querySelectorAll(".random-backgrounds span").forEach((span) => {
        span.classList.remove("active")
    })
    if (bgLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    } else if (bgLocalItem === "false") {
        document.querySelector(".random-backgrounds .no").classList.add("active")
    } else {
        backgroundOption = false
        document.querySelector(`[src="${bgLocalItem}"]`).style.width = "35px"
    }
}

// switch colors
const colorsLI = document.querySelectorAll(".colors-list li")



colorsLI.forEach((li) => {

    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)

        window.localStorage.setItem("color-option", e.target.dataset.color)

        handleActive(e)

        document.documentElement.style.setProperty("--main-filter", e.target.dataset.filter)

        window.localStorage.setItem("color-filter", e.target.dataset.filter)

    })

})

// switch random background 

let randomBg = document.querySelectorAll(".random-backgrounds span")



randomBg.forEach((span) => {

    span.addEventListener("click", (e) => {
        handleActive(e)
        if (e.target.classList.contains("yes")) {
            backgroundOption = true
            randomizeimgs()
            imgsEl.forEach((img) => {
                img.style.width = "25px"
            })
            window.localStorage.setItem("background-option",true)
        } else if (e.target.classList.contains("no")) {
            backgroundOption = false
            clearInterval(randomBgInterval)
            imgsEl.forEach((img) => {
                img.style.width = "25px"
            })
            window.localStorage.setItem("background-option",false)
        }
    })

})

// select background 
let imgsEl = document.querySelectorAll(".random-backgrounds .imgs-box img")

imgsEl.forEach((img) => {

    img.addEventListener("click", (e) => {
        backgroundOption = false
        clearInterval(randomBgInterval)
        landing.style.backgroundImage = `url(../${e.target.getAttribute("src")})`
        imgsEl.forEach((img) => {
            img.style.width = "25px"
        })
        e.target.style.width = "35px"
        randomBg.forEach((span) => {
            span.classList.remove("active")
        })
        window.localStorage.setItem("background-option",e.target.getAttribute("src"))
    })

})

// end toggle setting box
// start change landing background
let landing = document.querySelector(".landing")
let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg",]
let randomBgInterval

function randomizeimgs(){
    if (backgroundOption === true) {
            randomBgInterval = setInterval(() => {
            let random = Math.floor(Math.random() * imgs.length)
            landing.style.backgroundImage = `url(../imgs/${imgs[random]})`
        }, 10000)
    }
}
randomizeimgs()
// end change landing background

// select skills 
let skills = document.querySelector(".skills")

window.onscroll = function() {

    let skillsOfsetTop = skills.offsetTop

    let skillsHeight = skills.offsetHeight

    let windowHeight = window.innerHeight

    let windowScrollTop = window.pageYOffset


    if (windowScrollTop > skillsOfsetTop + skillsHeight - windowHeight) {
        let allSkills = document.querySelectorAll(".skills .skill-progress span")

        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress
            let content = skill.dataset.content
            let count = setInterval(() => {
                skill.setAttribute("data-content", skill.dataset.progress)
                if (skill.dataset.content = skill.dataset.progress) {
                    clearInterval(count)
                }
    }, 400)
}
        )
    }
    
}


// create popup box img

let ourGallary = document.querySelectorAll(".gallary .imges-box img")

ourGallary.forEach((img) => {

    img.addEventListener("click", (e) => {

        let popupOverlay = document.createElement("div")

        popupOverlay.className = "popup-overlay"

        document.body.appendChild(popupOverlay)

        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"

        if (e.target.alt !== "") {
            let imgHeading = document.createElement("h3")

            let imgText =document.createTextNode(e.target.alt)

            imgHeading.appendChild(imgText)

            popupBox.appendChild(imgHeading)

        }

        let popupImg = document.createElement("img")
        popupImg.src = e.target.src

        popupBox.appendChild(popupImg)
        
        document.body.appendChild(popupBox)

        let closeIcon = document.createElement("i")

        closeIcon.className = "far fa-times-circle fa-3x"

        popupBox.appendChild(closeIcon)

    })
    
})

document.addEventListener("click", (e) => {
    if (e.target.className === "far fa-times-circle fa-3x") {
        e.target.parentNode.remove()
        document.querySelector(".popup-overlay").remove()
    }
})



// select pullets 
let allPullets = document.querySelectorAll(".nav-pullets .pullet")

// select links 
let allLinks = document.querySelectorAll(".links a")

// scrolling function
function scrollToSomeWhere(elements) {


elements.forEach((ele) => {

        ele.addEventListener("click", (e) => {

            e.preventDefault()

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            })
        })

    })

}

scrollToSomeWhere(allPullets)
scrollToSomeWhere(allLinks)

// handle active state 
function handleActive(el) {
    el.target.parentElement.querySelectorAll(".active").forEach((e) => {
        e.classList.remove("active")
    })
    el.target.classList.add("active")
}


// switch pullets

let pulletsSpan = document.querySelectorAll(".pullets-option span")
let pulletsContainer = document.querySelector(".nav-pullets")
let pulletsLocalItem = localStorage.getItem("pullets-option")

if (pulletsLocalItem !== null) {

    pulletsSpan.forEach((pullet) => {
        pullet.classList.remove("active")
    })

    if (pulletsLocalItem === "true") {
        pulletsContainer.style.display = "block"
        document.querySelector(".pullets-option .yes").classList.add("active")
    } else {
        pulletsContainer.style.display = "none"
        document.querySelector(".pullets-option .no").classList.add("active")
    }
}

pulletsSpan.forEach((pullet) => {

    pullet.addEventListener("click", (e) => {
        if (pullet.classList.contains("yes")) {
            pulletsContainer.style.display = "block"
            window.localStorage.setItem("pullets-option", true)
        } else {
            pulletsContainer.style.display = "none"
            window.localStorage.setItem("pullets-option", false)
        }

        handleActive(e)

    })

})


// reset button 
document.querySelector(".reset-options").onclick = function() {

    window.localStorage.clear()

    window.location.reload()

}

// open links

let toggleMenu = document.querySelector("header .toggle-menu")
let links = document.querySelector("header .links")

toggleMenu.addEventListener("click", (e) => {
    e.stopPropagation()
    links.classList.toggle("open")
    toggleMenu.classList.toggle("menu-active")
    if (links.classList.contains("open")) {
        document.querySelector(".landing .container").style.zIndex = "1000"
    } else {
        document.querySelector(".landing .container").style.zIndex = "1"
    }
})

document.addEventListener("click", (e) => {

    if (e.target !== toggleMenu && e.target !== links) {
        links.classList.remove("open")
        toggleMenu.classList.remove("menu-active")
        document.querySelector(".landing .container").style.zIndex = "1"
    }

})

links.onclick = function(e) {
    e.stopPropagation()
}