'use client';
import { useEffect, useRef, useCallback } from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

interface MediumEditorProps {
    noteId: string;
    editorInitialData?: string;
    onSave: (content: string) => void;
}

export default function MediumEditorComponent({ noteId, editorInitialData = '', onSave }: MediumEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const mediumEditorRef = useRef<MediumEditor | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Debounced save handler
    const debouncedSave = useCallback((content: string) => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            onSave(content);
        }, 1000); // 1 second delay
    }, [onSave]);

    // Initialize editor
    useEffect(() => {
        if (editorRef.current) {
            const editor = new MediumEditor(editorRef.current, {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
                    static: true,
                    sticky: true
                },
                placeholder: {
                    text: 'Start writing...',
                    hideOnClick: true
                },
                paste: {
                    cleanPastedHTML: true,
                    cleanAttrs: ['style', 'dir'],
                    cleanTags: ['meta']
                },
                spellcheck: true,
                targetBlank: true
            });

            // Set initial content
            if (editorInitialData) {
                editorRef.current.innerHTML = editorInitialData;
            }

            // Save reference to editor
            mediumEditorRef.current = editor;

            // Setup change handler with debounce
            editor.subscribe('editableInput', (event, editable) => {
                debouncedSave(editable.innerHTML);
            });

            // Cleanup
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                editor.destroy();
            };
        }
    }, [noteId, debouncedSave]); // Include debouncedSave in dependencies

    return (
        <div 
            className="medium-editor-element" 
            ref={editorRef}
            role="textbox"
            aria-multiline="true"
            aria-label="Rich text editor"
            data-note-id={noteId}
        />
    );
}