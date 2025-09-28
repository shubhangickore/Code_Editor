import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  // Store your username in a ref
  const usernameRef = useRef(location.state?.username);

  // Handler for user joining
  const handleUserJoined = ({ clients, username, socketId }) => {
    setClients(clients);

    // Show toast only for other users
    if (username !== usernameRef.current) {
      toast.success(`${username} joined the room.`);
      console.log(`${username} joined`);
    }

    // Sync code with new user
    socketRef.current.emit(ACTIONS.SYNC_CODE, {
      code: codeRef.current,
      socketId,
    });
  };

  // Handler for user disconnecting
  const handleUserDisconnected = ({ socketId, username }) => {
    setClients((prev) => prev.filter((client) => client.socketId !== socketId));

    // Show toast only for other users
    if (socketRef.current.id !== socketId) {
      toast.success(`${username} left the room.`);
      console.log(`${username} left`);
    }
  };

  useEffect(() => {
    if (!usernameRef.current) return;

    const init = async () => {
      // Initialize socket
      socketRef.current = await initSocket();

      // Handle connection errors
      const handleErrors = (e) => {
        console.log("Socket error", e);
        toast.error("Socket connection failed, try again later.");
        navigate("/");
      };

      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      // Join the room
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: usernameRef.current,
      });

      // Attach socket events
      socketRef.current.on(ACTIONS.JOINED, handleUserJoined);
      socketRef.current.on(ACTIONS.DISCONNECTED, handleUserDisconnected);
    };

    init();

    // Cleanup properly
    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.JOINED, handleUserJoined);
        socketRef.current.off(ACTIONS.DISCONNECTED, handleUserDisconnected);
        socketRef.current.disconnect();
      }
    };
  }, [roomId, navigate]);

  // Copy room ID
 const copyRoomId = async () => {
  try {
    // Use the variable directly, no quotes
    await navigator.clipboard.writeText(roomId);
    // Use backticks for dynamic message
    toast.success(`Room ID ${roomId} copied to clipboard`);
  } catch (err) {
    toast.error("Could not copy the Room ID");
    console.error(err);
  }
};

  // Leave room: show toast before navigating
  const leaveRoom = () => {
    toast.success("You left the room."); // only for the leaving user
    socketRef.current?.disconnect(); // ensure socket disconnects
    navigate("/");
  };

  // Redirect if no username
  if (!location.state?.username) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
