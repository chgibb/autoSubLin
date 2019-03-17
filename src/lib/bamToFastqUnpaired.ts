import * as cp from "child_process";

import {Task} from "./task";
import {BamSorted} from "./bamSorted";
import {BamToSam} from "./bamToSam";

export class BamToFastqUnpaired extends Task<string,string>
{
    public name : string;
    public execStrings : Array<string>;
    
    public constructor(input : string,modifiers : string)
    {
        super(input,modifiers);
        this.name = `Sam to Fastq out/raw/${this.input}.sorted.sam -> ${this.modifiers}`;
        this.dependsOn = [
            new BamToSam(input,`out/raw/${input}.sam`),
            new BamSorted(input,`out/raw/${input}.sorted.bam`),
        ];
        this.execStrings = [
            `tools/bedtools2/bedtools bamtofastq -i out/raw/${this.input}.sorted.bam -fq ${this.modifiers}`
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
        return new Promise<boolean>((resolve) => 
        {
            cp.execSync(this.execStrings[0],{stdio:"ignore"});
            resolve(true);
        });
    }
}
