// tsup.config.ts
import { defineConfig } from 'tsup'
import { name as pkgName } from './package.json';

// 公共配置内容，其他的设置项，通过外部 tsup 特别指定，这样可以做到更灵活生成相应内容
// 例如：tsup src/unplugin/index.ts --target esnext --format esm,cjs -d dist/unplugin
export default defineConfig({
  splitting: false,
  sourcemap: false,
  clean: false,
  dts: true,
  minify: true,

  /**
   * shims option is false by default:
   * If you're dual-publishing (i.e. --format esm,cjs)
   * and using platform specific API like import.meta.url, __dirname and __filename,
   * you need to manually enable --shims flag now, because import.meta.url won't work in a cjs module,
   * and __dirname, __filename won't work in an esm module.
   */
  shims: true,

  external: [
    pkgName
  ]
})
