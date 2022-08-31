import { program } from 'commander';
import { readSourceMapFile, reverse } from './lib';

program
  .option('-o, --outDir <dir>', 'output directory', process.cwd())
  .option('-f, --file <file>', 'source map file')
  .parse(process.argv);

const { outDir, file } = program.opts();
if (!outDir || !file) {
  console.log('outDir and file are required');
  process.exit(1);
}

const sourceMap = readSourceMapFile(file);
reverse(sourceMap, outDir);