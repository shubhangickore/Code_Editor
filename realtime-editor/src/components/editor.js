import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
            mode: { name: 'javascript', json: true },
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
        }
    );
    editorRef.current = editor;

    // Editor change listener
    editor.on('change', (instance) => {
        const code = instance.getValue();
        onCodeChange(code);

        if (socketRef.current) {
            socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
        }
    });

    // Wait until editor is ready
    const handleCodeChange = ({ code }) => {
        if (editorRef.current && code !== editorRef.current.getValue()) {
            editorRef.current.setValue(code);
        }
    };

    if (socketRef.current) {
        socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
    }

    return () => {
        if (socketRef.current) {
            socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
        }
    };
}, [socketRef, roomId, onCodeChange]);

    return <textarea id="realtimeEditor" />;
};

export default Editor;
