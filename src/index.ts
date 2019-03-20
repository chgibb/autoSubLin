import {Pipeline} from "./lib/pipeline";

let pipeline = new Pipeline("ht2-024281e4ae144a27aeca510b2fb5bbba_gdc_realn.bam.sam-mapped.bam");
pipeline.execute();
pipeline.prune();