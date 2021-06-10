import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const client = twilio(accountSid, authToken);

export default function sendSMS(to: string, body: string) {
  client.messages
    .create({
      body,
      from,
      to: `+38${to}`,
    })
    .then((msg) => console.log(msg.sid));
}
