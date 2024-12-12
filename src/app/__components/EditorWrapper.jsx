'use client'
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../__components/Editor'), { ssr: false });

export default function EditorWrapper(props) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const onSave = (content) => {
        fetch(`${baseUrl}/api/notes`, {
            method: 'POST',
            body: JSON.stringify({ id: props.noteId, content }),
        });
    }
    return <Editor {...props} onSave={onSave} />
}