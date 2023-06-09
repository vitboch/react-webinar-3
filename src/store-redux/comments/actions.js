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
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });
        // Коментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

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
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({text, 'parent': {_id, _type}})
        });

        cb();
        // Коментарии добавлен успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    };
  }
};
