const getToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MDQzMjgzLCJpYXQiOjE3MzQwMzk2ODMsImp0aSI6ImE3YmQ1NWRjNzgwNjQ1YmQ5MDhmZGZiNjM5ZmE2MmMyIiwidXNlcl9pZCI6Mn0.33onv2NYCsWyZjVhRKH-lUVzNt0FrYn5sjfyXHoshkI"
}

export const getHeaders = () => ({
    "Authorization": `Bearer ${getToken()}`
})
