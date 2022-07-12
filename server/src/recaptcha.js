import fetch from 'node-fetch'

const secretKey = process.env.RECAPTCHA_SECRET_KEY;
if (!secretKey) {
    console.error('No secret key provided');
    process.exit(1);
}

export const verifyReCAPTCHA = async (recaptcha) => {

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const body = `secret=${secretKey}&response=${recaptcha}`
    const headers = { "Content-Type": "application/x-www-form-urlencoded" }

    //Post to that URL, the response it's a JSON with the assessment and a timestamp.
    const response = await fetch(verifyUrl, {method: 'POST', body, headers } );
    const data = await response.json();
    return data;
}