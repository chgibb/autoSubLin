import * as fs from "fs";

const chalk = require("chalk");

import {Task} from "./task";

import {BamToFastq} from "./bamToFastq";
import {DataDir} from "./dataDir";
import {BamToFastqUnpaired} from "./bamToFastqUnpaired";
import {Hisat2AllSubLinAlign} from "./hisat2AllSubLin";
import {Hisat2AllSubLinAlignUnpaired} from "./hisat2AllSubLinUnpaired";
import {Bowtie2AllSubLinAlignUnpaired} from "./bowtie2AllSubLinUnpaired";
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
            new Bowtie2AllSubLinAlignUnpaired(`out/raw/${input}_readUnpaired.fq`,`out/raw/${input}.allsublinaln.unpaired.bowtie2.sam`),
        ];

        this.results = [
            new GenerateReports(`out/raw/${input}.allsublinaln.sam`),
            new GenerateReports(`out/raw/${input}.allsublinaln.unpaired.sam`),
            new GenerateReports(`out/raw/${input}.allsublinaln.bowtie2.sam`),
            new GenerateReports(`out/raw/${input}.allsublinaln.unpaired.bowtie2.sam`)
        ];
    }

    public showReport(file : string) : boolean
    {
        const count = parseInt(fs.readFileSync(`${file}.readCount`).toString());

        let sublinResults : Array<{subLin : string,count : number}> = new Array();

        sublinResults.push({
            subLin : "A1",
            count : parseInt(fs.readFileSync(`${file}.A1`).toString())
        });

        sublinResults.push({
            subLin : "A2",
            count : parseInt(fs.readFileSync(`${file}.A2`).toString())
        });

        sublinResults.push({
            subLin : "A3",
            count : parseInt(fs.readFileSync(`${file}.A3`).toString())
        });

        sublinResults.push({
            subLin : "A4",
            count : parseInt(fs.readFileSync(`${file}.A4`).toString())
        });

        sublinResults.push({
            subLin : "B1",
            count : parseInt(fs.readFileSync(`${file}.B1`).toString())
        });

        sublinResults.push({
            subLin : "B2",
            count : parseInt(fs.readFileSync(`${file}.B2`).toString())
        });

        sublinResults.push({
            subLin : "B3",
            count : parseInt(fs.readFileSync(`${file}.B3`).toString())
        });

        sublinResults.push({
            subLin : "B4",
            count : parseInt(fs.readFileSync(`${file}.B4`).toString())
        });

        sublinResults.push({
            subLin : "C1",
            count : parseInt(fs.readFileSync(`${file}.C1`).toString())
        });

        sublinResults.push({
            subLin : "C2",
            count : parseInt(fs.readFileSync(`${file}.C2`).toString())
        });

        sublinResults.push({
            subLin : "C3",
            count : parseInt(fs.readFileSync(`${file}.C3`).toString())
        });

        sublinResults.push({
            subLin : "C4",
            count : parseInt(fs.readFileSync(`${file}.C4`).toString())
        });

        sublinResults.push({
            subLin : "D1",
            count : parseInt(fs.readFileSync(`${file}.D1`).toString())
        });

        sublinResults.push({
            subLin : "D2",
            count : parseInt(fs.readFileSync(`${file}.D2`).toString())
        });

        sublinResults.push({
            subLin : "D3",
            count : parseInt(fs.readFileSync(`${file}.D3`).toString())
        });

        sublinResults.push({
            subLin : "D4",
            count : parseInt(fs.readFileSync(`${file}.D4`).toString())
        });
        
        console.log(`   Total: ${chalk.yellow(`${count}`)}`);

        for(let i = 0; i!= sublinResults.length; ++i)
        {
            console.log(`       ${chalk.magenta(`HPV16 ${sublinResults[i].subLin}`)} ${chalk.blue(`${sublinResults[i].count}`)} -> ${chalk.green(`${(sublinResults[i].count/count)*100}%`)}`);
        }

        return true;
    }

    public showReports() : boolean
    {
        console.log(this.input);
        console.log("Hisat2 Paired");
        this.showReport(`out/raw/${this.input}.allsublinaln.sam`);
        console.log();

        console.log("Hisat2 Unpaired");
        this.showReport(`out/raw/${this.input}.allsublinaln.unpaired.sam`);
        console.log();

        console.log("Bowtie2 Paired --sensitive-local");
        this.showReport(`out/raw/${this.input}.allsublinaln.bowtie2.sam`);
        console.log();

        console.log("Bowtie2 Unpaired --sensitive-local");
        this.showReport(`out/raw/${this.input}.allsublinaln.unpaired.bowtie2.sam`);
        console.log();

        return true;
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