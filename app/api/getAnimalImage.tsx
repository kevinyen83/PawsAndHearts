import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { width, height } = req.query;

    if (!width || !height) {
      return res.status(400).json({ error: 'Please provide both width and height parameters.' });
    }

    const imageUrl = `http://placekitten.com/${width}/${height}`;
    

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch image.' });
    }

    const imageBuffer = await response.buffer();
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
