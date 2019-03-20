import * as fs from "fs";

import {Report} from "./report";

export class C3 extends Report
{   
    public pattern = /C3-KU053920-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.C3`,this.tally);
        return true;
    }
}