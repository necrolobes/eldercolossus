import { promises as fs } from 'fs';
const CRED_PATH = 'credentials.json';

async function getCreds() {
  try {
    const data = await fs.readFile(CRED_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { username: 'necrolobes', password: 'admin' };
  }
}

async function setCreds(creds) {
  await fs.writeFile(CRED_PATH, JSON.stringify(creds, null, 2));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { action, username, password, newPassword } = req.body;
  let creds = await getCreds();

  if (action === 'login') {
    if (username === creds.username && password === creds.password) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } else if (action === 'change') {
    if (username === creds.username && password === creds.password && newPassword) {
      creds.password = newPassword;
      await setCreds(creds);
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } else if (action === 'reset') {
    creds.password = 'admin';
    await setCreds(creds);
    res.status(200).json({ success: true });
  } else {
    res.status(400).end();
  }
}
