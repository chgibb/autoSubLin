import * as cp from "child_process";

import {Task} from "./task";

import {IndexAllRefsHisat2} from "./indexAllRefsHisat2";

export class Hisat2AllSubLinAlign extends Task<Array<string>,string>
{
    public name : string;
    public execStrings : Array<string> = [];

    public constructor(inputs : Array<string>,modifier : string)
    {
        super(inputs,modifier);

        this.name = "Hisat2 paired align";
        this.dependsOn = [
            new IndexAllRefsHisat2()
        ];

        this.execStrings = [
            `./tools/hisat2 -p 4 -x out/raw/HPV16_all_refs -1 ${inputs[0]} -2 ${inputs[1]} -S ${modifier}`
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