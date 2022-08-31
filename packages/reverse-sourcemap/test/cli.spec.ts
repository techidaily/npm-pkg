import fs from "node:fs";
import path from "node:path";
import child_process from "node:child_process";
import { describe, expect, test } from '@jest/globals';

beforeEach(() => {
  fs.rmdirSync('@/../tmp', { recursive: true });
})

afterEach(() => {
  fs.rmdirSync('@/../tmp', { recursive: true });
})

describe('cli', () => {
  test('run', () => {
    child_process.execSync(`node dist/cli.js -o ./tmp -f ./test/fixtures/@rspc/client/index.mjs.map`, {
      cwd: path.resolve(__dirname, '..'),
    });

    expect(fs.existsSync('@/../tmp/src/client.ts')).toBeTruthy();
    expect(fs.existsSync('@/../tmp/src/transport.ts')).toBeTruthy();
    expect(fs.existsSync('@/../tmp/src/react.tsx')).toBeTruthy();
    expect(fs.existsSync('@/../tmp/src/error.ts')).toBeTruthy();
  })
})