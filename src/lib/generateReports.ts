import * as cp from "child_process";

import {Task} from "./task";

export class GenerateReports extends Task<string,undefined>
{
    public name : string;
    public execStrings : Array<string>;

    public constructor(input : string)
    {
        super(input,undefined);
        this.name = "Generate reports";
        this.dependsOn = [];
        this.execStrings = [
            `./reporter ${input}`
        ];
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push(`${this.input}.readCount`);

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