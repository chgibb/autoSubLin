import {Task} from "./task";

import {BamToFastq} from "./bamToFastq";
import {DataDir} from "./dataDir";

export class Pipeline extends Task<string,undefined>
{
    public name : string;
    public execStrings : Array<string> = [];

    public constructor(input : string)
    {
        super(input,undefined);

        this.name = `Pipelining ${input}`;
        this.dependsOn = [
            new DataDir(),
            new BamToFastq(input,[`out/raw/${input}_read1.fq`,`out/raw/${input}_read2.fq`])
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