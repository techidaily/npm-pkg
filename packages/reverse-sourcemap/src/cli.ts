import { program } from 'commander';
import { readSourceMapFile, reverse } from './lib';

program
  .option('-w, --workDir <dir>', 'working directory', process.cwd())
  .option('-f, --file <file>', 'source map file')
  .parse(process.argv);

const { workDir, file } = program.opts();
if (!workDir || !file) {
  console.log('workDir and file are required');
  process.exit(1);
}

const sourceMap = readSourceMapFile(file);
reverse(sourceMap, workDir);