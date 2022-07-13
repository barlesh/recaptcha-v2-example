# recaptcha-v2-example
a simple server client implementation of reCAPTCHA V2

## ReCAPTCHA V2
Create a developer account in Google, and create a reCAPTCHA V2 site key and secret key.


## server
cd into the server dir `cd server`
install dependencies `yarn`
Run the server with `yarn start`

Make sure that the reCAPTCHA secret key is loaded as an evn var `RECAPTCHA_SECRET_KEY`.
#####teller
[teller](https://github.com/SpectralOps/teller) is already configured for a local .env - I recommend using it for this task.
Place your secret key in the `.env` file
Run `teller run yarn start`


## client
cd into the client dir `cd client/recaptcha-v2-login-page`
install dependencies `yarn`
Run the client's server with `yarn start`

Make sure that the reCAPTCHA site key is loaded as an evn var `REACT_APP_RECAPTCHA_SITE_KEY`.