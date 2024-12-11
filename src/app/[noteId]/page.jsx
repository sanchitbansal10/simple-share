import EditorWrapper from '../__components/EditorWrapper';

export default async function NotePage({ params }) {
    const noteId = (await params).noteId;
    console.log({noteId});
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const response = await fetch(`${baseUrl}/api/notes?id=${noteId}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const editorData = await response.json();
    
    return (
        <div>
            <EditorWrapper noteId={noteId} editorInitialData={editorData} />
        </div>
    );
};

