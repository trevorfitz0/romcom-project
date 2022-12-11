// global variables 👇
//__________________________________________________________________

var currentCover
var savedCovers = []
var coverRandom 
var titleRandom
var descriptorRandom1
var descriptorRandom2
var view
var deleteSavedCover


// query/getElement selectors 👇
//__________________________________________________________________

var randomCover = document.getElementsByClassName("random-cover-button")
var saveCover = document.getElementsByClassName("save-cover-button")
var createCover = document.getElementsByClassName("create-new-book-button")
var coverView = document.getElementsByClassName("home-button hidden")
var saveView = document.getElementsByClassName("view-saved-button")
var formView = document.getElementsByClassName("make-new-button")


var inputCover = document.getElementById("cover")
var inputTitle = document.getElementById("title")
var inputDescriptor1 = document.getElementById("descriptor1")
var inputDescriptor2 = document.getElementById("descriptor2")

var savedGallery = document.querySelector(".saved-covers-section")

var deleteSavedCover = document.querySelector(".mini-cover")

// Event listeners 👇
//__________________________________________________________________
randomCover[0].addEventListener('click', newRandomCover)

saveCover[0].addEventListener('click', saveCov)


createCover[0].addEventListener('click', coverCreate)


coverView[0].addEventListener('click', homeView)


saveView[0].addEventListener('click', viewSaved)


formView[0].addEventListener('click', viewForm)



// event handlers and functions 👇
//__________________________________________________________________________________

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function newRandomCover() {

    coverRandom = (getRandomIndex(covers))
    titleRandom = (getRandomIndex(titles))
    descriptorRandom1 = (getRandomIndex(descriptors))
    descriptorRandom2 = (getRandomIndex(descriptors))

    document.getElementsByClassName("cover-image")[0].src = covers[coverRandom]
    document.getElementsByClassName("cover-title")[0].innerHTML = titles[titleRandom]
    document.getElementsByClassName("tagline")[0].innerHTML = `A tale of ${descriptors[descriptorRandom1]} and ${descriptors[descriptorRandom2]}`

    currentCover = new Cover(covers[coverRandom], titles[titleRandom], descriptors[descriptorRandom1], descriptors[descriptorRandom2])

  }

  function saveCov() {
    if (!savedCovers.includes(currentCover)) {
      savedCovers.push(currentCover)
    }
    return savedCovers
  }

    function coverCreate() {

      var inputCover = document.getElementById("cover").value
      var inputTitle = document.getElementById("title").value
      var inputDescriptor1 = document.getElementById("descriptor1").value
      var inputDescriptor2 = document.getElementById("descriptor2").value

      if(inputCover !== ''  && inputTitle !== '' && inputDescriptor1 !== '' && inputDescriptor2 !== '') {
        
        hide()

        document.getElementsByClassName("cover-image")[0].src = inputCover
        document.getElementsByClassName("cover-title")[0].innerHTML = inputTitle
        document.getElementsByClassName("tagline")[0].innerHTML = `A tale of ${inputDescriptor1} and ${inputDescriptor2}`

        document.getElementsByClassName("view home-view")[0].style.display = "block"

      } else {
        window.alert("All Elements Must be Filled in!");
      }

      currentCover = new Cover(inputCover, inputTitle, inputDescriptor1, inputDescriptor2)

    }

// Page Switching 👇
//__________________________________________________________________________________

function homeView() {
    view = 'home'
    hide()
    document.getElementsByClassName("view home-view")[0].style.display = "block"
}

function viewForm() {
    view = 'form'
    hide()
    document.getElementsByClassName("view form-view hidden")[0].style.display = "block"
}

function viewSaved() {
    view = 'saved'
    hide()
    displaySavedCovers()
    document.getElementsByClassName("view saved-view hidden")[0].style.display = "block"
    document.getElementsByClassName("saved-covers-section")[0].style.display = "block"
  
}

function displaySavedCovers() {
  savedGallery.innerHTML = ' '
  for (var i = 0; i < savedCovers.length; i++) {
    savedGallery.innerHTML += `
    <section class = "saved-covers-section" id = "${savedCovers[i].id}">
      <section class = "mini-cover">
        <img class="mini-cover" src= ${savedCovers[i].cover} </img>
        <h2 class="cover-title"> ${savedCovers[i].title} </h2>
        <h3 class="tagline"> A tale of ${savedCovers[i].tagline1} and ${savedCovers[i].tagline2}</h3>
      </section>
    </section>
    `
    }
    miniCovers = savedGallery.children;
    for (var i = 0; i < miniCovers.length; i++) {
      miniCovers[i].addEventListener("dblclick", deleteCover)
  }
}

function deleteCover(e) {
  var parent = e.currentTarget.parentElement
  var target = e.currentTarget
  parent.removeChild(e.currentTarget)

  console.log(target)
  
  for (var i = 0; i < savedCovers.length; i++) {
    var check1 = target.id + ""
    var check2 = savedCovers[i].id + ""
    //console.log(check2)
    console.log('________________________')
    if (check1 === check2) {
        savedCovers.splice(i, 1)
        //console.log('removed')
    }
  }
}


function hide() {
  buttonCheck()
  document.getElementsByClassName("view home-view")[0].style.display = "none"
  document.getElementsByClassName("view saved-view hidden")[0].style.display = "none"
  document.getElementsByClassName("view form-view hidden")[0].style.display = "none"
}
//__________________________________________________________________________________

function buttonCheck() {
  
    var homeHide = document.getElementsByClassName("home-button hidden")[0].classList.contains("hidden");
    var randomHide = document.getElementsByClassName("random-cover-button")[0].classList.contains("hidden");
    var saveHide = document.getElementsByClassName("save-cover-button")[0].classList.contains("hidden");
    var viewHide = document.getElementsByClassName("view-saved-button")[0].classList.contains("hidden");
    var makeHide = document.getElementsByClassName("make-new-button")[0].classList.contains("hidden");

    if(homeHide === true){
      document.getElementsByClassName("home-button hidden")[0].style.display = "none"
    }
    if(randomHide === true){
      document.getElementsByClassName("random-cover-button")[0].style.display = "block"
    }
    if(saveHide === true){
      document.getElementsByClassName("save-cover-button")[0].style.display = "block"
    }
    if(viewHide === true){
      document.getElementsByClassName("view-saved-button")[0].style.display = "block"
    }
    if(makeHide === true){
      document.getElementsByClassName("make-new-button")[0].style.display = "block"
    }


  if(view === 'home') {
    document.getElementsByClassName("random-cover-button")[0].style.display = "block"
    document.getElementsByClassName("save-cover-button")[0].style.display = "block"
    document.getElementsByClassName("view-saved-button")[0].style.display = "block"
    document.getElementsByClassName("make-new-button")[0].style.display = "block"
  } else if(view === 'saved') {
    document.getElementsByClassName("home-button hidden")[0].style.display = "block"
    document.getElementsByClassName("make-new-button")[0].style.display = "block"
  } else if(view === 'form') {
    document.getElementsByClassName("home-button hidden")[0].style.display = "block"
    document.getElementsByClassName("save-cover-button")[0].style.display = "block"
    document.getElementsByClassName("view-saved-button")[0].style.display = "block"

  }
}
