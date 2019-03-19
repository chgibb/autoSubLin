export abstract class Report
{
    public abstract process(line : string) : void;
    public abstract write(file : string) : boolean;
    public abstract tally : number;
}
