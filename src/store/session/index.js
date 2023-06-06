import StoreModule from '../module';

/**
 * Детальная ифнормация о сессии пользователя
 */
class UserState extends StoreModule {

  initState() {
    return {
      isAuth: false, // авторизация пользователя
      waiting: false, // признак ожидания загрузки
      error: null
    };
  }

  removeError() {
    this.setState({
      isAuth: false,
      waiting: false,
      error: null
    });
  }

  /**
   * Вход пользователя по логину и паролю
   * @param data {Object}
   * @return {Promise<void>}
   */
  async signIn(data) {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();
      const result = json.result;

      // Сохраняем ошибку от сервера из ответа
      const errorMessage = json.error?.data.issues[0].message;
      if (errorMessage) {
        return this.setState({
          ...this.getState(),
          error: errorMessage ? errorMessage : null
        });
      }

      // Сохраняем токен в localStorage
      localStorage.setItem('token', result['token']);

      // Пользователь загружен успешно
      this.setState({
        error: null,
        isAuth: true,
        waiting: false
      }, 'Данные о пользователе загружены из АПИ');
    } catch (e) {
      console.log(e);
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        waiting: false
      });
    }
  }

  /**
   * Выход пользователя
   * @return {Promise<void>}
   */
  async signOut() {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true
    });

    try {
      const response = await fetch('/api/v1//users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token')
        }
      });
      if (response.ok) {
        // удаляем токен из localStorage
        localStorage.removeItem('token');

        this.setState({
          isAuth: false,
          waiting: false,
          error: null
        });
      }
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        waiting: false
      });
    }
  }

  /**
   * Загрузка данных пользователя по токену
   * @return {Promise<void>}
   */
  async getInfo() {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/self', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token')
        }
      });

      // Пользователь загружен успешно
      this.setState({
        ...this.getState(),
        waiting: false
      }, 'Данные о пользователе загружены из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        waiting: false
      });
    }
  }
}

export default UserState;
