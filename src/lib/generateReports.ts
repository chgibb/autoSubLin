import {Task} from "./task";
import {processSam} from "./reports/processSam";

export class GenerateReports extends Task<string,undefined>
{
    public name : string;
    public execStrings : Array<string>;

    public constructor(input : string)
    {
        super(input,undefined);
        this.name = "Generate reports";
        this.dependsOn = [];
        this.execStrings = [
            `report on ${input}`
        ];
    }

    public artifacts() : Array<string>
    {
        let res = new Array<string>();

        res.push(`${this.input}.readCount`);
        res.push(`${this.input}.A1`);

        return res;
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => 
        {
            processSam(this.input);
            //cp.execSync(this.execStrings[0],{stdio:"ignore"});
            resolve(true);
        });
    }
}