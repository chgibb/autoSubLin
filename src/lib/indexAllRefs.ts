import * as cp from "child_process";

import {Task} from "./task";
import {RawDir} from "./rawDir";

export class IndexAllRefsHisat2 extends Task<undefined,undefined>
{
    public name : string;

    public constructor()
    {
        super(undefined,undefined);
        this.name = "Index Hisat2 all refs fasta";
        this.dependsOn = new RawDir();
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push("out/raw/HPV16_all_refs.1.ht2");
        res.push("out/raw/HPV16_all_refs.2.ht2");
        res.push("out/raw/HPV16_all_refs.3.ht2");
        res.push("out/raw/HPV16_all_refs.4.ht2");
        res.push("out/raw/HPV16_all_refs.5.ht2");
        res.push("out/raw/HPV16_all_refs.6.ht2");
        res.push("out/raw/HPV16_all_refs.7.ht2");
        res.push("out/raw/HPV16_all_refs.8.ht2");

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => {
            cp.execSync(`./tools/hisat2-build tools/HPV16_all_refs.fasta out/raw/HPV16_all_refs`,{stdio:"ignore"});
            resolve(true);
        });
    }
}