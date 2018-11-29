class BookUser {
  constructor(bookId, userId) {
    if (BookUser.filterByBookIdAndUserId(bookId, userId).length) {
      throw this
    } else {
      this.userId = userId
      this.bookId = bookId
      BookUser.all.push(this)
    }
  }

  static remove(bookId, userId) {
    const bookUserToRemove = BookUser.filterByBookIdAndUserId(bookId, userId)[0]
    BookUser.all = BookUser.all.filter(bu => bu !== bookUserToRemove)
  }

  static filterByBookIdAndUserId(bookId, userId) {
    return BookUser.all.filter(bookUser => bookUser.userId == userId && bookUser.bookId == bookId)
  }

  static filterByBookId(id) {
    return BookUser.all.filter(bookUser => bookUser.bookId == id)
  }

  static filterByUserId(id) {
    return BookUser.all.filter(bookUser => bookUser.userId == id)
  }
}

BookUser.all = []