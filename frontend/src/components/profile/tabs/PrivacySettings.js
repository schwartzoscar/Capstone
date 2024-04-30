import React, { useState } from 'react';
import { Form, Button , Alert} from 'react-bootstrap';
import { apiClient } from "../../../helpers/requestHelpers";
import { handleResp } from "../../../helpers/responseHelpers";
import { handleFormErrors } from '../../../helpers/formHelpers';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const PrivacySettings = () => {
 const navigate = useNavigate(); // Initialize useNavigate hook
 const { setCurrentUser } = useAuthContext();

  const [privacySettings, setPrivacySettings] = useState({
    whoCanSeePosts: 'everyone',
    whoCanSendFriendRequests: 'everyone',
    profileViewingOption: 'everyone',
    deleteHistory: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPrivacySettings((prevSettings) => ({
      ...prevSettings,
      [name]: type == 'checkbox' ? checked : value,
    }));
  };

const handleSubmit = async () => {
  setLoading(true);
  try{
    const resp = await apiClient.post('/profile/updatePrivacySettings', privacySettings);
    handleResp(resp, () => {
      setLoading(false);
      setError(null);
    
    }, (errors) => {
      setLoading(false);
      handleFormErrors(errors);
    });
  } catch (error) {
    setLoading(false);
    setError("Failed to update privacy settings. Please try again later.");
  }
};

const handleDeleteAccount = async () => {
  setLoading(true);
  try {
    const resp = await apiClient.delete('/profile/deleteAccount');
    handleResp(
      resp,
      () => {
        setLoading(false);
        setError(null);
        setCurrentUser(null);
        navigate('/login');
      },
      (errors) => {
        setLoading(false);
        handleFormErrors(errors);
      }

    );
  } catch (error) {
    setLoading(false);
    setError("Failed to delete account. Please try again later. ");
  }
};


return (
  <div>
    <p className="tab-content-header">Privacy Settings</p>
    {error && <Alert variant="danger">{error}</Alert>} {/* Display error message using Alert */}
    <Form>
      {/* Form elements for privacy settings */}
      <Form.Check
      type="checkbox"
      label="Delete Account"
      name="deleteHistory"
      checked={privacySettings.deleteHistory}
      onChange={handleChange}
      />
      <Button variant="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
      <Button variant='danger' onClick={handleDeleteAccount} disabled={loading}>
        {loading ? "Deleting...": "Delete Account"}
      </Button>
    </Form>
  </div>
 );
};

export default PrivacySettings;