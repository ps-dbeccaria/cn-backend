import * as express from 'express';
import { client } from '../..';

export const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const query = `
      SELECT * FROM topics;
    `
    const topics = await client.query(query);
    res.status(200).json(topics.rows);
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
})

router.get('/prompts', async (req: express.Request, res: express.Response) => {
  try {
    const {topicid, type} = req.query;
    if (topicid) {
      const promptType = type === 'prompts' ? 'prompts' : 'roles';
      const colName = type === 'prompts' ? 'prompttext' : 'roletext';
      const query = `SELECT ${colName} FROM ${promptType} where topicid = '${topicid}'`;
      const prompts = await client.query(query);
      res.status(200).json(prompts.rows)
      return;
    }
    res.status(400).send('Topic ID is required.');
  } catch (error) {
    console.error(error);
    throw error;
  }
})