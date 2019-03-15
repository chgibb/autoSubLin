import * as fs from "fs"

import {Task} from "./task";

export class OutDir extends Task<undefined,undefined>
{
    public name : string;
    
    public constructor()
    {
        super(undefined,undefined);
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
