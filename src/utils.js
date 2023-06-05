/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
import login from './app/login';

export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param locale {String}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Генератор иерархии категорий
 * @param arr {Array}
 * @returns {Array}
 */
export function categoriesHierarchyGenerator(arr) {
  const res = [];
  const map = new Map();

  for (const item of arr) {
    map.set(item._id, {...item, children: []});
  }

  for (const item of map.values()) {
    if (item.parent) {
      const parent = map.get(item.parent._id);
      parent.children.push(item);
    } else {
      res.push(item);
    }
  }

  const makeTitle = (category, prefix) => {
    const title = `${prefix}${category.title}`;
    return category.children.reduce((acc, child) => {
      return [...acc, ...makeTitle(child, `${prefix}- `)];
    }, [{title, value: category._id}]);
  };

  return res.reduce((acc, category) => {
    return [...acc, ...makeTitle(category, '')];
  }, []);
}
