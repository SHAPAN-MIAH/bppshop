
const RelatedProductsReducers = (state = { RelatedProducts: {} }, action) => {
  switch (action.type) {
    case "GET_RELATED_PRODUCT_SUCCESS":{
        return {
          ...state,
          RelatedProducts:  action.payload,
        };
      
    }

    case "CLEAR_ADD_TO_CART_RES": {
      return {
        RelatedProducts: {},
      };
    }

    default:
      return state;
  }
};

export default RelatedProductsReducers;