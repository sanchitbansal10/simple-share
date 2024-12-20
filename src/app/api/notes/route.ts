import { NextRequest, NextResponse } from 'next/server';
import { mongodb } from '../../../utils/mongodb';

interface NoteData {
    id: string;
    content: any;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const note = await mongodb.readNote(id);
        console.error({noteAfterRead: note});
        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }
        return NextResponse.json(note);
    } catch (error) {
        console.error('Error reading note:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { id, content } = await request.json() as NoteData;
        await mongodb.saveNote(id, content);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving note:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        await mongodb.deleteNote(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 