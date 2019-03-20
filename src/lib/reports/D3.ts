import * as fs from "fs";

import {Report} from "./report";

export class D3 extends Report
{   
    public pattern = /D3-AF402678-1/g;
    public tally : number = 0;
    public process(line : string) : void
    {
        if(this.pattern.test(line))
            this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.D3`,this.tally);
        return true;
    }
}