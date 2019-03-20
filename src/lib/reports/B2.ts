import * as fs from "fs";

import {Report} from "./report";

export class B2 extends Report
{   
    public pattern = /B2-KU053915-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.B2`,this.tally);
        return true;
    }
}