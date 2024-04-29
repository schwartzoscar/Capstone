import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { apiClient } from '../../../helpers/requestHelpers';
import FollowButton from '../../elements/FollowButton';

export default function Following() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/api/users/');
        if (response && response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <p className="tab-content-header">All Profiles</p>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user._id}>
            <p>{user.username}</p>
            <FollowButton userId={user._id} isFollowing={user.isFollowing} />
          </div>
        ))
      ) : (
        <Alert variant="warning">No profiles found.</Alert>
      )}
    </div>
  );
}
