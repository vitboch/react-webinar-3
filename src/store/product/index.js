import StoreModule from '../module';

class Product extends StoreModule {

  initState() {
    return {}
      ;
  }

  async loadProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const {result} = await response.json();
    this.setState({...this.getState(), result}, 'Добавлен товар по ID');
  }
}

export default Product;
