import { stream } from "streaming";
import { typst_compile } from "../functions/typst_compile.ts";
import { cors } from "middleware";
import { Hono } from "hono";

const compileRouter = new Hono();

compileRouter.use(cors({
    origin: "*",
    allowMethods: ["OPTIONS", "POST", "GET", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
}));

compileRouter.options("*", (c) => {
    console.log("Manejo de solicitud OPTIONS para /flow_template");
    c.header("Access-Control-Allow-Origin", "*");
    c.header("Access-Control-Allow-Methods", "OPTIONS, PUT, GET, POST, DELETE");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Allow-Credentials", "true");
    return c.json({ success: true });
});

compileRouter.post('/', async (c) => {
    try {
        const options = await c.req.json();
        const result = await typst_compile({
            format: options.format, // "png" | "pdf" | "svg",
            content: options.content, // "hello world",
            filename: options.filename, // "hola.svg",
            return_type: "buffer",
        });
        return stream(
            c,
            async (stream) => {
                // Write a process to be executed when aborted.
                stream.onAbort(() => {
                    console.log("Aborted!");
                });
                // Write a Uint8Array.
                await stream.write(
                    // new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])
                    result,
                );
                // Pipe a readable stream.
                // await stream.pipe(anotherReadableStream)
            },
            (err, stream) => {
                stream.writeln("An error occurred!");
                console.error(err);
            },
        );
    } catch (error) {
        console.error("Error typst compiler:", error);
        return c.json({ error: "Error typst compiler" }, 500);
    }
})

export default compileRouter;