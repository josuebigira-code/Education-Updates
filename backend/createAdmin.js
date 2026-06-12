require('dotenv').config();
const db = require('./db');
const bcrypt = require('bcryptjs');

async function createAdmin(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db('admins').insert({ username, password: hashedPassword });
    console.log(`Admin ${username} created successfully.`);
  } catch (error) {
    console.error(`Error creating admin: ${error.message}`);
  } finally {
    process.exit();
  }
}

const [,, u, p] = process.argv;
if (!u || !p) {
  console.log('Usage: node createAdmin.js <username> <password>');
  process.exit();
}

createAdmin(u, p);
