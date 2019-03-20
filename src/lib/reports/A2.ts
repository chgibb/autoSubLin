import * as fs from "fs";

import {Report} from "./report";

export class A2 extends Report
{
    public pattern = /A2-AF536179-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.A2`,this.tally);
        return true;
    }
}