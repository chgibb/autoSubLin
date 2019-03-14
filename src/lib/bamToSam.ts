import * as cp from "child_process";

import {Task} from "./task";
import {IndexAllRefsHisat2} from "./indexAllRefs";

export class BamToSam extends Task
{
    public name : string;
    
    public constructor(inputs : Array<string>,modifiers : Array<string>)
    {
        super(inputs,modifiers);
        this.name = `Convert Bam to Sam ${this.inputs[0]} -> ${this.modifiers[0]}`;
        this.dependsOn = new IndexAllRefsHisat2([],[]);
    }
    
    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push(this.modifiers[0]);

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => {
            cp.execSync(`./tools/samtools view -@ 4 -h -o ${this.modifiers[0]} ${this.inputs[0]}`,{stdio:"ignore"});
            resolve(true);
        })
    }
}
