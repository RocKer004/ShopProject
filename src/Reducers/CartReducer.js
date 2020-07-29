export const CartReducer = (state, action) => {
  switch (action.type) {
    case `ADD_ITEM`:
      return [...state, action.value];
    case `REMOVE_ITEM`:
      const index = state.indexOf(action.value);
      const newState = [];
      state.map((item) => {
        newState.push(item);
      });
      if (index > -1) {
        newState.splice(index, 1);
      }
      return newState;
    case `LOAD_ITEMS`:
      return action.value;
    case `REFRESH`:
      return [...state];

    default:
      break;
  }
};
