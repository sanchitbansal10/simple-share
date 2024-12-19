'use client';
import { useCallback } from 'react';
import type { OutputData } from '@editorjs/editorjs';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '~/utils/editorTools';

interface EditorProps {
    noteId: string;
    editorInitialData?: OutputData;
    onSave: (content: OutputData) => void;
}

const DEFAULT_INITIAL_DATA: OutputData = {
    time: new Date().getTime(),
    blocks: [
        {
            type: "header",
            data: {
                text: "Start writing...",
                level: 1
            }
        },
    ],
    version: "2.28.2"
};

const ReactEditorJS = createReactEditorJS();

export default function Editor({ noteId, editorInitialData, onSave }: EditorProps) {
    // Memoize the onChange handler to prevent unnecessary re-renders
    const handleChange = useCallback(async (api: any) => {
        try {
            const data = await api.saver.save();
            onSave(data);
        } catch (error) {
            console.error('Saving error:', error);
        }
    }, [onSave]);

    return (
        <div className="w-full min-h-[500px]" role="textbox" aria-label="Rich text editor">
            <ReactEditorJS
                defaultValue={editorInitialData || DEFAULT_INITIAL_DATA}
                onChange={handleChange}
                tools={EDITOR_JS_TOOLS}
                onReady={() => console.log('Editor.js is ready to work!')}
                placeholder="Start writing your note..."
            />
        </div>
    );
}