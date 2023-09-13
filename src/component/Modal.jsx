import React, { useEffect, useState } from 'react'
import './Modal.css'
import { Button, Modal } from 'semantic-ui-react'


function ModalComponent(props) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = useState({groupName:'', color:''});
  const [innerWidth,setInnerWidth]=useState(0);
  const setGroups = props.setGroups;
  const groups = props.groups;

  const colors = ['#b38bfa', '#ff79f2', '#43e6fc', '#f19576', '#0041ff', '#6691ff'];
  let resizeWindow=()=>{
    setInnerWidth(window.innerWidth);
  }
  useEffect(()=>{
    resizeWindow()
    window.addEventListener("resize",resizeWindow);
    return ()=>window.removeEventListener("resize",resizeWindow);
  },[])
  return (
    <div className='ModalContainer'>
      <h1>Pocket Notes</h1>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button style={{borderRadius:"40px",color:"white",background:"black"}}>+ Create a new group</Button>}
      className='Modal'
      style={innerWidth<450?{"width":"20rem"}:{"width":"40rem"}}
    >
      <div className='new_note_creator'>
        
        <h1 id='new'> Create New Notes Group</h1>
        <form>
          <label className="label" htmlFor="groupName">Group Name : </label>
          <input
            className='input'
            type="text"
            name='groupName'
            placeholder="Enter your group name..."
            onChange={(event)=>{
              setFormData({...formData, [event.target.name]: event.target.value});
              console.log(formData.groupName)
            }}
            />
          <div style={{"display":"flex", "alignItems":"center", "flexDirection":"row", "justifyContent":"space-between", "width":"70%"}}>
          <lable className="label" htmlFor="colour">Choose Color</lable>
          {colors.map((color) => (
            <button
              className={`colorButton ${formData.color === color ? 'selected' : ''}`}
              name='color'
              id={color}
              color={color}
              style={{
                width: '2rem',
                height: '2rem',
                background: color,
                borderRadius: '5rem'
              }}
              onClick={(event) => {
                event.preventDefault();
                setFormData({ ...formData, [event.target.name]: event.target.getAttribute('color') });
              }}
            />
          ))}</div>

            
          <button type="submit" className='ModalSubmit'
           onClick={(event)=>{
            event.preventDefault();

            if(formData.groupName.length<2){
              alert("Group Name length should be greater than 2");
              return;
            }

            if(formData.color===''){
              alert("Please select a color");
              return;
            }
            let newGroups = [...groups, {groupName:formData.groupName, color:formData.color, notes:[], id:groups.length}]
            setGroups(newGroups);
            localStorage.setItem('groups', JSON.stringify(newGroups));
            setOpen(false);
          }}
          >Create</button>
        </form>
        </div>
    </Modal>
      </div>
  )
}

export default ModalComponent
