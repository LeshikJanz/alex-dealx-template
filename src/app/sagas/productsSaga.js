import { call, put, fork, takeLatest } from 'redux-saga/effects';
import * as actions from 'actions/index';
import * as templateActions from 'template/actions/index';
import * as api from 'api/index';

import * as constants from 'constants/index';

/**
 * Products
 */
function* getProductsRequest(req) {
  const { payload } = req;
  try {
    const data = yield call(api.getProducts.bind(null, payload));
    if (payload.reset) {
      yield put(actions.getProductsIdle());
    }
    yield put(actions.getProductsSuccess({ data }));
    /**
     * Hack to arrange product thumbnails
     */
    window.dispatchEvent(new Event('resize'));
  } catch (e) {
    yield put(actions.getProductsFailure({ message: 'Cant get products' }));
  }
}

function* getProductRequest(req) {
  const { payload } = req;
  try {
    const data = yield call(api.getProduct.bind(null, payload));
    yield put(actions.getProductSuccess({ data }));
  } catch (e) {
    yield put(actions.getProductFailure({ message: 'Cant get products' }));
  }
}

function* postProductRequest(req) {
  const { payload } = req;
  try {
    const data = yield call(api.postProduct.bind(null, payload));
    yield put(actions.postProductSuccess({ data, message: 'Product has been created' }));
  } catch (e) {
    yield put(actions.postProductFailure({ message: 'Cant post product' }));
  }
}

function* getProductSuggestRequest(req) {
  const { payload: { onComplete, ...search } } = req;
  try {
    const data = yield call(api.getProductSuggest.bind(null, search));
    yield put(actions.getProductSuggestSuccess({ data }));

    const suggestedMake =
      data[0].Make.find(({ Make }) =>
      Make.toLowerCase() === search.search.toLowerCase());
    const suggestedModel =
      data[0].Model.find(({ Make, Model }) =>
      search.search.toLowerCase() === `${Make} ${Model}`.toLowerCase());
    const autoSuggestion = suggestedMake || suggestedModel;

    if (autoSuggestion) {
      yield put(templateActions.updateProductSearch({
        make: autoSuggestion.Make,
        model: autoSuggestion.Model,
        level: autoSuggestion.level || 1,
        isSearchable: true
      }))
    }
    onComplete();
  } catch (e) {
    yield put(actions.getProductSuggestFailure({ message: 'Cant get products' }));
  }
}
export default [
  fork(takeLatest, constants.GET_PRODUCTS_REQUEST, getProductsRequest),
  fork(takeLatest, constants.GET_PRODUCT_REQUEST, getProductRequest),
  fork(takeLatest, constants.POST_PRODUCT_REQUEST, postProductRequest),
  fork(takeLatest, constants.GET_PRODUCT_SUGGEST_REQUEST, getProductSuggestRequest),
];
