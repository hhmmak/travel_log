import {ReactComponent as Bookmark} from './icons/bookmark.svg';
const PostDetail = (props) => {

  const {id} = props;

  return ( 
    <div>
      <div>
        <div>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          <Bookmark />
        </div>
        <h2>title {id}</h2>
        <p>itinerary</p>
        <p>content</p>
      </div>
      <div>
        <div>
          <p>Destination</p>
          <p>destination</p>
        </div>
        <div>
          <p>Duration</p>
          <p>duration</p>
        </div>
        <div>
          <p>Date</p>
          <p>date from and to</p>
        </div>
        <div>
          <p>Created by user on Month DD, YYYY</p>
        </div>
      </div>
    </div>
  )
}
export default PostDetail;