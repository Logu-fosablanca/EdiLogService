function generateResponse(status, message, data){
    const response = {
		status : status,
		message : message,
        data : data
	}
	
	return JSON.stringify(response);
}

export default generateResponse;