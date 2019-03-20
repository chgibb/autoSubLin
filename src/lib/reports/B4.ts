import * as fs from "fs";

import {Report} from "./report";

export class B4 extends Report
{   
    public pattern = /B4-KU053914-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.B4`,this.tally);
        return true;
    }
}