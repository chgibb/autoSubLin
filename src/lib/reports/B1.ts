import * as fs from "fs";

import {Report} from "./report";

export class B1 extends Report
{   
    public pattern = /B1-AF536180-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.B1`,this.tally);
        return true;
    }
}