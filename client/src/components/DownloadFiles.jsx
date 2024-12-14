import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "antd";
import { message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { filesList } from "../apis/storage/filesList";
import { downloadFiles } from "../apis/storage/downloadFiles";
import { useAuth } from "../hooks/useAuth";
import { routes } from "../constants/routes";

const DownloadFiles = () => {
    const [fileList, setFileList] = useState([]);
    const { isAuthenticated } = useAuth()

    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
        const asyncFetch = async () => {
            try {
                const { data } = await filesList(params.folder_uid);
                setFileList(data);
            } catch (error) {
                if(error.response.status === 410) {
                    message.error("This link has expired.");
                    navigate(routes.HOME_PATH)
                } else if (error.response.status === 403) {
                    if(isAuthenticated) {
                        message.error("You are not authorized to access.");
                        navigate(routes.HOME_PATH)
                    } else {
                        message.error("Please login to access.")
                        navigate(routes.LOGIN_PATH)
                    }
                } else {
                    message.error("Failed to fetch files.");
                }
            }
        }
        asyncFetch();
    }, []);

    const handleDownload = async () => {
        try {
            const response = await downloadFiles(params.folder_uid);
            
            let filename = "download";

            const contentDisposition = response.headers.get("Content-Disposition");
            console.log({ headers: response.headers });
            if (contentDisposition && contentDisposition.includes("filename=")) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                console.log(filenameMatch[1]);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            const url = URL.createObjectURL(response.data);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading files:", error);
            message.error("Failed to download files.");
        }
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <div className="mb-8">
                <Typography.Title level={3}>Shared Files</Typography.Title>
            </div>

            <div>
                {fileList.map((file) => (
                    <div key={file.uid}>{file.name}</div>
                ))}
            </div>

            <Button
                type="primary"
                className="mt-4"
                onClick={handleDownload}
                disabled={fileList.length === 0}
            >
                <DownloadOutlined />
                Download
            </Button>
        </Card>
    )
}

export default DownloadFiles;
