import React, { useState, useEffect } from 'react';
import Base from '../../components/base/Base';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import FollowButton from "../elements/FollowButton";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.post('http://localhost:5000/api/users/get', {});
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3>Username: {user.username}</h3>
                  </div>
                  <FollowButton userId={user._id} />
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}
