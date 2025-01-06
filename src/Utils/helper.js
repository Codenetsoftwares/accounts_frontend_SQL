import { toast } from "react-toastify";
export const errorHandler = (err, message) => {
    if (err) toast.error(err);
    else toast.error(message);
}


export const customErrorHandler = (error) => {
    let errorMessage = ''
    if (error?.response?.data?.message) {
        errorMessage = error?.response?.data?.message
    } else if (error?.response?.data?.errMessage) {
        errorMessage = error?.response?.data?.errMessage
    } else {
        errorMessage = "something went wrong"
    }
    return errorMessage
}

export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Extract year, month, day, and time dynamically
    const year = date.getFullYear() ; // Adjust the year dynamically
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Combine all into the desired format
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};


