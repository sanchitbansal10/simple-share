'use client'
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../__components/Editor'), { ssr: false });
const MediumEditor = dynamic(() => import('../__components/MediumEditor'), { ssr: false });

export default function EditorWrapper(props) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const onSave = (content) => {
        fetch(`${baseUrl}/api/notes`, {
            method: 'POST',
            body: JSON.stringify({ id: props.noteId, content }),
        });
    }
    return <Editor {...props} onSave={onSave} />
    // return <MediumEditor {...props} onSave={onSave} />
}