import jwt from 'jsonwebtoken';

const activeToken = (payload: object) => (
  jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, { expiresIn: '10m', algorithm: 'HS256' })
);

const accessToken = (payload: object) => (
  jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '15m', algorithm: 'HS256' })
);

const refreshToken = (payload: object) => (
  jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d', algorithm: 'HS256' })
);

export default { activeToken, accessToken, refreshToken };
