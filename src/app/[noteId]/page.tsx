import EditorWrapper from '../__components/EditorWrapper';
import InfoPopup from '../__components/InfoPopup';

// Disable caching for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NotePage({ params }) {
    const noteId = (await params).noteId;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    let editorData = null;

    try {
        const response = await fetch(`${baseUrl}/api/notes?id=${noteId}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Content-Type': 'application/json',
            },
        });
    
        editorData = await response.json();
    } catch (error) {
        console.error(error);
    }
    
    return (
        <div className="relative min-h-screen p-4">
            <div className="fixed top-4 right-4 z-50">
                <InfoPopup />
            </div>
            <div className="max-w-4xl mx-auto">
                <EditorWrapper noteId={noteId} editorInitialData={editorData} />
            </div>
        </div>
    );
}; 