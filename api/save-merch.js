import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let items = [];
      try {
        const file = await fs.readFile('merch.json', 'utf-8');
        items = JSON.parse(file);
        if (!Array.isArray(items)) items = [];
      } catch {}
      items.push(req.body);
      await fs.writeFile('merch.json', JSON.stringify(items, null, 2));
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save merch data.' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await fs.readFile('merch.json', 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(404).json({ error: 'No merch data found.' });
    }
  } else {
    res.status(405).end();
  }
}
