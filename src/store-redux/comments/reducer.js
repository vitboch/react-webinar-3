// Начальное состояние
const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
  error: null
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {...state, data: [], waiting: true, error: null};

    case 'comments/load-success':
      return {...state, data: action.payload.data, waiting: false, error: null};

    case 'comments/load-error':
      return {...state, data: [], waiting: false, error: action.payload};

    case 'comments/create-start':
      return {...state, waiting: true, error: null};

    case 'comments/create-success':
      return {...state, data: [...state.data, action.payload.data], waiting: false, error: null};

    case 'comments/create-error':
      return {...state, waiting: false, error: action.payload};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;