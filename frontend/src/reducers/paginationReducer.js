import { useReducer } from 'react';

export default function usePaginationReducer(itemType = 'items') {

  let initState = {lastId: '0'};
  initState[itemType] = [];

  const reducer = (action, state) => {
    let s = {...state};
    s[itemType] = action[itemType];
    if(action[itemType].length) {
      s.lastId = action[itemType][action[itemType].length - 1]['_id'];
    }
    return s;
  }

  return useReducer(reducer, initState);
}
