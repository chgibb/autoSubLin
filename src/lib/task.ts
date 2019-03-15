import * as fs from "fs";

export abstract class Task<I,M>
{
    public dependsOn? : Array<Task<any,any>>;
    public abstract name : string;
    public input : I;
    public modifiers : M;

    public constructor(inputs : I, modifiers : M,dependsOn? : Array<Task<any,any>>)
    {
        this.dependsOn = dependsOn;
        this.input = inputs;
        this.modifiers = modifiers;
    }

    public abstract artifacts() : Array<string>;
    public abstract run() : Promise<boolean>;
    
    public execute() : Promise<boolean>
    {
        return new Promise<boolean>(async (resolve : (value : boolean) => void,reject : (reason : string) => void) => {
            if(this.dependsOn)
            {
                for(let i = 0; i != this.dependsOn.length; ++i)
                {
                    await this.dependsOn[i].execute();
                }
            }
            
            if(missingArtifacts(this))
            {
                if(this.artifacts.length != 0)
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
    if(artifacts.length == 0)
        return true;

    for(let i = 0; i != artifacts.length; ++i)
    {
        if(!fs.existsSync(artifacts[i]))
        {
            return true;
        }
    }

    return false;
}