import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    // Handle local changes
    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();

      if (origin !== "setValue") {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
        if (onCodeChange) onCodeChange(code);
      }
    });

    // Handle incoming code changes
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (typeof code === "string") {
          editorRef.current.setValue(code);
          if (onCodeChange) onCodeChange(code);
        }
      });
    }

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef, roomId, onCodeChange]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
