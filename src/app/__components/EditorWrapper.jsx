'use client'
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../__components/Editor'), { ssr: false });
const MediumEditor = dynamic(() => import('../__components/MediumEditor'), { ssr: false });

export default async function EditorWrapper(props) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    let editorData = null;

    try {
        const response = await fetch(`${baseUrl}/api/notes?id=${props.noteId}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Content-Type': 'application/json',
            },
        });
    
        editorData = await response.json();
        console.log(editorData);
    } catch (error) {
        console.error(error);
    }
    const onSave = (content) => {
        fetch(`${baseUrl}/api/notes`, {
            method: 'POST',
            body: JSON.stringify({ id: props.noteId, content }),
        });
    }
    return <Editor {...props} editorInitialData={editorData} onSave={onSave} />
    // return <MediumEditor {...props} onSave={onSave} />
}