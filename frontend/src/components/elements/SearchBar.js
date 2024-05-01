import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [forumResults, setForumResults] = useState([]);
  const [profileResults, setProfileResults] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const search = async () => {
      if (searchTerm.trim() !== '') {
        let searchQuery = searchTerm.trim();

        if (searchQuery.toLowerCase().startsWith("f/")) {
          const forumQuery = searchQuery.slice(2).trim();
          const forumResp = await apiClient.post('/forums/search', { searchTerm: forumQuery });
          handleResp(forumResp, data => {
            setForumResults(data.forums || []);
          });
          setProfileResults([]);
        } else if (searchQuery.toLowerCase().startsWith("p/")) {
          const profileQuery = searchQuery.slice(2).trim();
          const profileResp = await apiClient.post('/profile/search', { searchTerm: profileQuery });
          handleResp(profileResp, data => {
            setProfileResults(data.profiles || []); // Corrected key to 'profiles'
          });
          setForumResults([]);
        } else {
          setForumResults([]);
          setProfileResults([]);
        }
      } else {
        setForumResults([]);
        setProfileResults([]);
      }
    };

    search();
  }, [searchTerm]);

  const handleForumClick = (forumName) => {
    navigate(`/forum/${forumName}`);
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="search-wrapper">
      <input type="search" id="search" placeholder="To Search Forums, use F/input.                                  To Search Profiles, use P/input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <hr></hr>
      {(forumResults.length > 0 || profileResults.length > 0) && (
        <div className="search-results">
          {forumResults.map((forum) => (
            <h4 key={forum._id} onClick={() => handleForumClick(forum.name)}>{forum.name}</h4>
          ))}
          {profileResults.map((profile) => (
            <h4 key={profile._id} onClick={() => handleProfileClick(profile._id)}>{profile.username}</h4>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
