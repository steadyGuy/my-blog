// import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import pug from 'pug';
import path from 'path';
import juice from 'juice';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const nodemailer = require('nodemailer');

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER = `${process.env.EMAIL_SENDER}`;

const sendEmail = async (to: string, url: string, subject: string) => {
  try {
    const oAuth2Client = new OAuth2Client(CLIENT_ID, SECRET, OAUTH_PLAYGROUND);

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    const transportEngine: SMTPTransport.Options | SMTPTransport = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER,
        clientId: CLIENT_ID,
        clientSecret: SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token as string,
      },
    };
    // const transportEngine = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     type: 'OAuth2',
    //     user: SENDER,
    //     clientId: CLIENT_ID,
    //     clientSecret: SECRET,
    //     refreshToken: REFRESH_TOKEN,
    //     access_token: accessToken,
    //   },
    // });

    const transport = nodemailer.createTransport(transportEngine);

    const html = pug.renderFile(path.join(__dirname, '../templates', 'mail.pug'), { href: url });

    const message = {
      html: juice(html),
      from: SENDER,
      to,
      subject,
    };

    return transport.sendMail(message);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default sendEmail;
