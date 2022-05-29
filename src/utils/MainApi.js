class MainApi {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
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
    // console.log(localStorage.getItem('jwt'))
    return fetch(`${this._address}/movies`, {
      headers: {
        authorization: this._token,
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
        authorization: this._token,
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

  deleteSavedMovieById(id) {
    return fetch(`${this._address}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  // getUserInfo() {
  //   return fetch(`${this._address}/users/me`, {
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }

  // changeUserInfo(name, about) {
  //   return fetch(`${this._address}/users/me`, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       about: about,
  //     }),
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }
}

const config = {
  // address: 'http://api.movies-library.nomoredomains.work',
  address: 'http://localhost:3001',
  token: '6ab3ffcb-8b7e-4953-95c8-2915e9d79fac',
};

const mainApi = new MainApi(config);

export default mainApi;
