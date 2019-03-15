import * as fs from "fs"

import {Task} from "./task";
import {Dir} from "./dir";

export class DataDir extends Task<undefined,undefined>
{
    public name : string;
    
    public constructor()
    {
        super(undefined,undefined);
        this.name = `Make data dir/`;
        this.dependsOn = [
            new Dir("out"),
            new Dir("out/raw")
        ];
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });
    }
}
