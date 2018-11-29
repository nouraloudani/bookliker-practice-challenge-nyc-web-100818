class DomController {
  constructor() {
    this.bookList = document.getElementById('list')
    this.bookList.addEventListener('click', this.handleBookClick.bind(this))
    this.showPanel = document.getElementById('show-panel')
    this.showPanel.addEventListener('click', this.handleLikeClick.bind(this))
  }

  init() {
    User.populateFromAPI()
      .then(() => Book.populateFromAPI())
      .then(() => this.renderBooks())
  }

  renderBooks() {
    this.bookList.innerHTML = Book.renderListView()
  }

  handleBookClick(e) {
    if (e.target.dataset.action == "show") {
      const book = Book.findById(e.target.dataset.id)
      this.showPanel.innerHTML = book.renderShow()
    } 
  }

  handleLikeClick(e) {
    if (e.target.dataset.action == "like") {
      const book = Book.findById(e.target.dataset.id)
      const user = User.findById(1)
      book.toggleLike(user)
      // render optimistically
      this.showPanel.innerHTML = book.renderShow()
      // update on API
      book.updateUsers()
    }
  }
}