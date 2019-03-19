const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyurl = 'http://localhost:3000/toys'
const container = document.getElementById('toy-collection')

// YOUR CODE HERE
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', event => {
      event.preventDefault();
      const formName = document.getElementsByName('name')[0].value
      const formImage = document.getElementsByName('image')[0].value
      const formToyObject = {
                              "name": formName,
                              "image": formImage,
                              "likes": 0
                            }
      postRequest(formToyObject)
      addToyInfo(formToyObject)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!

function postRequest(toy) {
  fetch(toyurl, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toy)
  })
}

function addLikeListener(cardEl) {
  cardEl.addEventListener('click', event => {
    if (event.target.className === 'like-btn') {
    let id = event.target.parentElement.dataset.id
    let like = event.target.parentElement.querySelector('p')
    let likeCount = parseInt(like.innerText)
    like.innerText = `${++likeCount} Likes`

    const url = toyurl + `/${id}`
    const body = {
    "likes": likeCount
  }
    fetch(url, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(resp => resp.json()).then(console.log)
  }
    // console.log("wow")

  })
}

function addToyInfo(toy) {
  const cardEl = document.createElement('div')
  cardEl.className = 'card'
  cardEl.dataset.id = `${toy.id}`

  cardEl.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>`

  container.appendChild(cardEl)
  addLikeListener(cardEl)
}

function addToys(toys) {
  toys.forEach(addToyInfo)
}

function getToys() {
  return fetch(toyurl)
    .then(resp => resp.json())
    .then(toys => addToys(toys))
}

function initialize() {
  getToys()
  // addLikeListener()
}

initialize()
