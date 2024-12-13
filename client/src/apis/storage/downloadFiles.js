import { axiosInstance } from "../axios";

export const downloadFiles = async (folder_uid) => {
    return await axiosInstance.get(`/storage/folders/${folder_uid}/files/download`, {
        responseType: "blob",
    });
}