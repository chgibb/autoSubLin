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
        res.push(`${this.input}.A2`);
        res.push(`${this.input}.A3`);
        res.push(`${this.input}.A4`);
        res.push(`${this.input}.B1`);
        res.push(`${this.input}.B2`);
        res.push(`${this.input}.B3`);
        res.push(`${this.input}.B4`);
        res.push(`${this.input}.C1`);
        res.push(`${this.input}.C2`);
        res.push(`${this.input}.C3`);
        res.push(`${this.input}.C4`);
        res.push(`${this.input}.D1`);
        res.push(`${this.input}.D2`);
        res.push(`${this.input}.D3`);
        res.push(`${this.input}.D4`);


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