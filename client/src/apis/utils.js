const getToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MDQ3MTY3LCJpYXQiOjE3MzQwNDM1NjcsImp0aSI6IjM4NmM5ZmI3MmRjMDQ2MDI4OWM2ZDU0YjAzYjY2YWQ4IiwidXNlcl9pZCI6Mn0.G1ZuJ4uFJeC6oj8mY8ycg4S6QpncENWwRplGWk0pHlU"
}

export const getHeaders = () => ({
    "Authorization": `Bearer ${getToken()}`
})
