import * as readline from "readline";
import * as fs from "fs";

import {Report} from "./report";
import {Count} from "./count";
import {A1} from "./A1";
import {A2} from "./A2";
import {A3} from "./A3";
import {A4} from "./A4";
import {B1} from "./B1";
import {B2} from "./B2";
import {B3} from "./B3";
import {B4} from "./B4";
import {C1} from "./C1";
import {C2} from "./C2";
import {C3} from "./C3";
import {C4} from "./C4";
import {D1} from "./D1";
import {D2} from "./D2";
import {D3} from "./D3";
import {D4} from "./D4";

export function processSam(file : string) : Promise<boolean>
{
    let reports = new Array<Report>();

    reports.push(new Count());
    reports.push(new A1());
    reports.push(new A2());
    reports.push(new A3());
    reports.push(new A4());
    reports.push(new B1());
    reports.push(new B2());
    reports.push(new B3());
    reports.push(new B4());
    reports.push(new C1());
    reports.push(new C2());
    reports.push(new C3());
    reports.push(new C4());
    reports.push(new D1());
    reports.push(new D2());
    reports.push(new D3());
    reports.push(new D4());

    return new Promise<boolean>((resolve : (value : boolean) => void) => 
    {
        let rl : readline.ReadLine = readline.createInterface(<readline.ReadLineOptions>{
            input : fs.createReadStream(file)
        });

        rl.on("line",function(line : string)
        {
            for(let i = 0; i != reports.length; ++i)
            {
                reports[i].process(line);
            }
        });

        rl.on("close",function()
        {
            for(let i = 0; i != reports.length; ++i)
            {
                reports[i].write(file);
            }
            return resolve(true);
        });
    });
}