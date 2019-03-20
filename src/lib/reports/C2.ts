import * as fs from "fs";

import {Report} from "./report";

export class C2 extends Report
{   
    public pattern = /C2-HQ644244-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.C2`,this.tally);
        return true;
    }
}