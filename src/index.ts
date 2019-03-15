import {BamToSam} from "./lib/bamToSam";

let index = new BamToSam('ht2-024281e4ae144a27aeca510b2fb5bbba_gdc_realn.bam.sam-mapped.bam','out/raw/ht2-024281e4ae144a27aeca510b2fb5bbba_gdc_realn.bam.sam-mapped.bam.sam');

index.execute();