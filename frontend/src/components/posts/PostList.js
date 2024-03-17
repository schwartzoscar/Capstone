import { useMemo } from 'react';
import { usePaginationContext, PaginationProvider } from "../../contexts/PaginationContext";
import PostListItem from "./PostListItem";
import InfiniteScroll from "../elements/InfiniteScroll";

export default function PostList() {
  return(
    <PaginationProvider>
      <PostListBody/>
    </PaginationProvider>
  );
}

function PostListBody() {

  const [{ items: posts }] = usePaginationContext();

  const items = useMemo(() => posts.map(post => (
    <PostListItem key={post._id} post={post}/>
  )), [posts]);

  return(
    <div className="flex-grow-1">
      <InfiniteScroll url="/posts/list">
        {items}
      </InfiniteScroll>
    </div>
  );
}
