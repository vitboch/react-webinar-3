/**
 * Возвращает дату в необходимом виде
 * @param date {String} Исходная дата
 * @returns {String} Новая строка
 */
export default function formatDate(date) {
  const options = {day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'};
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', options);
  return formattedDate.replace(',', ' в').replace(' г.', '');
}
