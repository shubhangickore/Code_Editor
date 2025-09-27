import React, { useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../../socket';
import { useLocation } from 'react-router-dom';

const EditorPage = () => {

   const socketRef = useRef(null);
   const location  = useLocation();
   useEffect(()=>{
    const init = async () =>{
      socketRef.current = await initSocket();
      socketRef.current.emit(ACTIONS.JOIN);
    };
    init();
   },[]);

  const [clients, setClients] = useState([
    { socketId: 1, username: "shubhangi" },
    { socketId: 2, username: "isu" },
    {socketId:3, username: "vishu"}
  ]);

  return (
    <div className="mainWrap">
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img
              className='logoImage'
              src="/code-sync"
              alt="logo"
            />
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {clients.map((client) => (
              <Client
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room</button>
        <button className="btn leaveBtn">Leave Room</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
}

export default EditorPage;
