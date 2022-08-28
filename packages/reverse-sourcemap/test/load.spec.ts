import { describe, expect, test } from '@jest/globals';

import { readSourceMapFile } from '@/lib';

describe('readSourceMapFile', () => {
  test('load', () => {
    const jsonObj = readSourceMapFile('@/../test/fixtures/@rspc/client/index.mjs.map');
    expect(jsonObj.version).toBe(3);
    expect(jsonObj.sources.length).toBeGreaterThanOrEqual(1);
    expect(jsonObj.sourcesContent.length).toBeGreaterThanOrEqual(1);
  })
})