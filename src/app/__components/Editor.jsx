'use client';
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "This is my awesome editor!",
                "level": 1
            }
        },
    ]
};

export default function Editor({noteId, editorInitialData, onSave}) {
    const ejInstance = useRef();
    const [editorData, setEditorData] = useState(editorInitialData || DEFAULT_INITIAL_DATA);

    const initEditor = () => {
      console.log('initEditor');
       const editor = new EditorJS({
          holder: 'editorjs',
          onReady: () => {
            ejInstance.current = editor;
          },
          autofocus: true,
          data: editorInitialData || DEFAULT_INITIAL_DATA,
          onChange: async () => {
            let content = await editor.saver.save();
            setEditorData(content);
            onSave(content);
          },
          tools: { 
            header: Header, 
          },
        });
      };

      // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

    return  <><div id='editorjs'></div></>;
}
