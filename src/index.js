const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOYS_URL = "http://localhost:3000/toys"
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

const getToys = () => {
  return fetch(TOYS_URL)
    .then(resp => resp.json())
}

const createCard = (toy) => {
  const card = document.createElement('div')
  const container = document.getElementById('toy-collection')
  card.classList.add("card")
  card.innerHTML = `
    <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" id="btn-${toy.id}">Like <3</button>`
  card.childNodes[7].addEventListener('click', e => {
    addLike(toy.id)
  })
  container.append(card)
}

const createToy = (name, img) => {
  return fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": img,
      "likes": 0
    })
  }).then(resp => resp.json()).then(toy => createCard(toy))
}

const newToy = () => {
  const submitBtn = document.getElementsByName('submit')[0]
  submitBtn.addEventListener('click', e => {
    e.preventDefault()
    let toyImage = document.getElementsByName('image')[0].value
    let toyName = document.getElementsByName('name')[0].value
    createToy(toyName, toyImage)
    toyForm.firstElementChild.reset()
    toyForm.style.display = 'none'
  })
}

const addLike = (toy) => {

  
  let likes = parseInt(document.getElementById(`btn-${toy}`).previousElementSibling.innerText)
  likes++

  return fetch(TOYS_URL + `/${toy}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
     body: JSON.stringify({
        "likes": `${likes}`
    })
  }).then(resp => resp.json)
  .then(() => {
    document.getElementById(`btn-${toy}`).previousElementSibling.innerText = `${likes} likes`
  })
}


const initialize = () => {
  getToys().then(toys => toys.forEach(createCard))
  newToy()
}

initialize()