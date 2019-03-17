import * as cp from "child_process";

import {Task} from "./task";

import {IndexAllRefsBowtie2} from "./indexAllRefsBowtie2";

export class Bowtie22AllSubLinAlignUnpaired extends Task<string,string>
{
    public name : string;
    public execStrings : Array<string> = [];

    public constructor(input : string,modifier : string)
    {
        super(input,modifier);

        this.name = "Bowtie2 unpaired align";
        this.dependsOn = [
            new IndexAllRefsBowtie2()
        ];

        this.execStrings = [
            `./tools/bowtie2 -p 4 --sensitive-local -x out/raw/HPV16_all_refs -U ${input} -S ${modifier}`
        ];
    }

    public artifacts() : Array<string>
    {
        return [this.modifiers];
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