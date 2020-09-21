import config from '../config';
import TokenService from './TokenService';

const UserApiService = {
  async getUserParks(id) {
    const res = await fetch(`${config.API_ENDPOINT}/user-parks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })

    if (!res.ok) {
      return res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },
};

export default UserApiService;