import * as cp from "child_process";

import {Task} from "./task";
import {IndexAllRefsHisat2} from "./indexAllRefs";

export class BamToSam extends Task<string,string>
{
    public name : string;
    
    public constructor(inputs : string,modifiers : string)
    {
        super(inputs,modifiers);
        this.name = `Convert Bam to Sam ${this.inputs} -> ${this.modifiers}`;
        this.dependsOn = new IndexAllRefsHisat2();
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
            cp.execSync(`./tools/samtools view -@ 4 -h -o ${this.modifiers} ${this.inputs}`,{stdio:"ignore"});
            resolve(true);
        })
    }
}
