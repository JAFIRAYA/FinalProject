import React, {useState,DragEvent} from 'react'
import TickIcon from "./TickIcon"
import Modal from './Modal'
import ProgressBar from "./ProgressBar"


const ListItem = ({task , getData}) => {
  const [showModal , setShowModal] = useState(false)
  const [list, setList] = useState([task])
 
  const deleteItem = async() =>{
    try{
    const response =   await fetch(`https://backendtodo-zfnt.onrender.com/todos/${task.id}`,{
      method : 'DELETE'
    })
    if(response.status === 200){
      getData()
    }
    }catch(err){
      console.error(err)
    }

  }
 
 
  


    return (
      <ul>
      <li className="list-item">
          <div  className="info-container" draggable>
          <TickIcon/>
          <h4 className="task-title">{task.title}</h4> 
          <ProgressBar progress={task.progress}/>
        </div>
        
        <div className="button-container" id='button-container'>
          <button  className="edit" onClick={() => setShowModal(true)} >EDIT</button>
          <button  className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData}  task={task} />}
       
      </li>
      </ul>
    );
  }
  
  export default ListItem ;


