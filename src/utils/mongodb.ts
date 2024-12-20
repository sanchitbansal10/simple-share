/**
 * MongoDB connection utility
 * Provides connection and basic CRUD operations for notes
 */
import { MongoClient, ServerApiVersion, Collection } from 'mongodb';

// MongoDB connection URI from environment variable
const uri = process.env.MONGODB_URI || "";

// Database and collection names
const DB_NAME = 'notesapp';
const COLLECTION_NAME = 'notes';

// MongoDB client instance
let client: MongoClient | null = null;

/**
 * Get or create MongoDB client instance
 * @returns {MongoClient}
 */
function getClient(): MongoClient {
    if (!client) {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    return client;
}

/**
 * Get collection reference
 * @returns {Promise<Collection>}
 */
async function getCollection(): Promise<Collection> {
    const client = getClient();
    await client.connect();
    return client.db(DB_NAME).collection(COLLECTION_NAME);
}

export const mongodb = {
    /**
     * Save note to MongoDB
     * @param {string} noteId - The unique identifier for the note
     * @param {object} content - The note content to save
     */
    async saveNote(noteId: string, content: any) {
        console.log('saveNote', noteId, content);
        try {
            const collection = await getCollection();
            await collection.updateOne(
                { _id: noteId },
                { $set: { content, updatedAt: new Date() } },
                { upsert: true }
            );
        } catch (error) {
            console.error('MongoDB saveNote error:', error);
            throw error;
        }
    },

    /**
     * Read note from MongoDB
     * @param {string} noteId - The unique identifier for the note
     * @returns {Promise<object>} The note content
     */
    async readNote(noteId: string) {
        try {
            const collection = await getCollection();
            const note = await collection.findOne({ _id: noteId });
            console.error({ notefrommongodb: note });
            return note ? note.content : null;
        } catch (error) {
            console.error('MongoDB readNote error:', error);
            throw error;
        }
    },

    /**
     * Delete note from MongoDB
     * @param {string} noteId - The unique identifier for the note
     */
    async deleteNote(noteId: string) {
        try {
            const collection = await getCollection();
            await collection.deleteOne({ _id: noteId });
        } catch (error) {
            console.error('MongoDB deleteNote error:', error);
            throw error;
        }
    },

    /**
     * List all notes from MongoDB
     * @returns {Promise<Array<any>>} Array of note objects
     */
    async listNotes() {
        try {
            const collection = await getCollection();
            return await collection.find({}, { projection: { _id: 1, updatedAt: 1 } }).toArray();
        } catch (error) {
            console.error('MongoDB listNotes error:', error);
            throw error;
        }
    },

    /**
     * Close MongoDB connection
     */
    async closeConnection() {
        if (client) {
            await client.close();
            client = null;
        }
    }
};

// Ensure connection is closed when the process exits
process.on('beforeExit', async () => {
    await mongodb.closeConnection();
}); 