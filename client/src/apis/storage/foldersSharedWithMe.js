import { getHeaders } from "../utils"

export const foldersSharedWithMe = async () => {
    return await fetch('http://localhost:8000/api/v1/storage/folders/shared_with_me', {
        method: 'GET',
        credentials: 'include',
        headers: getHeaders()
    })
}
