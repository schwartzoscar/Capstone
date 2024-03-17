import { createContext, useContext, useReducer } from 'react';

const paginationInitState = {total: 0, lastId: '0', items: []};
const PaginationContext = createContext(paginationInitState);

const paginationReducer = (state, action) => {
  let s = {...state, total: action.total};
  switch(action.type) {
    case 'next':
      if(action.items.length) s.items = [...s.items, ...action.items];
      break;
    case 'refresh':
      if(action.items.length) s.items = action.items;
      break;
  }
  if(action.items.length) {
    s.lastId = action.items[action.items.length - 1]['_id'];
  }
  return s;
}

export function PaginationProvider(props) {

  const initState = {...paginationInitState};
  const [state, dispatch] = useReducer(paginationReducer, initState);

  return(
    <PaginationContext.Provider value={[state, dispatch]}>
      {props.children}
    </PaginationContext.Provider>
  );
}

export const usePaginationContext = () => useContext(PaginationContext);
