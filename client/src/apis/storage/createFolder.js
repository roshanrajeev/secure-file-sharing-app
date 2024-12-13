import { getHeaders } from "../utils";

export const createFolder = async ({shareWithAll, allowedEmails}) => {
    return await fetch(`http://localhost:8000/api/v1/storage/folders/create`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({share_with_all: shareWithAll, allowed_emails: allowedEmails})
    });
}