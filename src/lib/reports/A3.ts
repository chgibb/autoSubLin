import * as fs from "fs";

import {Report} from "./report";

export class A3 extends Report
{   
    public pattern = /A3-HQ644236-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.A3`,this.tally);
        return true;
    }
}