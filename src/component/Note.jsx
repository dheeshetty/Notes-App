import React from 'react'

export default function Note(props) {

    let note = props.note

  return (
    <div>
      <p style={{fontSize:"1.3rem",display:"flex",lineHeight:"inherit"}}>{note.timestamp}</p>
      <p style={{fontSize:"1.4rem",display:"flex"}}>{note.note}</p>
    </div>
  )
}
