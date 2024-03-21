import { useNavigate } from "react-router-dom"

import DeleteButton from "./DeleteButton"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"
import Button from "react-bootstrap/esm/Button"

type UserPostButtonProps = {
  postId: number
  deleteAction: () => void
}

const UserPostButton = ({postId, deleteAction}: UserPostButtonProps) => {

  const navigate = useNavigate();
  
  return (
    <ButtonGroup>
      <Button variant='secondary' onClick={ () => navigate(`/post/edit/${postId}`)}>Edit</Button>
      <DeleteButton variant='secondary' postId={postId} afterDelete={deleteAction} notLoggedIn={() => navigate('/')}/>
    </ButtonGroup>
  )
}
export default UserPostButton