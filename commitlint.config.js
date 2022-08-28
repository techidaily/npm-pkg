odule.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
        'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
        'feat', // A new feature（新功能）
        'fix', // A bug fix（bug的修复）
        'refactor', // A code change that neither fixes a bug nor adds a feature（重构，不包括修复bug和添加新功能）
        'docs', // Documentation only changes（修改项目中的文档）
        'chore', // 日常事务 Changes to the build process or auxiliary tools and libraries such as documentation generation（对构建过程或辅助工具和库(如文档生成)的更改）
        'style', // 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
        'revert', // 回滚某个更早之前的提交
        'perf', // A code change that improves performance（性能优化）
        'test', // Adding missing or correcting existing tests（添加或者修改测试代码）
        'type', // 主要目的，对Typescript类型的处理
      ],
    ],
    // "type-case": [0],
    // "type-empty": [0],
    // "scope-empty": [0],
    // "scope-case": [0],
    // "subject-full-stop": [0, "never"],
    // "subject-case": [0, "never"],
    'header-max-length': [2, 'always', 120],
  }
};

// 测试语句
// echo "foo" | .\node_modules\.bin\commitlint
// echo "chore" | .\node_modules\.bin\commitlint
// echo "chore: update" | .\node_modules\.bin\commitlint
// echo "ci: update" | .\node_modules\.bin\commitlint
// echo "type: update" | .\node_modules\.bin\commitlint