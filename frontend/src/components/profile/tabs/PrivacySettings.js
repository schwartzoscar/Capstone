import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { apiClient } from "../../../helpers/requestHelpers";
import { handleResp } from "../../../helpers/responseHelpers";
import { handleFormErrors } from '../../../helpers/formHelpers';
import { useAuthContext } from '../../../contexts/AuthContext';
import Button from "../../elements/Button";
import { SubmitButton, SwitchField } from "../../elements/FormField";

const PrivacySettings = () => {

  const { setCurrentUser } = useAuthContext();
  const form = useForm({defaultValues: {
    whoCanSeePosts: 'everyone',
    whoCanSendFriendRequests: 'everyone',
    profileViewingOption: 'everyone',
    deleteHistory: false,
  }});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async(data) => {
    setLoading(true);
    try{
      const resp = await apiClient.post('/profile/updatePrivacySettings', data);
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
      <FormProvider {...form}>
        {/* Form elements for privacy settings */}
        <SwitchField name="deleteHistory" label="Delete History"/>
        <div className="d-flex justify-content-end gc-8">
          <SubmitButton className="btn-primary mt-0" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </SubmitButton>
          <Button className='btn-danger' onClick={handleDeleteAccount} disabled={loading}>
            {loading ? "Deleting...": "Delete Account"}
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default PrivacySettings;