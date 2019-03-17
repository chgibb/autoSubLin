import * as fs from "fs";

import {Task} from "./task";

export class Dir extends Task<string,undefined>
{
    public name : string;

    public execStrings : Array<string>;
    
    public constructor(input : string)
    {
        super(input,undefined);
        this.name = `Make ${input}/`;
        this.execStrings = [
            `mkdir ${input}`
        ];
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push(this.input);

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => 
        {
            fs.mkdirSync(this.input);
            resolve(true);
        });
    }
}
