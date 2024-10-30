import { Hono } from 'hono';
import compileRouter from "./routes/compile.ts";

const app = new Hono();

app.route('/compile', compileRouter );

// app.get('/', async (c) => { /* */ });


console.log('Server is running on port 8000');
export default app;
