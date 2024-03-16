import { useEffect, useMemo } from 'react';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import usePaginationReducer from "../../reducers/paginationReducer";
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListItem from "./PostListItem";

export default function PostList() {

  const [{ posts, lastId }, pDispatch] = usePaginationReducer('posts');
  const limit = 25;

  const getPosts = async(refresh = false) => {
    const post = {lastId: refresh ? '0' : lastId, limit};
    const resp = await apiClient.post('/posts/list', post);
    handleResp(resp, data => {
      pDispatch({posts: data.posts});
    });
  }

  useEffect(() => {
    getPosts(true);
  }, []);

  const items = useMemo(() => posts.map(post => (
    <PostListItem key={post._id} post={post}/>
  )), [posts]);

  return(
    <div className="flex-grow-1">
      <InfiniteScroll
        dataLength={posts.length}
        next={() => getPosts()}
        hasMore={posts.length > 0}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center fw-bold">Yay! You have seen it all</p>}
        // below props only if you need pull down functionality
        refreshFunction={() => getPosts(true)}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
      >
        {items}
      </InfiniteScroll>
    </div>
  );
}
