import { useState, useMemo } from 'react';
import clsx from "clsx";

export default function ShowMore(props) {

  const { limit, children } = props;
  const heightLimit = limit ?? 200;
  const [ref, setRef] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const childrenHeight = useMemo(() => ref?.offsetHeight, [ref]);

  const canShowMore = useMemo(() => {
    return childrenHeight && childrenHeight > heightLimit;
  }, [childrenHeight, heightLimit]);

  const showMoreControls = useMemo(() => {
    if(!canShowMore) return null;
    return(
      <p className="show-more-link" onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show less' : 'Show more...'}
      </p>
    );
  }, [canShowMore, showMore]);

  return (
    <div>
      <div className={clsx("show-more-content", {'is-collapsed': canShowMore && !showMore})}
           style={showMore ? {} : {maxHeight: heightLimit}}>
        <div ref={r => setRef(r)}>
          {children}
        </div>
      </div>
      {showMoreControls}
    </div>
  );
}
