// document.addEventListener("DOMContentLoaded", function() {
//   const controller = new DomController
//   controller.init()
// });

// ******************* Dom Elements *****************
const bookList = document.querySelector('#list');
const showPanel = document.querySelector("#show-panel");

// ******************* Network Requests *****************
fetch('http://localhost:3000/books')
.then (res => res.json())
.then (booksArray => listPanel(booksArray))

// function fetchSingleBook(bookId){
//   fetch(`http://localhost:3000/books/:${bookId}`)
//   .then (res => res.json())
//   .then (book => showSingleBook(book))
// }

// ******************* Events Listeners *****************

// ******************* Dom Manipulation / functions *****************
function listPanel(booksArray){
  booksArray.forEach(book => {
    const bookLi = document.createElement('li')
    bookLi.textContent = book.title
    bookLi.dataset.id = book.id
    // bookLi.addEventListener('click', (e) => {
      // showSingleBook(book.id)
      bookList.append(bookLi)
  });
})
}

// function showSingleBook(book){
//   const h2 = document.createElement('h2')
//   const img = document.createElement('img')
//   const p = document.createElement('p')
//   const ul = document.createElement('ul')
  
//   h2.innerText = book.title
//   img.src = book.img_url
//   p.innerText = book.description
//   book.users.forEach(user => {
//     let li = document.createElement('li');
//     li.innerText = user.username
//     ul.append(li)
//   });

//   showPanel.append(h2, img, p, ul);
// }
