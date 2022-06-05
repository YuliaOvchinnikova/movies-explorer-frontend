import { PRODUCTION_URL } from './constants.js';

async function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    const data = await res.json();
    return Promise.reject({ status: res.status, message: data.message });
  }
}

async function checkEmptyResponse(res) {
  if (res.ok) {
    return Promise.resolve({});
  } else {
    const data = await res.json();
    return Promise.reject({
      status: res.status,
      message: data.message,
    });
  }
}

export const register = (name, email, password) => {
  return fetch(`${PRODUCTION_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${PRODUCTION_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).then(checkEmptyResponse);
};

export const signout = () => {
  return fetch(`${PRODUCTION_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  }).then(checkEmptyResponse);
};
