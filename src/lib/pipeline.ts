import {Task} from "./task";

import {BamToFastq} from "./bamToFastq";
import {DataDir} from "./dataDir";
import {BamToFastqUnpaired} from "./bamToFastqUnpaired";
import {Hisat2AllSubLinAlign} from "./hisat2AllSubLin";
import {Hisat2AllSubLinAlignUnpaired} from "./hisat2AllSubLinUnpaired";
import {Bowtie22AllSubLinAlignUnpaired} from "./bowtie2AllSubLinUnpaired";
import {Bowtie2AllSubLinAlign} from "./bowtie2AllSubLin";
import {GenerateReports} from "./generateReports";

export class Pipeline extends Task<string,undefined>
{
    public name : string;
    public execStrings : Array<string> = [];

    public constructor(input : string)
    {
        super(input,undefined);

        this.name = `Pipelining ${input}`;
        this.dependsOn = [
            new DataDir(),
            new BamToFastq(input,[`out/raw/${input}_read1.fq`,`out/raw/${input}_read2.fq`]),
            new BamToFastqUnpaired(input,`out/raw/${input}_readUnpaired.fq`),
            new Hisat2AllSubLinAlign([`out/raw/${input}_read1.fq`,`out/raw/${input}_read2.fq`],`out/raw/${input}.allsublinaln.sam`),
            new Hisat2AllSubLinAlignUnpaired(`out/raw/${input}_readUnpaired.fq`,`out/raw/${input}.allsublinaln.unpaired.sam`),
            new Bowtie2AllSubLinAlign([`out/raw/${input}_read1.fq`,`out/raw/${input}_read2.fq`],`out/raw/${input}.allsublinaln.bowtie2.sam`),
            new Bowtie22AllSubLinAlignUnpaired(`out/raw/${input}_readUnpaired.fq`,`out/raw/${input}.allsublinaln.unpaired.bowtie2.sam`),

            new GenerateReports(`out/raw/${input}.allsublinaln.sam`)
        ];
    }

    public artifacts() : Array<string>
    {
        return [];
    }

    public run() : Promise<boolean>
    {
        return new Promise<boolean>((resolve) => 
        {
            resolve(true);
        });
    }
}