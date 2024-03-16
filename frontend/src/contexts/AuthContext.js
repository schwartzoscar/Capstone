import { createContext, useContext, useState, useEffect } from 'react';
import { noRedirectClient } from "../helpers/requestHelpers";

export const USER_KEY = 'thridder_current_user';

const AuthContext = createContext({});

export function AuthProvider(props) {

  const [cookieLoginAttempted, setCookieLoginAttempted] = useState(!!sessionStorage.getItem(USER_KEY));
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem(USER_KEY) ? JSON.parse(sessionStorage.getItem(USER_KEY)) : null
  );

  useEffect(() => {
    if(currentUser) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem(USER_KEY);
    }
  }, [currentUser]);

  const attemptCookieLogin = () => {
    noRedirectClient.post('/auth/cookieLogin')
      .then(resp => {
        if(resp.data?.message === "OK") {
          setCurrentUser(resp.data.user);
        }
      })
      .catch(error => {})
      .finally(() => setCookieLoginAttempted(true));
  }

  useEffect(() => {
    if(!cookieLoginAttempted) {
      attemptCookieLogin();
    }
  }, [cookieLoginAttempted]);

  // TODO Create loading screen for when attempting to login with cookie.
  if(!cookieLoginAttempted) return null;

  return(
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
