import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const serviceID = `${process.env.TWILIO_SERVICE_ID}`;

const client = twilio(accountSid, authToken);

export const sendSMS = (to: string, body: string) => {
  client.messages
    .create({
      body,
      from,
      to: `+38${to}`,
    })
    .then((msg) => console.log(msg.sid));
}

export const smsOTP = async (to: string, channel: string) => {
  try {
    const data = await client
      .verify
      .services(serviceID)
      .verifications
      .create({ to: `+38${to}`, channel, });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const smsVerify = async (to: string, code: string) => {
  try {
    const data = await client
      .verify
      .services(serviceID)
      .verificationChecks
      .create({ to: `+38${to}`, code, });

    return data;
  } catch (err) {
    console.log(err);
  }
}