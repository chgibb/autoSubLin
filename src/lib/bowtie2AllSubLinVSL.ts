import * as cp from "child_process";

import {Task} from "./task";

import {IndexAllRefsBowtie2} from "./indexAllRefsBowtie2";

export class Bowtie2AllSubLinAlignVSL extends Task<Array<string>,string>
{
    public name : string;
    public execStrings : Array<string> = [];

    public constructor(inputs : Array<string>,modifier : string)
    {
        super(inputs,modifier);

        this.name = "Bowtie2 paired align";
        this.dependsOn = [
            new IndexAllRefsBowtie2()
        ];

        this.execStrings = [
            `./tools/bowtie2 -p 4 --very-sensitive-local -x out/raw/HPV16_all_refs -1 ${inputs[0]} -2 ${inputs[1]} -S ${modifier}`
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
