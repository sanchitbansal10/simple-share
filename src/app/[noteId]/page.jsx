import EditorWrapper from '../__components/EditorWrapper';

export default async function NotePage({ params }) {
    const noteId = (await params).noteId;
    
    const response = await fetch(`http://localhost:3000/api/notes?id=${noteId}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch note: ${response.statusText}`);
    }

    const editorData = await response.json();
    
    return (
        <div>
            <EditorWrapper noteId={noteId} editorInitialData={editorData} />
        </div>
    );
};

