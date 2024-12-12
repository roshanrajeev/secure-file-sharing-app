import React, { useState } from "react";
import { Button, Card, Typography } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { bulkUploadFiles } from "../apis/storage/bulkUploadFiles";
import { createFolder } from "../apis/storage/createFolder";
import { SendOutlined } from "@ant-design/icons";

const ShareFiles = () => {
    const [fileList, setFileList] = useState([]);

    const draggerProps = {
        name: "file",
        multiple: true,
        fileList,
        beforeUpload: (file) => {
            return false;
        },
        onChange(info) {
            setFileList(info.fileList);
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        }
    };

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.warning("No files selected!");
            return;
        }

        const formData = new FormData();
        fileList.forEach((file) => {
            console.log({file: file.originFileObj})
            formData.append("files", file.originFileObj);
        });

        try {
            const folderResponse = await createFolder();
            if(!folderResponse.ok) {
                message.error("Failed to create folder.");
                return;
            }

            const folderData = await folderResponse.json();
            const {uid: folderId} = folderData;

            const response = await bulkUploadFiles(folderId, formData);
            if (response.ok) {
                message.success("Files uploaded successfully!");
                setFileList([]);
            } else {
                message.error("File upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            // message.error("An error occurred during file upload.");
        }
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <div className="mb-8">
                <Typography.Title level={3}>Send files to your friends.</Typography.Title>
            </div>
            <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
            <Button
                type="primary"
                className="mt-4"
                onClick={handleUpload}
                disabled={fileList.length === 0}
            >
                <SendOutlined />
                Send Files
            </Button>
        </Card>
    )
}

export default ShareFiles;