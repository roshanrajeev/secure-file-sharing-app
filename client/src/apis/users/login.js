import { getHeaders } from "../utils";

export const login = async (credentials) => {
    return await fetch("http://localhost:8000/api/v1/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
}
