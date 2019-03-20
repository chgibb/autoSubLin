import * as fs from "fs";

import {Report} from "./report";

export class C4 extends Report
{   
    public pattern = /C4-KU053925-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.C4`,this.tally);
        return true;
    }
}