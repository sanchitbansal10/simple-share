'use client'
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../__components/Editor'), { ssr: false });

export default function EditorWrapper(props) {
    const onSave = (content) => {
        fetch(`http://localhost:3000/api/notes`, {
            method: 'POST',
            body: JSON.stringify({ id: props.noteId, content }),
        });
    }
    return <Editor {...props} onSave={onSave} />
}