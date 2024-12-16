'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';

interface EditorProps {
    noteId: string;
    editorInitialData?: OutputData;
    onSave: (content: OutputData) => void;
}

const DEFAULT_INITIAL_DATA: OutputData = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "This is my awesome editor!",
                "level": 1
            }
        },
    ],
    "version": "2.28.2"
};

export default function Editor({ noteId, editorInitialData, onSave }: EditorProps) {
    const ejInstance = useRef<EditorJS | null>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    console.log(editorInitialData);
    
    // Memoize the onChange handler
    const handleChange = useCallback(async (editor: EditorJS) => {
        const content = await editor.saver.save();
        onSave(content);
    }, [onSave]);

    // Initialize editor
    useEffect(() => {
        if (!editorRef.current) return;

        const editor = new EditorJS({
            holder: editorRef.current,
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: editorInitialData || DEFAULT_INITIAL_DATA,
            onChange: () => handleChange(editor),
            tools: { 
                header: Header, 
            },
        });

        // Cleanup function
        return () => {
            if (ejInstance.current) {
                ejInstance.current.destroy();
                ejInstance.current = null;
            }
        };
    }, [noteId, editorInitialData, handleChange]); // Reduced dependencies

    return <div ref={editorRef}></div>;
}
