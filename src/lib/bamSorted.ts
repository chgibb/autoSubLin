import * as cp from "child_process";

import {Task} from "./task";

export class BamSorted extends Task<string,string>
{
    public name : string;
    
    public constructor(inputs : string,modifiers : string)
    {
        super(inputs,modifiers);
        this.name = `Sorting Bam ${this.input} -> ${this.modifiers}`;
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push(this.modifiers);

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => {
            cp.execSync(`./tools/samtools sort -@ 4 -n -o ${this.modifiers} ${this.input}`,{stdio:"ignore"});
            resolve(true);
        });
    }
}
