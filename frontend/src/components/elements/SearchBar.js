import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [forums, setForums] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const searchForums = async () => {
      if (searchTerm.trim() !== '') {
        let isForumSearch = false;
        let searchQuery = searchTerm.trim();
        
        if (searchQuery.toLowerCase().startsWith("f/")) {
          isForumSearch = true;
          searchQuery = searchQuery.slice(2).trim();
        }

        if (isForumSearch) {
          const resp = await apiClient.post('/forums/search', { searchTerm: searchQuery });
          handleResp(resp, data => {
            setForums(data.forums);
          });
        } else {
        }
      } else {
        setForums([]);
      }
    };

    searchForums();
  }, [searchTerm]);

  const handleForumClick = (forumName) => {
    navigate(`/forum/${forumName}`);
  };

  return (
    <div className="search-wrapper">
      <input type="search" id="search" placeholder="To Search Forums, use F/input                                                                    To Search Posts, use P/input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <hr></hr>
      {forums.length > 0 && (
        <div className="forum-results">
          {forums.map((forum) => (
            <h4 key={forum._id} onClick={() => handleForumClick(forum.name)}>{forum.name}</h4>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
