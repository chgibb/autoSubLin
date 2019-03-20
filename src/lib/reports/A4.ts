import * as fs from "fs";

import {Report} from "./report";

export class A4 extends Report
{   
    public pattern = /A4-AF534061-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.A4`,this.tally);
        return true;
    }
}