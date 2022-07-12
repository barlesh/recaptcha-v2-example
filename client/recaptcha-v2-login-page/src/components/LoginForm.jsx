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

    const handleSubmit = async (e) => {
        if (!isUserNameValid(username)) {
            alert('Username is not valid');
            return;
        }
        e.preventDefault();
        try {
            const res = await fetch(`/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, recaptcha: reCAPTCHA })
            })


            const data = await res.json();
            setIsVerified(data?.success);

        } catch (e) {
            console.log(e);
        }
    }

    function handleCaptcha(value) {
        setReCAPTCHA(value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={username} onChange={handleChange} />
            </label>
            {isUserNameValid(username) && <ReCAPTCHA
                    sitekey={captchaSiteKey}
                    onChange={handleCaptcha}
                />
            }
            <input type="submit" value="Submit" />
            </form>
            {isVerified !== undefined && (<h1>{isVerified ? 'Human :)' : 'Machine :('}</h1>)}
            </div>
      );
}

export default LoginForm;