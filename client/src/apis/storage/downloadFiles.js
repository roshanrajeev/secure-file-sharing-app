import { getHeaders } from "../utils";

export const downloadFiles = async (folder_uid) => {
    const response = await fetch(`http://localhost:8000/api/v1/storage/folders/${folder_uid}/files/download`, {
        headers: getHeaders(),
        credentials: "include"
    });
    return response;
}