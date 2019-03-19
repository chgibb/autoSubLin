import * as fs from "fs";

import {Report} from "./report";

export class Count extends Report
{
    public tally : number = 0;
    public process(line : string) : void
    {
        this.tally++;
    }

    public write(file : string) : boolean
    {
        fs.writeFileSync(`${file}.readCount`,this.tally);
        return true;
    }
}