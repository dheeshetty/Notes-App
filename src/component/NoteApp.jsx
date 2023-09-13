import React, { useEffect, useState } from 'react';
import './NoteApp.css'; // You can define your CSS styles in this file
import Modal from './Modal';
import lock from '../image/lock.png'
import Notes from './Notes.jsx';
import bg from '../image/mainbg.png'


const NoteApp = () => {

  const [selectedGroup, setSelectedGroup] = useState(null); // Keeps track of the currently selected group
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Define an async function inside the useEffect
    async function fetchGroups() {
      try {
        const storedGroups = localStorage.getItem('groups');
  
        if (storedGroups) {
          const groups = await JSON.parse(storedGroups);
          setGroups(groups);
        } else {
          console.log('No groups found in local storage');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }
  
    // Call the async function inside the useEffect
    fetchGroups();
  }, []);
  // Empty dependency array to run the effect only once on mount


  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };
  console.log(groups);
  return (
    <div className="note-app">
      <div className="group-list">
        <Modal setGroups={setGroups} groups={groups} />
        {groups.map((group) => (
          <div
            key={group.id}
            className={`group-item ${selectedGroup === group ? 'selected' : ''}`}
            onClick={() => handleGroupClick(group)}
          >
            <div className='group-icon' style={{ "backgroundColor": group.color }}>{group.groupName.slice(0, 2).toUpperCase()}</div>
            <h3 style={{ "margin": "0px" }}>{group.groupName}</h3>
          </div>
        ))}
      </div>


      <div style={{ backgroundColor: " #f7ecdc" }} className="note-list">
        {selectedGroup ? (
          <Notes selectedGroup={selectedGroup} groups={groups} setGroups={setGroups} />
         
        ) : (
          <div>
            <img style={{ height: "350px", marginLeft: "300px", marginTop: "70px" }} src={bg} alt="bg" />
            <p style={{ fontSize: "2.2rem", marginLeft: "550px", fontWeight: "500", marginTop: "-20px" }}>Pocket Notes</p>
            <p className='Notes-down'>Send and receive messages without keeping your phone online.</p>
            <p className='Notes-down'>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
            <p id='end'>end-to-end encrypted</p>
            <img style={{ position: "absolute", top: "92.2%", left: "54%" }} src={lock} alt="lock" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteApp;
