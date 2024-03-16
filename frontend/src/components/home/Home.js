import Base from '../../components/base/Base';
import PostList from "../posts/PostList";

export default function Home() {
  return (
    <div className="page-container">
      <h1>Home Page</h1>
       <Base>
         <div className="d-flex" style={{gap: 20}}>
           <div style={{width: 400, backgroundColor: 'red'}}>
             <p>left panel</p>
           </div>
           <div className="flex-grow-1 page-section">
             <h3>Posts</h3>
             <hr/>
             <PostList/>
           </div>
           <div style={{width: 400, backgroundColor: 'green'}}>
             <p>right panel</p>
           </div>
         </div>
       </Base>
    </div>
  );
}
