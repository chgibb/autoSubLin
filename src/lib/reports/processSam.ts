import * as readline from "readline";
import * as fs from "fs";

import {Report} from "./report";
import {Count} from "./count";

export function processSam(file : string) : Promise<boolean>
{
    let reports = new Array<Report>();

    reports.push(new Count());
    return new Promise<boolean>((resolve : (value : boolean) => void) => 
    {
        let rl : readline.ReadLine = readline.createInterface(<readline.ReadLineOptions>{
            input : fs.createReadStream(file)
        });

        rl.on("line",function(line : string){
            for(let i = 0; i != reports.length; ++i)
            {
                reports[i].process(line);
            }
        });

        rl.on("close",function(){
            for(let i = 0; i != reports.length; ++i)
            {
                reports[i].write(file);
            }
            return resolve(true);
        })
    });
}