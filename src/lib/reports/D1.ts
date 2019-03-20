import * as fs from "fs";

import {Report} from "./report";

export class D1 extends Report
{   
    public pattern = /D1-HQ644257-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.D1`,this.tally);
        return true;
    }
}