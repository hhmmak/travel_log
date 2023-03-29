import { useNavigate } from "react-router-dom"

import DeleteButton from "./DeleteButton"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"
import Button from "react-bootstrap/esm/Button"

const UserPostButton = ({post, deleteAction}) => {

  const navigate = useNavigate();

  
  
  return (
    <ButtonGroup>
      <Button variant='secondary' onClick={ () => navigate(`/post/edit/${post.id}`)}>Edit</Button>
      <DeleteButton variant='secondary' postId={post.id} afterDelete={deleteAction} notLiggedIn={() => navigate('/')}/>
    </ButtonGroup>
  )
}
export default UserPostButton