export const favouritesInitialState = JSON.parse(localStorage.getItem('favourites')) || [];

export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVOURITES': {
      localStorage.setItem('favourites', JSON.stringify(action.payload));
      return action.payload;
    }
    case 'TOGGLE_FAVOURITE': {
      const isFavourite = state.some(photo => photo.id === action.payload.id);
      let newState;
      if (isFavourite) {
        newState = state.filter(photo => photo.id !== action.payload.id);
      } else {
        newState = [...state, action.payload];
      }
      localStorage.setItem('favourites', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
