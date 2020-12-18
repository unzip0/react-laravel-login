const _URL = require("../config/url.config.js");

export const getRegister = async( data ) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            username: data.username,
            password: data.password
        })
    };
    try {
        const fetchResponse = await fetch(_URL.REGISTER, settings);
        const response = await fetchResponse.json();
        return response;
    } catch (e) {
        return {
            status: 'failed',
            message: 'Network error',
            errors: { e }
        };
    }    
}