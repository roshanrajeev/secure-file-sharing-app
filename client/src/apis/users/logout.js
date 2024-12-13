export const logout = async () => {
    return await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include"
    });
}
