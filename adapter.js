class JSONAPIAdapter {
  constructor(baseURI) {
    this.baseURI = baseURI
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getAll() {
    return this._send(this.baseURI)
  }

  get(id) {
    return this._send(`${this.baseURI}/${id}`)
  }

  patch(id, data) {
    return this._send(`${this.baseURI}/${id}`,{
        method: 'PATCH',
        headers: this.defaultHeaders,
        body: JSON.stringify(data)
      })
  }

  _send(endpoint, options) {
    return fetch(endpoint, options)
              .then(response => {
                if (response.ok) {
                  return response.json()
                } else {
                  throw response
                }
              })
  }
}