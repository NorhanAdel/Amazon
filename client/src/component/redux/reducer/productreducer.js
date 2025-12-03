const product = [];


export const productReducer = (state = { product }, action) => {
    switch (action.type) {
      case "SUCCES_GET_PRODUCT":
        return { product: action.payload };
      case "FAIL_GET_PRODUCT":
            return { product: action.payload };
        default:return state
    }
};