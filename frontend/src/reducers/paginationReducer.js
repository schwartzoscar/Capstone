import { useReducer } from 'react';

export default function usePaginationReducer(itemType = 'items') {

  let initState = {page: 1, total: 0};
  initState[itemType] = [];

  const reducer = (action, state) => {
    return {...state, page: action.page, total: action.total};
  }

  return useReducer(reducer, initState);
}
