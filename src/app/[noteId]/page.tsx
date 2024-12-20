import EditorWrapper from '../__components/EditorWrapper';
import InfoPopup from '../__components/InfoPopup';
import ShareButton from '../__components/ShareButton';

// Disable caching for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NotePage({ params }) {
    const noteId = (await params).noteId;
    
    return (
        <div className="relative min-h-screen p-4">
            <div className="fixed top-4 right-4 z-50 flex gap-2">
                <ShareButton />
                <InfoPopup />
            </div>
            <div className="max-w-4xl mx-auto">
                <EditorWrapper noteId={noteId} />
            </div>
        </div>
    );
}; 