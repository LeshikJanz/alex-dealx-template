import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'constants/index';

const initialState = {
  products: {
    data: [],
  },
  product: {
    data: {},
  },
  productSuggest: {
    data: {},
  },
  actions: {
    getProducts: {
      message: null,
      status: null,
      isLoading: false,
      createdAt: null,

      /**
       * Filters/Search related meta data
       */
      meta: {
        options: [],
        search: null,
        limit: 20,
        offset: 0,
      }
    },
    getProduct: {
      message: null,
      status: null,
      isLoading: false,
      createdAt: null,
    },
    postProduct: {
      message: null,
      status: null,
      isLoading: false,
      createdAt: null,
    },
    getProductSuggest: {
      message: null,
      status: null,
      isLoading: false,
      createdAt: null,
    },
  },
};

/**
 * Get products
 */
const getProductsRequest = (state, action) => update(state, {
  actions: {
    getProducts: { $setRequestActionLoading: {
      meta: {
        categoryId: { $set: action.payload.categoryId },
        subCategoryId: { $set: action.payload.subCategoryId },
        offset: { $set: action.payload.offset || state.actions.getProducts.meta.offset },
        limit: { $set: action.payload.limit || state.actions.getProducts.meta.limit },
      },
    } },
  },
});

const getProductsSuccess = (state, action) => update(state, {
  products: {
    data: { $push: action.payload.data },
  },
  actions: {
    getProducts: {
      $setRequestActionSuccess: action.payload,
      meta: {
        offset: { $set: state.actions.getProducts.meta.offset + action.payload.data.length },
      }
    },
  },
});

const getProductsFailure = (state, action) => update(state, {
  actions: {
    getProducts: { $setRequestActionFailure: action.payload },
  },
});

const getProductsIdle = (state) => update(state, {
  products: {
    data: { $set: initialState.products.data },
  },
  actions: {
    getProducts: { $setRequestActionIdle: {
      meta: { $set: initialState.actions.getProducts.meta }
    } },
  },
});


/**
 * Get product
 */
const getProductRequest = (state) => update(state, {
  actions: {
    getProduct: { $setRequestActionLoading: {} },
  },
});

const getProductSuccess = (state, action) => update(state, {
  product: {
    data: { $set: action.payload.data },
  },
  actions: {
    getProduct: { $setRequestActionSuccess: action.payload },
  },
});

const getProductFailure = (state, action) => update(state, {
  actions: {
    getProduct: { $setRequestActionFailure: action.payload },
  },
});

const getProductIdle = (state) => update(state, {
  product: {
    data: { $set: initialState.product.data },
  },
  actions: {
    getProduct: { $setRequestActionIdle: {} },
  },
});


/**
 * Get product
 */
const getProductSuggestRequest = (state) => update(state, {
  actions: {
    getProductSuggest: { $setRequestActionLoading: {} },
  },
});

const getProductSuggestSuccess = (state, action) => update(state, {
  productSuggest: {
    data: { $set: action.payload.data },
  },
  actions: {
    getProductSuggest: { $setRequestActionSuccess: action.payload },
  },
});

const getProductSuggestFailure = (state, action) => update(state, {
  actions: {
    getProductSuggest: { $setRequestActionFailure: action.payload },
  },
});

const getProductSuggestIdle = (state) => update(state, {
  productSuggest: {
    data: { $set: initialState.productSuggest.data },
  },
  actions: {
    getProductSuggest: { $setRequestActionIdle: {} },
  },
});

/**
 * Post product
 */
const postProductRequest = (state) => update(state, {
  actions: {
    postProduct: { $setRequestActionLoading: {} },
  },
});

const postProductSuccess = (state, action) => update(state, {
  actions: {
    postProduct: { $setRequestActionSuccess: action.payload },
  },
});

const postProductFailure = (state, action) => update(state, {
  actions: {
    postProduct: { $setRequestActionFailure: action.payload },
  },
});

const postProductIdle = (state) => update(state, {
  actions: {
    postProduct: { $setRequestActionIdle: {} },
  },
});

export default handleActions({
  [constants.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [constants.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [constants.GET_PRODUCTS_FAILURE]: getProductsFailure,
  [constants.GET_PRODUCTS_IDLE]: getProductsIdle,

  [constants.GET_PRODUCT_REQUEST]: getProductRequest,
  [constants.GET_PRODUCT_SUCCESS]: getProductSuccess,
  [constants.GET_PRODUCT_FAILURE]: getProductFailure,
  [constants.GET_PRODUCT_IDLE]: getProductIdle,

  [constants.POST_PRODUCT_REQUEST]: postProductRequest,
  [constants.POST_PRODUCT_SUCCESS]: postProductSuccess,
  [constants.POST_PRODUCT_FAILURE]: postProductFailure,
  [constants.POST_PRODUCT_IDLE]: postProductIdle,

  [constants.GET_PRODUCT_SUGGEST_IDLE]: getProductSuggestIdle,
  [constants.GET_PRODUCT_SUGGEST_REQUEST]: getProductSuggestRequest,
  [constants.GET_PRODUCT_SUGGEST_SUCCESS]: getProductSuggestSuccess,
  [constants.GET_PRODUCT_SUGGEST_FAILURE]: getProductSuggestFailure,
}, initialState);
