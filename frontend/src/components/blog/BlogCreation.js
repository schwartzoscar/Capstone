import React from 'react';
import { useState } from 'react'; // Don't forget to import useState
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "../elements/Button";

export default function BlogCreation() {
  const { setCurrentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const resp = await apiClient.post('/auth/logout');
    handleResp(resp, () => setCurrentUser(null));
    setLoading(false);
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // code to handle blog creation here
    const form = e.target;
  const formData = new FormData(form);

  try {
    // Make an API call to your server to create a new blog post
    const resp = await apiClient.post('/blogs', formData);
    // Handle the response as needed (e.g., show a success message, redirect the user)
    console.log('Blog post created:', resp.data);
    // Clear the form after successful submission if needed
    form.reset();
  } catch (error) {
    // Handle any errors (e.g., show an error message to the user)
    console.error('Error creating blog post:', error);
  }
  };

  return (
    <div className="page-container" id="blog-creation-page">
      <hr/>
      <div className="nav-blog">
        <img src="/images/logo.png" alt="THRIDDER LOGO" className="img-fade" width="200" height="auto"></img>
        <Button onClick={handleLogout} loading={loading} className="btn-bar">LOGOUT</Button>
      </div>
      <hr/>
      <div className="d-flex g-20 mt-20 flex-grow-1">
        <div className="page-section">
          <h3>Create a New Blog Post</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea className="form-control" id="content" name="content" rows="5"></textarea>
            </div>
            <Button type="submit" className="btn btn-primary">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
