import * as fs from "fs"

import {Task} from "./task";

export class OutDir extends Task
{
    public name : string;
    
    public constructor(inputs : Array<string>,modifiers : Array<string>)
    {
        super(inputs,modifiers);
        this.name = "Make out/";
    }
    
    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push("out");

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => {
            fs.mkdirSync("out");
            resolve(true);
        })
    }
}
