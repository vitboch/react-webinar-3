import StoreModule from '../module';
import {categoriesHierarchyGenerator} from '../../utils';

/**
 * Детальная ифнормация о категориях для главной страницы
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false // признак ожидания загрузки
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущих категорий и установка признака ожидания загрузки
    this.setState({
      list: [],
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/categories?fields=*&limit=*');
      const {result} = await response.json();

      // Категории загружены успешно
      this.setState({
        list: categoriesHierarchyGenerator(result.items),
        waiting: false
      }, 'Загружены категории из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        list: [],
        waiting: false
      });
    }
  }
}

export default CategoriesState;
