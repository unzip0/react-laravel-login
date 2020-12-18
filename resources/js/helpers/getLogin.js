const _URL = require("../config/url.config.js");

export const getLogin = async( data ) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    };
    try {
        const fetchResponse = await fetch(_URL.LOGIN, settings);
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