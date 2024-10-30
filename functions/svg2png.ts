import type { Buffer } from "buffer";
import { Resvg } from 'npm:@resvg/resvg-js'
// import { Resvg } from 'https://raw.githubusercontent.com/yisibl/resvg-js/refs/heads/main/wasm/index.d.ts'
// import { Resvg } from 'https://esm.sh/@resvg/resvg-js@2.6.2'

// import ky from "https://esm.sh/v135/ky@1.7.2/distribution/index.js";


const svg2png_buffer = function (svg: string): Buffer {
    const opts = {
        fitTo: {
            mode: "width",
            value: 1200,
        },
    };
    const resvg = new Resvg(svg, opts);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    // console.info('Original SVG Size:', `${resvg.width} x ${resvg.height}`)
    // console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)
    return pngBuffer
}

const svg2png = function (svg: string, filename:string):File {
    const pngBuffer = svg2png_buffer(svg);
    return new File([pngBuffer],filename)
    // const pngBuffer = await ky.get("https://sfo3.digitaloceanspaces.com/dgt/botchat_01j1ryskf8errs7a34g299xb51/thumbnails/6690b66aF0.png").arrayBuffer();
    // return new File([pngBuffer],filename)
};

export { svg2png, svg2png_buffer }