import * as cp from "child_process";

import {Task} from "./task";

import {IndexAllRefsHisat2} from "./indexAllRefsHisat2";

export class Hisat2AllSubLinAlignUnpaired extends Task<string,string>
{
    public name : string;
    public execStrings : Array<string> = [];

    public constructor(input : string,modifier : string)
    {
        super(input,modifier);

        this.name = "Hisat2 unpaired align";
        this.dependsOn = [
            new IndexAllRefsHisat2()
        ];

        this.execStrings = [
            `./tools/hisat2 -p 4 -x out/raw/HPV16_all_refs -U ${input} -S ${modifier}`
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