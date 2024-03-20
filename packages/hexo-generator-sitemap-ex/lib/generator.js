'use strict';

const micromatch = require('micromatch');
const template = require('./template');
const templateForIndex = require('./template-for-index');

module.exports = function(locals) {
  const { config } = this;
  const { sitemap, skip_render } = config;
  const { tags: tagsCfg, categories: catsCfg, siteUrl, gzip: enableGZip } = sitemap;
  const skipRenderList = [
    '**/*.js',
    '**/*.css'
  ];

  if (Array.isArray(skip_render)) {
    skipRenderList.push(...skip_render);
  } else if (typeof skip_render === 'string') {
    if (skip_render.length > 0) {
      skipRenderList.push(skip_render);
    }
  }

  const posts = [].concat(locals.posts.toArray(), locals.pages.toArray())
    .filter(post => {
      return post.sitemap !== false && !isMatch(post.source, skipRenderList);
    })
    .sort((a, b) => {
      return b.updated - a.updated;
    });

  if (posts.length <= 0) {
    sitemap.rel = false;
    return;
  }

  const postsGroup = [];

  while (posts.length > 0) {
    postsGroup.push(posts.splice(0, 50000));
  }

  const sitemapFileNames = [];

  const allResList = [];
  for (let indexOfSiteMaps = 0; indexOfSiteMaps < postsGroup.length; indexOfSiteMaps++) {
    const gzResList = [];

    const postList = postsGroup[indexOfSiteMaps];

    const resList = template(config, indexOfSiteMaps);
    for (const i in resList) {
      resList[i].data = resList[i].data.render({
        config,
        posts: postList,
        sNow: new Date(),
        tags: tagsCfg ? locals.tags.toArray() : [],
        categories: catsCfg ? locals.categories.toArray() : []
      });

      const zipExt = enableGZip ? '.gz' : '';
      if (enableGZip) {
        const zlib = require('node:zlib');
        gzResList.push({
          path: `${resList[i].path}${zipExt}`,
          data: zlib.gzipSync(resList[i].data)
        });
      }


      if (siteUrl[siteUrl.length - 1] === '/') {
        sitemapFileNames.push(`${siteUrl}${resList[i].path}${zipExt}`);
      } else {
        sitemapFileNames.push(`${siteUrl}/${resList[i].path}${zipExt}`);
      }
    }

    allResList.push(...resList, ...gzResList);
  }

  if (postsGroup.length > 1) {
    const res = templateForIndex(config);
    res.data = res.data.render({
      config,
      sitemaps: sitemapFileNames
    });

    if (enableGZip) {
      const zlib = require('node:zlib');
      const zipExt = enableGZip ? '.gz' : '';
      allResList.push({
        path: `${res.path}${zipExt}`,
        data: zlib.gzipSync(res.data)
      });
    }

    allResList.push(res);
  }

  return allResList;
};

function isMatch(path, patterns) {
  return micromatch.isMatch(path, patterns);
}
