// Импорт функций для работы с куками
import { setCookie, deleteCookie, getCookie } from "./сookies";

// Интерфейс для конфигурации API
interface IApiConfig {
  baseUrl: string,                  // Базовый URL API
  defaultHeaders: {                 // Заголовки по умолчанию
    'Content-Type': string
  },
  ingredients: string,              // Эндпоинт для ингредиентов
  order: string,                   // Эндпоинт для заказов
  registration: string,             // Эндпоинт для регистрации
  authorization: string,            // Эндпоинт для авторизации
  logout: string,                  // Эндпоинт для выхода
  token: string,                   // Эндпоинт для обновления токена
  forgot: string,                 // Эндпоинт для восстановления пароля
  reset: string,                  // Эндпоинт для сброса пароля
  user: string                    // Эндпоинт для работы с пользователем
}

// Интерфейс для опций запроса
interface IOptions {
  method: string,                  // HTTP-метод (GET, POST и т.д.)
  headers: {                       // Заголовки запроса
    'Content-Type': string,
    authorization?: string        // Необязательный заголовок авторизации
  },
  body?: string                   // Необязательное тело запроса
}

// Конфигурация API
const config = {
  baseUrl: 'https://norma.nomoreparties.space/api', // базовый путь к серверу
  defaultHeaders: {
    'Content-Type': 'application/json'              // тип содержимого по умолчанию
  },
  ingredients: '/ingredients',                     // эндпоинт ингредиентов
  order: '/orders',                                // эндпоинт номера заказа
  registration: '/auth/register',                  // эндпоинт регистрации
  authorization: '/auth/login',                    // эндпоинт авторизации
  logout: '/auth/logout',                          // эндпоинт выхода из системы
  token: '/auth/token',                            // эндпоинт обновления токена
  forgot: '/password-reset',                       // эндпоинт восстановления пароля
  reset: '/password-reset/reset',                  // эндпоинт создания нового пароля
  user: '/auth/user',                              // эндпоинт получения и обновления данных пользователя
};

// Класс для работы с API
class Api {
  readonly baseUrl: string                        // Базовый URL
  readonly defaultHeaders: {                      // Заголовки по умолчанию
    'Content-Type': string
  };
  readonly ingredientsEndpoint: string           // Эндпоинт ингредиентов
  readonly orderEndpoint: string                 // Эндпоинт заказов
  readonly registrationEndpoint: string         // Эндпоинт регистрации
  readonly authorizationEndpoint: string       // Эндпоинт авторизации
  readonly logoutEndpoint: string              // Эндпоинт выхода
  readonly tokenEndpoint: string               // Эндпоинт токена
  readonly forgotEndpoint: string             // Эндпоинт восстановления пароля
  readonly resetEndpoint: string              // Эндпоинт сброса пароля
  readonly userEndpoint: string               // Эндпоинт пользователя

  // Конструктор класса
  constructor({
    baseUrl, defaultHeaders,
    ingredients, order,
    registration, authorization,
    logout, token,
    forgot, reset,
    user
  }: IApiConfig) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
    this.ingredientsEndpoint = ingredients;
    this.orderEndpoint = order;
    this.registrationEndpoint = registration;
    this.authorizationEndpoint = authorization;
    this.logoutEndpoint = logout;
    this.tokenEndpoint = token;
    this.forgotEndpoint = forgot;
    this.resetEndpoint = reset;
    this.userEndpoint = user;
  }

  // Метод для формирования полного URL из базового URL и эндпоинта
  _makeUrl(endpoint: string) {
    return `${this.baseUrl}${endpoint}`;
  }

  // Обработчик ответа от сервера
  _handleResponse(res: Response) {
    if (res.ok) {                         // Если ответ успешный
      return res.json();                 // Возвращаем распарсенный JSON
    }
    // Если ответ с ошибкой, парсим JSON и добавляем код статуса
    return res.json()
      .then(function (err) {
        err.code = res.status;
        return Promise.reject(`Ошибка: ${res.status}`)
      });
  };

  // Базовый метод для выполнения запросов
  _request(
    url: string,
    options: IOptions
  ) {
    return fetch(url, options)
      .then(this._handleResponse)
      .catch((error) => {
        if (error === '403')            // Если ошибка 403 (запрещено)
          console.log(error)           // Логируем ошибку
        deleteCookie('access');        // Удаляем access-токен из куков
        // Обновляем токен и повторяем запрос
        this.refresh()
          .then(({ accessToken }) => {
            setCookie('access', accessToken.split('Bearer ')[1])
          })
            .then(() => this._request(url, options))
      })
  }

  // Метод для получения списка ингредиентов
  getBurgerIngredients() {
    const options = {                 // Опции для GET-запроса
      method: 'GET',
      headers: this.defaultHeaders
    }
    return this._request(this._makeUrl(this.ingredientsEndpoint), options)
  }

  // Метод для получения деталей заказа
  getOrderDetails(idIngredientsList: string[]) {
    const options = {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + getCookie('access'), // Добавляем токен из куков
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: idIngredientsList // Список ID ингредиентов
      })
    }
    return this._request(this._makeUrl(this.orderEndpoint), options)
  }

  // Метод для регистрации пользователя
  registration(
    name: string,
    email: string,
    password: string
  ) {
    const options = {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify({
        name,
        email,
        password
      })
    }
    return this._request(this._makeUrl(this.registrationEndpoint), options)
  }

  // Метод для авторизации пользователя
  authorization(
    email: string,
    password: string
  ) {
    const options = {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify({
        email,
        password
      })
    }
    return this._request(this._makeUrl(this.authorizationEndpoint), options)
  }

  // Метод для выхода пользователя
  logout() {
    const options = {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify({
        token: getCookie('refresh'), // Используем refresh-токен из куков
      })
    }
    return this._request(this._makeUrl(this.logoutEndpoint), options)
  }

  // Метод для запроса восстановления пароля
  forgot(email: string) {
    const options = {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify({
        email: email
      })
    }
    return this._request(this._makeUrl(this.forgotEndpoint), options)
  }

  // Метод для сброса пароля
  reset(
    password: string,
    token: string
  ) {
    const options = {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify({
        password,
        token
      })
    }
    return this._request(this._makeUrl(this.resetEndpoint), options)
  }

  // Метод для обновления токена
  refresh() {
    const options = {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify({
        token: getCookie('refresh'), // Используем refresh-токен из куков
      })
    }
    return this._request(this._makeUrl(this.tokenEndpoint), options)
  }

  // Метод для получения данных пользователя
  getProfile() {
    const options = {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + getCookie('access'), // Используем access-токен
        'Content-Type': 'application/json'
      },
    }
    return this._request(this._makeUrl(this.userEndpoint), options)
  }

  // Метод для обновления данных пользователя
  updateProfile(
    name: string,
    email: string,
    password: string
  ) {
    const options = {
      method: 'PATCH', // Используем PATCH для частичного обновления
      headers: {
        authorization: 'Bearer ' + getCookie('access'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    }
    return this._request(this._makeUrl(this.userEndpoint), options)
  }
}

// Создаем экземпляр API с заданной конфигурацией
export const apiBurger = new Api(config);