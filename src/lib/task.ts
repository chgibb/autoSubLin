import * as fs from "fs";

export abstract class Task<I,M>
{
    public dependsOn? : Task<any,any>;
    public abstract name : string;
    public inputs : I;
    public modifiers : M;

    public constructor(inputs : I, modifiers : M,dependsOn? : Task<any,any>)
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

export function missingArtifacts(task : Task<any,any>) : boolean
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