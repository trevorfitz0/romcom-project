var coverRandom 
var titleRandom
var descriptorRandom1
var descriptorRandom2
var view
var currentCover
inputCover = document.getElementById("cover").value
inputTitle = document.getElementById("title").value
inputDescriptor1 = document.getElementById("descriptor1").value
inputDescriptor2 = document.getElementById("descriptor2").value
var block = 'block'
var none = 'none'
var savedGallery = document.querySelector(".saved-covers-section")

    

// We've provided a few variables below

var savedCovers = []

// Event listeners 👇
//__________________________________________________________________________________


var coverView = document.getElementsByClassName("home-button hidden")
coverView[0].addEventListener('click', homeView)

var saveView = document.getElementsByClassName("view-saved-button")
saveView[0].addEventListener('click', viewSaved)

var formView = document.getElementsByClassName("make-new-button")
formView[0].addEventListener('click', viewForm)

//...


var randomCover = document.getElementsByClassName("random-cover-button")
randomCover[0].addEventListener('click', newRandomCover)

var saveCover = document.getElementsByClassName("save-cover-button")
saveCover[0].addEventListener('click', saveCov)

var createCover = document.getElementsByClassName("create-new-book-button")
createCover[0].addEventListener('click', coverCreate)



//__________________________________________________________________________________

// Create your event handlers and other functions here 👇
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
    if(savedCovers.length === 0) {
      savedCovers.push(currentCover)
    } else {
      for(var i = 0; i <= savedCovers.length; i++){
        if (i === savedCovers.length) {
          savedCovers.push(currentCover)
          break  
        } else if (savedCovers[i].title === currentCover.title){
            break
        }  
        }
      }
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
    buttonCheck()
    document.getElementsByClassName("view home-view")[0].style.display = "block"
}

function viewForm() {
    view = 'form'
    hide()
    buttonCheck()
    document.getElementsByClassName("view form-view hidden")[0].style.display = "block"
}

function viewSaved() {
    view = 'saved'
    hide()
    buttonCheck()
    displaySavedCovers()
    document.getElementsByClassName("view saved-view hidden")[0].style.display = "block"
    document.getElementsByClassName("saved-covers-section")[0].style.display = "block"
  
}

function displaySavedCovers() {
  // savedGallery.innerHTML = ''
  for (var i = 0; i < savedCovers.length; i++) {

    console.log(savedCovers[i].cover)
    console.log(savedCovers.length)

    savedGallery.innerHTML += `
    <section class = "saved-covers-section">
      <section class = "mini-cover">
        <img class="mini-cover" src= ${savedCovers[i].cover} </img>
        <h2 class="cover-title"> ${savedCovers[i].title} </h2>
        <h3 class="tagline"> A tale of ${savedCovers[i].tagline1} and ${savedCovers[i].tagline2}</h3>
      </section>
    </section>
    `
  }
}

function hide() {
  document.getElementsByClassName("view home-view")[0].style.display = "none"
  document.getElementsByClassName("view saved-view hidden")[0].style.display = "none"
  document.getElementsByClassName("view form-view hidden")[0].style.display = "none"
}
//__________________________________________________________________________________

function buttonCheck() {
  if(view === 'home') {
    document.getElementsByClassName("home-button hidden")[0].style.display = "none"
    document.getElementsByClassName("random-cover-button")[0].style.display = "block"
    document.getElementsByClassName("save-cover-button")[0].style.display = "block"
    document.getElementsByClassName("view-saved-button")[0].style.display = "block"
    document.getElementsByClassName("make-new-button")[0].style.display = "block"
  } else if(view === 'saved') {
    document.getElementsByClassName("home-button hidden")[0].style.display = "block"
    document.getElementsByClassName("random-cover-button")[0].style.display = "none"
    document.getElementsByClassName("save-cover-button")[0].style.display = "none"
    document.getElementsByClassName("view-saved-button")[0].style.display = "none"
    document.getElementsByClassName("make-new-button")[0].style.display = "block"
  } else if(view === 'form') {
    document.getElementsByClassName("home-button hidden")[0].style.display = "block"
    document.getElementsByClassName("random-cover-button")[0].style.display = "none"
    document.getElementsByClassName("save-cover-button")[0].style.display = "block"
    document.getElementsByClassName("view-saved-button")[0].style.display = "block"
    document.getElementsByClassName("make-new-button")[0].style.display = "none"
  }
}


// We've provided one function to get you started
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}