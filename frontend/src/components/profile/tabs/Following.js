// following.js
import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { apiClient } from '../../../helpers/requestHelpers';

export default function Following({ userId }) {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        if (!userId) {
          setError('User ID is required');
          return;
        }
        const response = await apiClient.post('/profile/getFollowing', { userId }); // Removed the duplicate '/api' prefix
        if (response && response.data && response.data.users) {
          setFollowingUsers(response.data.users);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching following users:', error);
        setError('Failed to fetch following data');
      }
    };

    fetchFollowingUsers();
  }, [userId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <p className="tab-content-header">Following</p>
      {followingUsers.length > 0 ? (
        followingUsers.map(user => (
          <div key={user._id}>
            <p>{user.username}</p>
          </div>
        ))
      ) : (
        <Alert variant="warning">You are not following anyone.</Alert>
      )}
    </div>
  );
}
