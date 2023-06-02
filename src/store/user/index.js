import StoreModule from '../module';

/**
 * Детальная ифнормация о пользователе для страницы профиль
 */
class UserState extends StoreModule {

  initState() {
    return {
      name: '',
      phone: '',
      email: '',
      isAuth: false, // авторизация пользователя
      waiting: false, // признак ожидания загрузки
      error: null
    };
  }

  /**
   * Вход пользователя по логину и паролю
   * @param data {Object}
   * @return {Promise<void>}
   */
  async signIn(data) {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const {result} = await response.json();

      // Сохраняем токен в localStorage
      localStorage.setItem('token', result['token']);

      // Пользователь загружен успешно
      this.setState({
        name: result.user.profile.name,
        phone: result.user.profile.phone,
        email: result.user.email,
        isAuth: true,
        waiting: false
      }, 'Данные о пользователе загружены из АПИ');
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        error: e.message,
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
          name: '',
          phone: '',
          email: '',
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

      const {result} = await response.json();

      // Пользователь загружен успешно
      this.setState({
        name: result.profile.name,
        phone: result.profile.phone,
        email: result.email,
        isAuth: true,
        waiting: false
      }, 'Данные о пользователе загружены из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        name: '',
        phone: '',
        email: '',
        isAuth: false,
        waiting: false
      });
    }
  }
}

export default UserState;
