import express from 'express'
import cors from 'cors'
import { verifyReCAPTCHA } from './recaptcha.js'

const app = express()
const port = process.env.port || 3012;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/login', async (req, res) => {

    const recaptcha = req.body.recaptcha
    if (!recaptcha) {
        return res.status(403).json({ msg: 'Must supply ReCAPTCHA challenge' });
    }

    const verificationResult = await verifyReCAPTCHA(recaptcha);

    if (verificationResult.success) {
        res.status(200).json(verificationResult);
    } else {
        res.status(403).json({ msg: 'Failed Captcha' });
    }

})

app.listen(port, () => {
  console.log(`reCAPTCHA server listen on port ${port}`)
})