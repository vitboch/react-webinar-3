import {codeGenerator} from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      page: 1
    }
  }

  async load(page = this.getState().page) {
    const url = `?limit=10&skip=${(page > 0 ? page - 1 : 0) * 10}&fields=items(_id, title, price),count`
    const response = await fetch('/api/v1/articles' + url);
    const {result} = await response.json();
    const pages = Math.ceil(result.count / 10)
    this.setState({
      ...this.getState(),
      list: result.items,
      page,
      pages
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
