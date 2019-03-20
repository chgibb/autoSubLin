import * as fs from "fs";

import {Report} from "./report";

export class D2 extends Report
{   
    public pattern = /D2-AY686579-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.D2`,this.tally);
        return true;
    }
}