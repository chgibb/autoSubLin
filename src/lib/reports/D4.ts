import * as fs from "fs";

import {Report} from "./report";

export class D4 extends Report
{   
    public pattern = /D4-KU053931-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.D4`,this.tally);
        return true;
    }
}