import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 5175);
const app = createApp();

app.listen(port, () => {
  console.log(`Diagnostik API berjalan di http://localhost:${port}`);
});