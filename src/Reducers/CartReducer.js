export const CartReducer = (state, action) => {

  switch (action.type) {
    case `ADD_ITEM`:
      return [...state, action.value];
    case `REMOVE_ITEM`:
      const index = state.indexOf(action.value);
      if (index > -1) {
        state.splice(index, 1);
      }
      return state;

    case `LOAD_ITEMS`:
      return action.value;

    case `REFRESH`:
      return [...state];

    default:
      break;
  }
};