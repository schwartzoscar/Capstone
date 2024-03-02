import { createContext, useContext, useReducer, useEffect } from 'react';

export const TOKEN_KEY = 'thridder_access_token';
export const USER_KEY = 'thridder_current_user';

const AuthContext = createContext({});

const AuthReducer = (state, action) => {
  switch(action.type) {
    case 'login':
      return {...state, accessToken: action.data.accessToken, currentUser: action.data.user};
    case 'logout':
      return {...state, accessToken: null, currentUser: null};
    default:
      return state;
  }
}

export function AuthProvider(props) {

  // Set initial state from sessionStorage.
  const currentUser = sessionStorage.getItem(USER_KEY) ? JSON.parse(sessionStorage.getItem(USER_KEY)) : null;
  const accessToken = sessionStorage.getItem(TOKEN_KEY);
  const [state, dispatch] = useReducer(AuthReducer, {currentUser, accessToken});

  // Update sessionStorage as state changes.
  useEffect(() => {
    if(state.accessToken) {
      sessionStorage.setItem(TOKEN_KEY, state.accessToken);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
    if(state.currentUser) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(state.currentUser));
    } else {
      sessionStorage.removeItem(USER_KEY);
    }
  }, [state.accessToken, state.currentUser]);

  return(
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
