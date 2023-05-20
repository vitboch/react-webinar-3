/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.amount = 0;
    this.quantity = 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Выбор состояния корзины
   * @returns {Array}
   */
  getItem() {
    return this.state.list.filter(item => item.count > 0) || [];
  }

  /**
   * Получение количества
   * @returns {Number}
   */
  getQuantity() {
    this.quantity = 0
    this.state.list.forEach(item => {
      if (item.selected !== undefined && item.selected) {
        this.quantity++
      }
    })
    return this.quantity
  }

  /**
   * Получение суммы
   * @returns {Number}
   */
  getAmount() {
    return this.getItem().reduce((acc, item) => acc + item.price * item.count, 0);
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара по коду
   * @param code
   */
  addItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: true,
            count: item.count + 1 || 1,
          };
        }
        return item
      })
    })
  };

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteItem(code) {

    this.setState({
        ...this.state,
      list: this.state.list.map(item => {
          if (item.code === code) {
            return {
              ...item,
              selected: !item.selected,
              count: 0,
            };
          }
          return item
        })
      })
  };
}

export default Store;
