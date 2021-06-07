import express from 'express';

const router = (app: express.Express) => {
  app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ msg: 'Hello, world!' });
  });
};

export default router;
