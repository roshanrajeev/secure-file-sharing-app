import { axiosInstance } from "../axios";

export const filesList = async (folderUid) => {
    return await axiosInstance.get(`/storage/folders/${folderUid}/files`);
}