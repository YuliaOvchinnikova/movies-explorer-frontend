import { MOVIES_URL } from './constants.js';

class MoviesApi {
  constructor({ address }) {
    this._address = address;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject({
        status: res.status,
        text: `Ошибка: ${res.status}`,
      });
    }
  }

  getAllMovies() {
    return fetch(`${this._address}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

const config = {
  address: `${MOVIES_URL}/beatfilm-movies`,
};

const moviesApi = new MoviesApi(config);

export default moviesApi;
