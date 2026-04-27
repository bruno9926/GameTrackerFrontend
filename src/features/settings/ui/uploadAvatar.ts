import { StorageClient } from '@supabase/storage-js';

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const VITE_SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

const storageClient = new StorageClient(
    `${SUPABASE_PROJECT_URL}/storage/v1`, {
    apikey: VITE_SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${VITE_SUPABASE_SERVICE_KEY}`,
})


export const uploadAvatar = async (file: File, userId: string) => {

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}.${fileExt}`;

    const { error } = await storageClient
        .from("avatars")
        .upload(filePath, file, {
            upsert: true
        });

    if (error) throw error;

    const { data } = storageClient
        .from("avatars")
        .getPublicUrl(filePath)

    return data.publicUrl;
}