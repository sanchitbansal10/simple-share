import EditorWrapper from '../__components/EditorWrapper';

export default async function NotePage({ params }) {
    const noteId = (await params).noteId;
    console.log({noteId});
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    let editorData = null;
    try {

        const response = await fetch(`${baseUrl}/api/notes?id=${noteId}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        editorData = await response.json();
    } catch (error) {
        console.error(error);
    }
    
    return (
        <div>
            <EditorWrapper noteId={noteId} editorInitialData={editorData} />
        </div>
    );
};

