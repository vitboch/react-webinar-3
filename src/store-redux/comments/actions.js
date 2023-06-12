export default {
  /**
   * Загрузка коментариев
   * @param id {String}
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(*,author(profile(name)))`
        });
        // Коментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    };
  },

  /**
   * Добавление коментария
   * @param _id {String}
   * @param _type {String}
   * @param text {String}
   * @param cb {Function}
   * @return {Function}
   */
  add: (_id, _type, text, cb) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comments/create-start'});

      try {
        const response = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: 'POST',
          body: JSON.stringify({text, 'parent': {_id, _type}})
        });
        // Коментарий добавлен успешно
        dispatch({type: 'comments/create-success', payload: {data: response.data.result}});

      } catch (e) {
        dispatch({type: 'comments/create-error'});
      }
    };
  }
};
