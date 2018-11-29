class User {
  constructor({ id, username }) {
    this.id = id
    this.username = username
    User.all.push(this)
  }
  
  static populateFromAPI() {
    return User.adapter.getAll()
            .then(json => {
              json.forEach(userData => {
                new User(userData)
              })
            })
  }

  static findById(id) {
    return User.all.find(user => user.id == id)
  }
}

User.all = []
User.adapter = new JSONAPIAdapter('http://localhost:3000/users')