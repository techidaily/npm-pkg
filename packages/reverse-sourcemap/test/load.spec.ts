import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from '@jest/globals';
import { readSourceMapFile, reverse } from '@/lib';

beforeEach(() => {
  fs.rmdirSync('@/../tmp', { recursive: true });
})

afterEach(() => {
  fs.rmdirSync('@/../tmp', { recursive: true });
})

describe('readSourceMapFile', () => {
  test('load', () => {
    const jsonObj = readSourceMapFile('@/../test/fixtures/@rspc/client/index.mjs.map');
    expect(jsonObj.version).toBe(3);
    expect(jsonObj.sources.length).toBeGreaterThanOrEqual(1);
    expect(jsonObj.sourcesContent.length).toBeGreaterThanOrEqual(1);
  })
})

describe('reverse a source map file', () => {
  test('reverse @rspc/client/index.mjs.map file', () => {
    const file = '@/../test/fixtures/@rspc/client/index.mjs.map';
    const workDir = '@/../tmp/';
    const jsonObj = readSourceMapFile(file);
    reverse(jsonObj, workDir);


    expect(fs.existsSync('@/../tmp/src/client.ts')).toBeTruthy();
    expect(fs.existsSync('@/../tmp/src/transport.ts')).toBeTruthy();
    expect(fs.existsSync('@/../tmp/src/react.tsx')).toBeTruthy();
    expect(fs.existsSync('@/../tmp/src/error.ts')).toBeTruthy();
  })
})