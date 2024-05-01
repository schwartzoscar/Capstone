import React from 'react';
import { apiClient } from '../../helpers/requestHelpers';
import { toast } from 'react-toastify';

/*THIS IS NOT DONE*/
const FollowButton = ({ userId }) => {
  const handleFollow = async () => {
    try {
      const response = await apiClient.post(`/profile/follow`, { userId });
      if (response.data.message === "OK") {
        toast.success('Followed successfully.');
      } else {
        toast.error('Could not follow user.');
      }
    } catch (error) {
      console.error('Error details:', error);
      toast.error('Could not follow user.');
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleFollow}>
      Follow
    </button>
  );
};

export default FollowButton;