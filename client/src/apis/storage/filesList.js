import { getHeaders } from "../utils";

export const filesList = async (folderUid) => {
    return await fetch(`http://localhost:8000/api/v1/storage/folders/${folderUid}/files`, {
        credentials: "include",
        headers: getHeaders()
    });
}