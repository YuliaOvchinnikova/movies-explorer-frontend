class MainApi {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  // _checkResponse(res) {
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject({
  //       status: res.status,
  //       text: `Ошибка: ${res.status}`,
  //     });
  //   }
  // }

  // getInitialCards() {
  //   return fetch(`${this._address}/cards`, {
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }

  // addNewCard(name, link) {
  //   return fetch(`${this._address}/cards`, {
  //     method: 'POST',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ name: name, link: link }),
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }

  // deleteCard(id) {
  //   return fetch(`${this._address}/cards/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }

  // getUserInfo() {
  //   return fetch(`${this._address}/users/me`, {
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }

  // likeCard(id) {
  //   return fetch(`${this._address}/cards/${id}/likes`, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }

  // unlikeCard(id) {
  //   return fetch(`${this._address}/cards/${id}/likes`, {
  //     method: 'DELETE',
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

  // changeAvatar(avatar) {
  //   const body = {
  //     avatar: avatar,
  //   };
  //   return fetch(`${this._address}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }
}

const config = {
  address: 'http://api.movies-library.nomoredomains.work',
  token: '6ab3ffcb-8b7e-4953-95c8-2915e9d79fac',
};

const mainApi = new MainApi(config);

export default mainApi;

