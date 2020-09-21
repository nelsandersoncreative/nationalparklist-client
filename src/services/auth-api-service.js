import config from '../config';

const AuthApiService = {
  async login(user_email, user_password){
    const res = await fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_email,
        user_password
      })
    })

    if (!res.ok) {
      return res.json().then(e => Promise.reject(e))
    }

    return res.ok ? await res.json() : Promise.reject(res.json())
  },

  async createUser(userData){
    const res = await fetch(`${config.API_ENDPOINT}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!res.ok) {
      return res.json().then(e => Promise.reject(e))
    }
    return res.json();
  }

  // async getCurrentUser() {
  //   const res = await fetch(`${config.API_ENDPOINT}/users/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${TokenService.getAuthToken()}`
  //     }
  //   })

  //   if (!res.ok) {
  //     return res.json().then(e => Promise.reject(e))
  //   }

  //   return JSON.stringify(res);
  // }
}

export default AuthApiService;