
import fs from 'node:fs';

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

export const reverse = (sourceMap: Object, workDir: string): void => {
  // const { sources, sourcesContent } = sourceMap;
  // const sourceMapSources = sources.map((source: string) => {
  //   return source.replace(workDir, '');
  // }).reverse();
  // const sourceMapSourcesContent = sourcesContent.reverse();
  // sourceMap.sources = sourceMapSources;
  // sourceMap.sourcesContent = sourceMapSourcesContent;
}