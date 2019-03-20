import * as fs from "fs";

import {Report} from "./report";

export class A1 extends Report
{
    public pattern = /A1-NC-001526-4/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.A1`,this.tally);
        return true;
    }
}