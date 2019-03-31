import * as fs from "fs";

import {Pipeline} from "./lib/pipeline";

let args = process.argv.slice(2);

interface InFormat
{
    file : string;
    prune : boolean;
}

const samples = JSON.parse(fs.readFileSync(args[0]).toString()) as Array<InFormat>;

(async function()
{
    for(let i = 0; i != samples.length; ++i)
    {
        let pipeline = new Pipeline(samples[i].file);

        await pipeline.execute();

        pipeline.showReports();
        
        if(samples[i].prune)
            await pipeline.prune();
    }
})();
