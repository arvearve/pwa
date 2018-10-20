const API_URl = 'https://trondheim-pwa.firebaseio.com/'
class API {
   constructor() {
     this.baseUrl = 'https://trondheim-pwa.firebaseio.com/'
   }

   get(endpoint) {
     return fetch(`${this.baseUrl}${endpoint}`).then(r => r.json())
   }

   post(endpoint, data) {
     return this._send('post', endpoint, data)
   }
  
   put(endpoint, data) {
    return this._send('put', endpoint, data)
  }
  delete(endpoint, data) {
    return this._send('delete', endpoint, data)
  }
   patch(endpoint, data) {
    return this._send('patch', endpoint, data)
  }

  _send(method, endpoint, data) {
     return fetch(`${this.base}${endpoint}`, {
       method,
       header: {
         "Content-Type": 'application/json'
       },
       body: JSON.stringify(data)
     }).then(res => res.json());
   }
}

export default new API();
