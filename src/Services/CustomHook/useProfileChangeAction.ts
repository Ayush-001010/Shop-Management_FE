import APICallingServices from "../APICallingService";

const useProfileChangeAction = () => {

    const userProfilePictureChange = async (file: File) => {
        const apiObj = new APICallingServices();
        let { name: fileName = "", type: contentType = "" } = file;
        console.log("Type   ", contentType);
        const response = await apiObj.getDataFromBackend("/aws/getURLForUploadFileInS3", { key: fileName, contentType });
        if (response.success && response.data) {
            try {
                console.log("Type   ", contentType);
                await apiObj.uploadFileToS3(response.data, file, contentType);
                console.log("Uploaded file to S3:", fileName);
                return `User_Profile_Images/${fileName}`
            } catch (uploadError) {
                console.error("S3 upload failed for", fileName, uploadError);
            }
        } else {
            console.warn("Failed to get S3 URL for", fileName, response);
        }
    };
    const userProfileChange = async (ID: number, userName: string, userImage: string, userPassword: string, About: string) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/authentication/userDetailChange", { ID, userName, userImage, userPassword , About });
        return response;
    }

    return { userProfilePictureChange, userProfileChange };
};

export default useProfileChangeAction;