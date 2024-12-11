import { NextRequest, NextResponse } from 'next/server'
import path from 'path';
import { promises as fs } from 'fs';
import { savedData } from '~/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    try {
        const dataPath = path.join(process.cwd(), 'data', 'notes.json');
        let savedData = {};
        
        try {
            const fileContent = await fs.readFile(dataPath, 'utf8');
            savedData = JSON.parse(fileContent);
        } catch (error) {
            // File doesn't exist or is empty, return 404
            if (error.code === 'ENOENT') {
                return NextResponse.json({ message: 'Note not found' }, { status: 404 });
            }
            throw error;
        }

        const note = savedData[id];
        console.log({note});
        
        if (note) {
            return NextResponse.json(note, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Note not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error in GET /api/notes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch note' },
            { status: 500 }
        );
    }
} 



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, content } = body;
        
        if (!id || !content) {
            return NextResponse.json(
                { message: 'Missing required fields' }, 
                { status: 400 }
            );
        }

        const dataPath = path.join(process.cwd(), 'data', 'notes.json');
        
        // Read existing data
        let savedData = {};
        try {
            const fileContent = await fs.readFile(dataPath, 'utf8');
            savedData = JSON.parse(fileContent);
        } catch (error) {
            // File doesn't exist or is empty, that's ok
            if (error.code !== 'ENOENT') {
                console.error('Error reading file:', error);
            }
        }
        
        // Update data
        savedData[id] = content;
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(dataPath), { recursive: true });    
        
        // Write back to file
        await fs.writeFile(dataPath, JSON.stringify(savedData, null, 2));

        return NextResponse.json(
            { message: 'Note saved successfully' }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in POST /api/notes:', error);
        return NextResponse.json(
            { message: 'Error saving note', error: error.message }, 
            { status: 500 }
        );
    }
}