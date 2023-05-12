class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  //Редактирование профиля
  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  //Добавление новой карточки
  addNewCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  changeLikeCardStatus(id, status) {
    if (status) {
      return this.likeCard(id);
    } else {
      return this.unlikeCard(id);
    }
  }

  //Постановка лайка
  likeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  //Cнятие лайка
  unlikeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  //Удаление карточки
  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  //Обновление аватара пользователя
  setAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

export { Api };
