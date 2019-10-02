import {
  CUSTOMER_QUERY,
  PAGINATION_FOR_CUSTOMER,
  LOADING_CUSTOMER_TABLE,
  ADD_MAIN_INFO
} from '../types';

const initialState = {
  queryData: [],
  pagination: 10,
  page: 1,
  totalResults: 0,
  lastQuery: null,
  pages: 1,
  loading: false,
  locationInfo: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CUSTOMER_QUERY:
      return {
        ...state,
        queryData: payload.users,
        totalResults: payload.total,
        pages: payload.pages
      };
    case PAGINATION_FOR_CUSTOMER:
      return { ...state, pagination: payload.pagination, page: payload.page };
    case LOADING_CUSTOMER_TABLE:
      return { ...state, loading: payload };
    case ADD_MAIN_INFO:
      return { ...state, locationInfo: payload };
    default:
      return state;
  }
};

// a-202-210-40
