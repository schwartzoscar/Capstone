import { useState, createContext, useContext } from 'react';

const CurrentForumContext = createContext({});

export function CurrentForumProvider(props) {

  const [currentForum, setCurrentForum] = useState(null);

  return(
    <CurrentForumContext.Provider value={{ currentForum, setCurrentForum }}>
      {props.children}
    </CurrentForumContext.Provider>
  );
}

export const useCurrentForumContext = () => useContext(CurrentForumContext);
