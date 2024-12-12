const getToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MDM5MTA0LCJpYXQiOjE3MzQwMzU1MDQsImp0aSI6IjkxM2I2ZTJjNGRmNzQ3OGI5NDdlNDViYjhmYzhlOGJiIiwidXNlcl9pZCI6Mn0.t0sqjZYzVSVjoMKfK9NIFm13p5sS3DLkNAVUwJlXPdU"
}

export const getHeaders = () => ({
    "Authorization": `Bearer ${getToken()}`
})
