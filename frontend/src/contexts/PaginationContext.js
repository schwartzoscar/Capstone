import { createContext, useContext, useReducer } from 'react';

const initState = {total: 0, lastId: '0', items: []};
const PaginationContext = createContext(initState);

const paginationReducer = (state, action) => {
  let s = {...state, total: action.total};
  if(action.items.length) {
    s.items = [...s.items, ...action.items];
    s.lastId = action.items[action.items.length - 1]['_id'];
  }
  return s;
}

export function PaginationProvider(props) {

  const initState = {total: 0, lastId: '0', items: []};
  const [state, dispatch] = useReducer(paginationReducer, initState);

  return(
    <PaginationContext.Provider value={[state, dispatch]}>
      {props.children}
    </PaginationContext.Provider>
  );
}

export const usePaginationContext = () => useContext(PaginationContext);
