import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
// import * as foo from "npm:@myriaddreamin/typst-ts-node-compiler@0.5.0-rc7";
// console.log(foo);


const content = 'hello world';

const compiler = NodeCompiler.create({ //todo test fonts
    // fontArgs: [
    //   { fontPaths: ['assets/fonts'] },
    // ]
});
const result = await compiler.pdf({
    mainFileContent: content,
});

console.log(result)

