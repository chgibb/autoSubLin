import * as cp from "child_process";

import {Task} from "./task";
import { DataDir } from "./dataDir";

export class BamToSam extends Task<string,string>
{
    public name : string;
    public execStrings : Array<string>;
    
    public constructor(inputs : string,modifiers : string)
    {
        super(inputs,modifiers);
        this.name = `Convert Bam to Sam ${this.input} -> ${this.modifiers}`;
        this.dependsOn = [new DataDir()];
        this.execStrings = [
            `./tools/samtools view -@ 4 -h -o ${this.modifiers} ${this.input}`
        ];
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
            cp.execSync(this.execStrings[0],{stdio:"ignore"});
            resolve(true);
        });
    }
}
