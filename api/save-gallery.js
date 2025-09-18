import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await fs.writeFile('gallery.json', JSON.stringify(req.body, null, 2));
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save gallery data.' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await fs.readFile('gallery.json', 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(404).json({ error: 'No gallery data found.' });
    }
  } else {
    res.status(405).end();
  }
}
