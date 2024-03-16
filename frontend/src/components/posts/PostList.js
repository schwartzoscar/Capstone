import { useEffect, useMemo } from 'react';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { useAuthContext } from "../../contexts/AuthContext";
import usePaginationReducer from "../../reducers/paginationReducer";
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListItem from "./PostListItem";

export default function PostList() {

  const { currentUser } = useAuthContext();
  const [{ page, total, posts }, pDispatch] = usePaginationReducer('posts');
  const limit = 25;

  const getPosts = async(nextPage = 1) => {
    const post = {userId: currentUser?.id, page: nextPage, limit};
    const resp = await apiClient.post('/posts/list', post);
    handleResp(resp, data => {
      pDispatch({posts: data.posts, total: data.total, page: nextPage});
    });
  }

  useEffect(() => {
    getPosts();
  }, [currentUser]);

  const items = useMemo(() => posts.map(post => (
    <PostListItem key={post._id} post={post}/>
  )), [posts]);

  return(
    <div className="flex-grow-1">
      <InfiniteScroll
        dataLength={posts.length}
        next={() => getPosts(page + 1)}
        hasMore={total > page * limit}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center fw-bold">Yay! You have seen it all</p>}
        // below props only if you need pull down functionality
        refreshFunction={() => getPosts()}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
      >
        {items}
      </InfiniteScroll>
    </div>
  );
}
