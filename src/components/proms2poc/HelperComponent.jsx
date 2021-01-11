function HelperComponent() {
    
}

export function convertObligorStatusToString(status) {
    if (status === 8)
        return "Live";
    if (status === 1)
        return "At Enquiry";
    return status;
}

export default HelperComponent