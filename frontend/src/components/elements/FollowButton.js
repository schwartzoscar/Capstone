import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { apiClient } from '../../helpers/requestHelpers';
import { toast } from 'react-toastify';

export default function FollowButton({ userId, isFollowing }) {
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      const endpoint = isFollowing ? `/api/unfollow/${userId}` : `/api/follow/${userId}`;
      await apiClient.post(endpoint);
      toast.success(`${isFollowing ? 'Unfollowed' : 'Followed'} User ${userId}`);
    } catch (error) {
      toast.error(`Could not ${isFollowing ? 'Unfollow' : 'Follow'} User ${userId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="primary" onClick={handleFollowToggle} disabled={loading}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
