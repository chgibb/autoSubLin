import {Task} from "./task";

import { BamToSam } from "./bamToSam";
import { BamSorted } from "./bamSorted";
import { DataDir } from "./dataDir";

export class Pipeline extends Task<string,undefined>
{
    public name : string;

    public constructor(input : string)
    {
        super(input,undefined);

        this.name = `Pipelining ${input}`;
        this.dependsOn = [
            new DataDir(),
            new BamToSam(input,`out/raw/${input}.sam`),
            new BamSorted(input,`out/raw/${input}.sorted.sam`)
        ];
    }

    public artifacts() : Array<string>
    {
        return [];
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });
    }
}