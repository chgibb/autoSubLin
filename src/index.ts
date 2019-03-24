import * as fs from "fs";

import {Pipeline} from "./lib/pipeline";

let args = process.argv.slice(2);

const samples = JSON.parse(fs.readFileSync(args[0]).toString()) as Array<string>;

(async function()
{
    for(let i = 0; i != samples.length; ++i)
    {
        let pipeline = new Pipeline(samples[i]);
        await pipeline.execute();
        await pipeline.prune();
        pipeline.showReports();
    }
})();
