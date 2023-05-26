/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
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
 * Создание диапозона чисел
 * @param start {Number}
 * @param end {Number}
 * @returns {Array}
 */
function range(start, end) {
  return Array.apply(1, Array(1 + end - start))
    .map((_, index) => index + start);
}

/**
 * Генератор страниц
 * @param currentPage {Number}
 * @param totalPages {Number}
 * @returns {Array}
 */
export function pageGenerator(currentPage, totalPages) {
  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  switch (true) {
    case totalPages <= 5:
      return [1, ...range(2, totalPages)];
    case previousPage >= 3 && nextPage < totalPages - 1:
      return [1, '...', ...range(previousPage, nextPage), '...', totalPages];
    case previousPage < 3 && nextPage < totalPages - 1:
      const previousList = [...range(1, nextPage), '...', totalPages]
      return previousList.length === 4 ? [...range(1, nextPage), 3, '...', totalPages] : previousList;
    case previousPage >= 3 && nextPage >= totalPages - 1:
      const nextList = [1, '...', ...range(previousPage, totalPages)]
      return nextList.length === 4 ? [1, '...', totalPages - 2, ...range(previousPage, totalPages)] : nextList;
  }
}

