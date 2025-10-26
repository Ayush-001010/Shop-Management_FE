import axios from "axios";

export default class APICallingServices {
    public readonly baseURL: string = "http://localhost:8000";

    public readonly getDataFromBackend = async (url: string, data?: any): Promise<{ success: boolean, data: any }> => {
        const response = await axios.post(this.baseURL + url, data, {
            withCredentials: true
        });
        return response.data;
    }
    public readonly addDataToBackend = async (url: string, data: any): Promise<{ success: boolean, data: any }> => {
        const response = await axios.post(this.baseURL + url, { data });
        return response.data;
    }
    public readonly uploadDataWithFileToBackend = async (url: string, data: FormData) => {
        try {
            const response = await axios.post(this.baseURL + url, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            return { success: false, error };
        }
    }

    public readonly uploadFileToS3 = async (url: string, file: File, contentType: string) => {
        try {
            const response = await axios.put(url, file, {
                headers: {
                    'Content-Type': contentType,
                },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error };
        }
    }
}