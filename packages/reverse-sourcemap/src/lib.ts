
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

export const reverse = (sourceMap: SourceMap, workDir: string): void => {
  const { sources, sourcesContent } = sourceMap;
  // get sources files work dir path
  const workDirPath = sources[0].split('/').slice(0, -1).join('/');
  // get sources files relative path
  const sourcesRelativePath = sources.map(source => source.replace(workDirPath, ''));




  const sourceMapSources = sources.map((source: string) => {
    return source.replace(workDir, '');
  }).reverse();
  const sourceMapSourcesContent = sourcesContent.reverse();
  sourceMap.sources = sourceMapSources;
  sourceMap.sourcesContent = sourceMapSourcesContent;
}