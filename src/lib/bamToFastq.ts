import * as cp from "child_process";

import {Task} from "./task";
import {BamSorted} from "./bamSorted";
import {BamToSam} from "./bamToSam";

export class BamToFastq extends Task<string,Array<string>>
{
    public name : string;
    public execStrings : Array<string>;
    
    public constructor(input : string,modifiers : Array<string>)
    {
        super(input,modifiers);
        this.name = `Sam to Fastq out/raw/${this.input}.sorted.sam -> ${this.modifiers[0]}, ${this.modifiers[1]}`;
        this.dependsOn = [
            new BamToSam(input,`out/raw/${input}.sam`),
            new BamSorted(input,`out/raw/${input}.sorted.bam`)
        ];
        this.execStrings = [
            `tools/bedtools2/bedtools bamtofastq -i out/raw/${this.input}.sorted.bam -fq ${this.modifiers[0]} -fq2 ${this.modifiers[1]}`
        ];
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push(this.modifiers[0]);
        res.push(this.modifiers[1]);

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
