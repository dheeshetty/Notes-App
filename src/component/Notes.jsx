import React, {useState} from 'react'
import "./Notes.css"
import Note from './Note'
import { Icon } from 'semantic-ui-react';

export default function Notes(props) {

    const [note, setNote] = useState('');


    
    let selectedGroup = props.selectedGroup;
    let notes = selectedGroup.notes
    let groups = props.groups;
    let setGroups = props.setGroups;

   

    const handleNoteChange = (event) => {
      setNote(event.target.value);
    };
  
    const handleSaveNote = () => {
      
      if(note.length===0){
        alert("Note can't be empty");
        return;
      }
      
      let newGroup = [...groups]

      let currentGroup = newGroup[selectedGroup.id];
      // Create a new Date object
      var now = new Date();
      
      // Format the timestamp
      var timestamp = now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      currentGroup["notes"].push({timestamp, note})
      localStorage.setItem('groups', JSON.stringify(newGroup));
      setGroups(newGroup)
    };
    const onEnterDown=(e)=>{
      if(e.code==="Enter"){
        handleSaveNote();
        setNote("")
      }
    }

  return (
    <div className='container'>
    <div className='group-header'>
        <div className='group-icon' style={{"backgroundColor":selectedGroup.color, "marginRight":"0.5rem"}}>{selectedGroup.groupName.slice(0, 2).toUpperCase()}</div>
        <h3 className='group-name' style={{"margin":"0px"}}>{selectedGroup.groupName}</h3>
    </div>
    <div className='notes-container'>        
    {notes.map((note) => (
        <Note note={note}/>
    ))}
    </div>

    <div className='note-input-container'>
        <div className="note-input-inner-container">
            <textarea className='note-input' type="text" value={note} onChange={handleNoteChange} placeholder="Enter your text here.........." onKeyDown={onEnterDown}/>
            <Icon  style={{fontSize:"2rem"}} size='large' className='send-icon' send name='send' onClick={handleSaveNote}/>
        </div>
    </div>
    </div>
  )
}
