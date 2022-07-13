import fetch from 'node-fetch'

export const verifyReCAPTCHA = async (recaptcha, secretKey) => {

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const body = `secret=${secretKey}&response=${recaptcha}`
    const headers = { "Content-Type": "application/x-www-form-urlencoded" }

    //Post to that URL, the response it's a JSON with the assessment and a timestamp.
    const response = await fetch(verifyUrl, {method: 'POST', body, headers } );
    const data = await response.json();
    return data;
}