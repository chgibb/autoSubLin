import * as fs from "fs";

import {Report} from "./report";

export class B3 extends Report
{   
    public pattern = /B3-HQ644298-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.B3`,this.tally);
        return true;
    }
}