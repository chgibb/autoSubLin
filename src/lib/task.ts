import * as fs from "fs";

export abstract class Task
{
    public dependsOn? : Task;
    public abstract name : string;
    public inputs : Array<string>;
    public modifiers : Array<string>;
    
    public constructor(inputs : Array<string>, modifiers : Array<string>,dependsOn? : Task)
    {
        this.dependsOn = dependsOn;
        this.inputs = inputs;
        this.modifiers = modifiers;
    }

    public abstract artifacts() : Array<string>;
    public abstract run() : Promise<boolean>;
    
    public execute() : Promise<boolean>
    {
        return new Promise<boolean>(async (resolve : (value : boolean) => void,reject : (reason : string) => void) => {
            if(this.dependsOn)
                await this.dependsOn.execute();
            
            if(missingArtifacts(this))
            {
                console.log(this.name);
                await this.run();
            }
            resolve(missingArtifacts(this));
        });
    }
}

export function missingArtifacts(task : Task) : boolean
{
    let artifacts = task.artifacts();
    for(let i = 0; i != artifacts.length; ++i)
    {
        if(!fs.existsSync(artifacts[i]))
        {
            return true;
        }
    }

    return false;
}