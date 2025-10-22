import { Editor } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { ACTIONS } from "../Actions";

function CodeEditor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  useEffect(() => {
    if (!socketRef?.current) return;

    socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      if (code !== null && code !== editorRef.current?.getValue()) {
        editorRef.current?.setValue(code);
      }
    });

    socketRef.current.on(ACTIONS.SYNC_CODE, ({ code }) => {
      if (editorRef.current && code) {
        editorRef.current.setValue(code);
      }
    });

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
      socketRef.current.off(ACTIONS.SYNC_CODE);
    };
  }, [socketRef.current]);


  const handleCodeChange = (val) => {
    setValue(val);
    socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code: val });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen text-white overflow-hidden bg-[#0e0e10]">
      <div className="w-full sm:w-1/2 flex flex-col border border-[#2b2b2b]">
        <div className="p-2 md:p-3 border-b border-[#2b2b2b]">
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>
        <div className="flex-1 min-h-[50vh] md:min-h-0">
          <Editor
            height="100%"
            theme="vs-dark"
            value={value}
            onMount={onMount}
            onChange={handleCodeChange}
            language={language}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-2 overflow-auto">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>

  );
}

export default CodeEditor;
