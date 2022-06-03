class MainApi {
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

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  }) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        nameRU,
        nameEN,
        movieId,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  deleteSavedMovieById(_id) {
    return fetch(`${this._address}/movies/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  changeUserInfo(name, email) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  signout() {
    return fetch(`${this._address}/signout`, {
      method: 'GET',
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

const config = {
  address: 'http://api.movies-library.nomoredomains.work',
};

const mainApi = new MainApi(config);

export default mainApi;
