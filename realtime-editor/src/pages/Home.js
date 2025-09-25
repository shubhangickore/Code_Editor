import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const[UserName, setUserName] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("created new Room");
  };

  return (
    <div className="homePagewrapper">
      <div className="formwrapper">
        <img className="homeLogo" src="/code-sync.png" alt="code-sync" />

        <p className="mainLabel">Paste invitation roomId</p>

        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Enter Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />

          <input
            type="text"
            className="inputBox"
            placeholder="UserName"
            value={UserName}
            onChange={(e)=> setUserName(e.target.value)}
          />

          <button className="btn joinBtn">Join</button>

          <span className="createInfo">
            If you don’t have an Invite create &nbsp;
            <a href="" className="createNewBtn" onClick={createNewRoom}>
              New Room
            </a>
          </span>
        </div>
      </div>

      <footer>
        <h4>
          Built with &nbsp;
          <a href="https://github.com/shubhangickore" className="goTo">
            Shubhangi KORE
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
