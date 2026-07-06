// Selector to calculate the total price of the items in the basket
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

// Load any saved basket items from the browser's memory
const savedBasket = JSON.parse(localStorage.getItem('amazon_basket')) || [];

export const initialState = {
  basket: savedBasket,
  user: null,
  searchTerm: "",
  darkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      const updatedBasketAdd = [...state.basket, action.item];
      localStorage.setItem('amazon_basket', JSON.stringify(updatedBasketAdd));
      return {
        ...state,
        basket: updatedBasketAdd,
      };

    case 'EMPTY_BASKET':
      localStorage.setItem('amazon_basket', JSON.stringify([]));
      return {
        ...state,
        basket: [],
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in basket!`
        );
      }
      
      localStorage.setItem('amazon_basket', JSON.stringify(newBasket));
      return {
        ...state,
        basket: newBasket,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};

export default reducer;