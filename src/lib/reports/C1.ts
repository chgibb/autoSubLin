import * as fs from "fs";

import {Report} from "./report";

export class C1 extends Report
{   
    public pattern = /C1-AF472509-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.C1`,this.tally);
        return true;
    }
}