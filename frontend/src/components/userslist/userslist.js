import React, { useState, useEffect } from 'react';
import Base from '../../components/base/Base';
import axios from 'axios';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.post('/users/get', {});
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Base>
      <div className="max-w-xl mx-auto">
        <h1>USERS LIST</h1>
        <div className="flex-grow-1 page-section">
          <hr />
          <div style={{ flex: 1, overflow: 'auto' }}>
            {users.map(user => (
              <div key={user._id}>
                <h2>User Information</h2>
                <h3>Username: {user.username}</h3>
                <h3>Email: {user.email}</h3>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}
