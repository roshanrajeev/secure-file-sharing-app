import { getHeaders } from "../utils";

export const getMyAccount = async () => {
    const response = await fetch(`http://localhost:8000/api/v1/users/me`, {
        credentials: "include",
        headers: getHeaders()
    });
    return response;
}