import axios from 'axios';

import {ReactComponent as Bookmark} from '../../icons/bookmark.svg';


const BookmarkButton = ({bookmarks, setBookmarks, setUserId, postId, width="100%"}) => {

  const changeBookmark = (e, postId) => {
    
    const token = localStorage.getItem('token');
    if (token !== null){
      axios.get(`http://localhost:5000/api/users?token=${token}`)
      .then(res => {
        if (bookmarks.includes(postId)){
          // set to not bookmarked
          axios.delete(`http://localhost:5000/api/bookmarks?token=${token}`,{data :{"userId": res.data.userId, "postId": postId}})
          .then(res => {
            e.target.style.fill = "#efefef";
            let bookmarkList = bookmarks.filter(id => id !== postId);
            setBookmarks(bookmarkList);
          })
          .catch(err => console.log(err))
        } else {
          // set to bookmarked
          axios.post(`http://localhost:5000/api/bookmarks?token=${token}`,{"userId": res.data.userId, "postId": postId})
          .then(res => {
            e.target.style.fill = "#eebc64"
            bookmarks.push(postId);
            setBookmarks(bookmarks);
          })
          .catch(err => console.log(err))
        }
      })
      .catch(err => {
        setUserId(null);
        console.log(err);
      });
    } else {
      setUserId(null);
    }
  };

  return (
    <div>
      <Bookmark onClick={(e) => changeBookmark(e, postId)} fill={bookmarks.includes(postId)? "#eebc64" : "#efefef"} width={width}/>
    </div>
  )
}
export default BookmarkButton;