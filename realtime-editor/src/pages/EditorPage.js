import React,{useState} from 'react';
import Client from '../components/client';
import Editor from '../components/editor';

const EditorPage = () => {
  const [clients ,setClients] = useState([
     {socketId: 1,username:"shubhangi"},
     {socketId: 2, username:"isu"}

  ]);
  return (
    <div className="mainWrapper">
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img 
            className='logoImage'
            src="/code-sync.png"
            />
          </div> 
          <h3> Connected</h3>
          <div className="clientList">
            {clients.map((client)=>{
              <Client key ={client.socketId}
              userName={client.username}/>
            })}
          </div>
        </div>
        <button className="btn copyBtn"> Copy Room</button>
        <button className ="btn leaveBtn">Leave Room</button>
      </div>
      <div className="editorsWrap"> 
        <Editor/>
      </div>
    </div>
  )
}

export default EditorPage
