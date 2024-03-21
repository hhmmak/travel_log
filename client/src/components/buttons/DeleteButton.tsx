import axios, { AxiosResponse } from 'axios';

import Button from 'react-bootstrap/Button';

type DeleteButtonProps = {
  variant: string
  postId: number
  afterDelete: (res?: AxiosResponse) => void
  notLoggedIn: () => void
}

const DeleteButton = (props: DeleteButtonProps) => {

  const {variant, postId, afterDelete, notLoggedIn} = props;

  const deleteHandler = () => {

    const token = localStorage.getItem('token');
    if (token !== null){
      axios.get(`http://localhost:5000/api/users?token=${token}`)
        .then(res => {
          axios.delete(`http://localhost:5000/api/posts/${postId}`)
            .then(res => afterDelete(res))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    } else {
      notLoggedIn();
    }
  };
  
  return (
    <Button variant={variant} onClick={deleteHandler}>Delete</Button>
  )
}
export default DeleteButton;