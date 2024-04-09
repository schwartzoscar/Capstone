import { useEffect, useRef } from 'react';
import { usePaginationContext } from "../../contexts/PaginationContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import ReactInfiniteScroll from "react-infinite-scroll-component";

export default function InfiniteScroll(props) {

  const defaultLimit = 25;
  const { url, limit, postData, wrapperProps, children } = props;
  const mountTracker = useRef(true);
  const [{ items, total, lastId }, dispatch] = usePaginationContext();

  const getItems = async(refresh = false) => {
    let post = {
      lastId: refresh ? '0' : lastId,
      limit: limit ?? defaultLimit
    };
    if(postData) post = {...post, ...postData};
    const resp = await apiClient.post(url, post);
    handleResp(resp, data => {
      dispatch({type: refresh ? 'refresh' : 'next', items: data.items, total: data.total});
    });
  }

  useEffect(() => {
    if(mountTracker.current) {
      getItems(true);
      mountTracker.current = false;
    }
  }, []);

  return(
    <div id="infinite-scroll-target" className="overflow-y-scroll" {...wrapperProps}>
      <ReactInfiniteScroll
        dataLength={items.length}
        next={() => getItems()}
        hasMore={items.length < total}
        loader={<h3>Loading...</h3>}
        scrollableTarget="infinite-scroll-target"
        endMessage={<p style={{textAlign: 'center', fontWeight: 'bolder', color: 'lightgrey'}}>Refresh to see more posts.</p>}
        // below props only if you need pull down functionality
        refreshFunction={() => getItems(true)}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
      >
        {children}
      </ReactInfiniteScroll>
    </div>
  );
}
