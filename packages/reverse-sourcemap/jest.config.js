module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        // 解决不支持 空值合并 Nullish coalescing operator
        // 参看：https://github.com/gatewayapps/grayskull/issues/308
        target: 'ES2019'
      }
    },
  },

  // 设置模块名称的映射
  // see: https://divotion.com/blog/how-to-configure-import-aliases-in-vite-typescript-and-jest
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    // 将发布包映射，方便测试，构建后的包，是否正常
    // "@mega-apps/postcss-theme-helper": "<rootDir>",
  }
}
