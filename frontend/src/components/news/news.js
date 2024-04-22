import React from 'react';
import Base from '../../components/base/Base';
import PostList from "../posts/PostList";

export default function News() {
  return (
    <Base>
      <div className="max-w-xl mx-auto">
        <h1>News</h1>
        <div className="flex-grow-1 page-section">
          <h3>POSTS</h3>
          <hr />
          <div style={{ flex: 1, overflow: 'auto' }}>
            <PostList />
          </div>
        </div>
      </div>
    </Base>
  );
}
