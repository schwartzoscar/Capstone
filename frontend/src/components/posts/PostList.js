import { useState, useEffect, useMemo } from 'react';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { useAuthContext } from "../../contexts/AuthContext";
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListItem from "./PostListItem";

export default function PostList() {

  const [{ currentUser }] = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 25;

  const getPosts = async(nextPage = 1) => {
    const post = {userId: currentUser.id, page: nextPage, limit};
    const resp = await apiClient.post('/posts/list', post);
    handleResp(resp, data => {
      setPosts(data.posts);
      setTotal(data.total);
    });
    setPage(nextPage);
  }

  useEffect(getPosts, [currentUser]);

  const items = useMemo(() => posts.map(post => <PostListItem post={post}/>), [posts]);

  return(
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => getPosts(page + 1)}
        hasMore={total > page * limit}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center fw-bold">Yay! You have seen it all</p>}
        // below props only if you need pull down functionality
        refreshFunction={getPosts}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<h3 className="text-center">&#8595; Pull down to refresh</h3>}
        releaseToRefreshContent={<h3 className="text-center">&#8593; Release to refresh</h3>}
      >
        {items}
      </InfiniteScroll>
    </div>
  );
}
