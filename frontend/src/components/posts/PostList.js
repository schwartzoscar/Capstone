import { useMemo } from 'react';
import clsx from 'clsx';
import { usePaginationContext, PaginationProvider } from "../../contexts/PaginationContext";
import PostListItem from "./PostListItem";
import InfiniteScroll from "../elements/InfiniteScroll";

export default function PostList(props) {
  return(
    <PaginationProvider>
      <PostListBody {...props}/>
    </PaginationProvider>
  );
}

function PostListBody(props) {

  const { iSProps, className } = props;
  const [{ items: posts }] = usePaginationContext();

  const items = useMemo(() => posts.map(post => (
    <PostListItem key={post._id} post={post}/>
  )), [posts]);

  return(
    <div className={clsx(className, "flex-grow-1")}>
      <InfiniteScroll url="/posts/list" limit={2} wrapperProps={{style: {height: 300}}} {...iSProps}>
        {items}
      </InfiniteScroll>
    </div>
  );
}
