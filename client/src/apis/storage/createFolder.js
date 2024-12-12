import { getHeaders } from "../utils";

export const createFolder = async () => {
    return await fetch(`http://localhost:8000/api/v1/storage/folders/create`, {
        method: "POST",
        headers: getHeaders(),
    });
}