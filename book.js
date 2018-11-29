class Book {
  constructor({ id, title, description, img_url }) {
    this.id = id
    this.title = title
    this.description = description
    this.img_url = img_url
    Book.all.push(this)
  }

  // custom getter
  get users() {
    const bookUsers = BookUser.filterByBookId(this.id)
    const users = bookUsers.map(bu => User.findById(bu.userId))
    return users
  }

  // toggle likes for local state
  toggleLike(user) {
    // check if this user has already liked this book
    if (this.users.includes(user)) {
      BookUser.remove(this.id, user.id) // remove from local state
    } else {
      new BookUser(this.id, user.id) // add to local state
    }
    // then update on API?
  }
  
  updateUsers() {
    const userData = this.users.map(user => {
      return {
        id: user.id,
        username: user.username
      }
    })
    Book.adapter.patch(this.id, { "users": userData })
  }

  renderListItem() {
    return `<li data-action="show" data-id="${this.id}">
              ${this.title}
            </li>`
  }

  renderShow() {
    return `<div>
              <h1>${this.title}</h1>
              <img src="${this.img_url}">
              <p>${this.description}</p>
              <p><em>Read by: ${this.users.map(user => user.username).join(", ")} </em></p>
              <button data-action="like" data-id="${this.id}">${this.users.includes(User.findById(1)) ? "Mark As Not Read": "Mark As Read"}</button>
            </div>`
  }

  static populateFromAPI() {
    return Book.adapter.getAll()
      .then(json => {
        json.forEach(bookData => {
          new Book(bookData)
          bookData.users.forEach(user => {
            new BookUser(bookData.id, user.id)
          })
        })
      })
  }

  static findById(id) {
    return Book.all.find(book => book.id == id)
  }

  static renderListView() {
    return Book.all.map(book => book.renderListItem()).join("")
  }
}

Book.all = []
Book.adapter = new JSONAPIAdapter('http://localhost:3000/books')