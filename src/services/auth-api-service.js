import config from '../config';

const AuthApiService = {
  // login helper function for Authentication
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

  // registration/signup helper function for new users
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

}

export default AuthApiService;