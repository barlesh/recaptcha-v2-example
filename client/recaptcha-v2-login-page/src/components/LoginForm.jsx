import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const captchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [reCAPTCHA, setReCAPTCHA] = useState('');
    const [isVerified, setIsVerified] = useState(undefined);

    const isUserNameValid = (username) => username && username.length > 5 && username.length < 20;

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const submit = async (value, recaptchaToken, loginEndpoint = '/login') => {
        if (!isUserNameValid(value)) {
            alert('Username is not valid');
            return;
        }

        try {
            const res = await fetch(`/${loginEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: value, recaptcha: recaptchaToken })
            })


            const data = await res.json();
            setIsVerified(data?.success);

        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmitFailedCaptchaToken = async() => {
        const damagedReCAPTCHAToken = `${reCAPTCHA}nonvalidtoken`
        return submit(username, damagedReCAPTCHAToken);
    }

    const handleSubmitFailedCaptchaSecret = async() => {
        return submit(username, reCAPTCHA, 'login-bad-token');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        return submit(username, reCAPTCHA)
    }

    function handleCaptcha(value) {
        setReCAPTCHA(value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{margin: "10px"}}>
                    <label>
                        Name:
                        <input type="text" value={username} onChange={handleChange} />
                    </label>
                </div>
                <div style={{display: "flex", "align-items": "center", "justify-content": "center"}}>
                    {isUserNameValid(username) && <ReCAPTCHA
                        sitekey={captchaSiteKey}
                        onChange={handleCaptcha}
                        />
                    }
                </div>
                <div style={{margin: "20px"}}>
                    <input type="submit" value="Submit" />
                </div>
            </form>
            <button onClick={() => handleSubmitFailedCaptchaToken()}>Submit with failed reCAPTCHA</button>
            <button onClick={() => handleSubmitFailedCaptchaSecret()}>Submit with wrong reCAPTCHA token</button>
            {isVerified !== undefined && (<h1>{isVerified ? 'Human :)' : 'Machine :('}</h1>)}
        </div>
      );
}

export default LoginForm;