
import { dir } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';

interface SourceMap {
  version: number;
  sources: string[];
  sourcesContent: string[];
  names: string[];
}

export const readSourceMapFile = (file: string): SourceMap => {
  const content = fs.readFileSync(file, 'utf-8');
  const sourceMap = JSON.parse(content) as SourceMap;
  return sourceMap;
}

export const reverse = (sourceMap: SourceMap, workDir: string): void => {
  const { sources, sourcesContent } = sourceMap;

  let dirDeep = 0;
  sources.forEach((source, index) => {
    const curLength = source.match(/\.\.\//g)?.length || 0;
    dirDeep = Math.max(curLength, dirDeep);
  });
  const refDir = "0/".repeat(dirDeep);
  sourcesContent.forEach((source, index) => {
    const filePath = path.resolve(workDir, refDir, sources[index]);
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, sourcesContent[index]);
  });
}