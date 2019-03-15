import * as fs from "fs"

import {Task} from "./task";
import {OutDir} from "./outDir"

export class RawDir extends Task<undefined,undefined>
{
    public name : string;
    
    public constructor()
    {
        super(undefined,undefined);
        this.name = "Make out/raw/";
        this.dependsOn = new OutDir();
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push("out/raw");

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => {
            fs.mkdirSync("out/raw");
            resolve(true);
        })
    }
}
