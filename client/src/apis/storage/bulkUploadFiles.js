import { getHeaders } from "../utils";

export const bulkUploadFiles = async (folderId, files) => {
    return await fetch(`http://localhost:8000/api/v1/storage/folders/${folderId}/files/bulk_upload`, {
        method: "POST",
        body: files,
        headers: getHeaders(),
    });
}