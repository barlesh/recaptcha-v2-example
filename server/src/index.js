import express from 'express'
import cors from 'cors'
import { verifyReCAPTCHA } from './recaptcha.js'

const secretKey = process.env.RECAPTCHA_SECRET_KEY;
if (!secretKey) {
    console.error('No secret key provided');
    process.exit(1);
}

const app = express()
const port = process.env.port || 3012;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/login', async (req, res) => {

    const { recaptcha, username } = req.body
    console.log(`📢[index.js:22]: recaptcha: `, recaptcha)
    console.log(`📢[index.js:23]: username: `, username)
    // if (!recaptcha) {
    //     return res.status(403).json({ msg: 'Must supply ReCAPTCHA challenge' });
    // }

    // const verificationResult = await verifyReCAPTCHA(recaptcha);

    // if (verificationResult.success) {
    //     res.status(200).json(verificationResult);
    // } else {
    //     res.status(403).json({ msg: 'Failed Captcha' });
    // }
    return executeReCAPTCHA(req, res, secretKey);

})

app.post('/login-bad-token', async (req, res) => {
    // const recaptcha = req.body.recaptcha
    // if (!recaptcha) {
    //     return res.status(403).json({ msg: 'Must supply ReCAPTCHA challenge' });
    // }

    // const verificationResult = await verifyReCAPTCHA(recaptcha);

    // if (verificationResult.success) {
    //     res.status(200).json(verificationResult);
    // } else {
    //     res.status(403).json({ msg: 'Failed Captcha' });
    // }
    return executeReCAPTCHA(req, res, `${secretKey}-bad-token`);

})

const executeReCAPTCHA = async (req, res, reCAPTCHAsecretKey) => {
    console.log(`📢[index.js:57]: reCAPTCHAsecretKey: `, reCAPTCHAsecretKey)
    const recaptcha = req.body.recaptcha
    if (!recaptcha) {
        return res.status(403).json({ msg: 'Must supply ReCAPTCHA challenge' });
    }
    const verificationResult = await verifyReCAPTCHA(recaptcha, reCAPTCHAsecretKey);

    if (verificationResult.success) {
        res.status(200).json(verificationResult);
    } else {
        res.status(403).json({ msg: 'Failed Captcha' });
    }
}




app.listen(port, () => {
  console.log(`reCAPTCHA server listen on port ${port}`)
})