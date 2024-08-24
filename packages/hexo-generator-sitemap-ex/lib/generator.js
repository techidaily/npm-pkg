'use strict';

const { join, extname, basename } = require('path');
const micromatch = require('micromatch');
const template = require('./template');
const templateForIndex = require('./template-for-index');


module.exports = function(locals) {
  const { config } = this;
  const { sitemap, skip_render } = config;
  const { tags: tagsCfg, categories: catsCfg, site_url, gzip: enableGZip, max_urls_per_sitemap = 21000, path: siteMapFileCfg } = sitemap;
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

  const isIncludeXMLSiteMap = [...siteMapFileCfg || []].filter(v => extname(v) === '.xml').length > 0;

  const posts = [].concat(locals.posts.toArray(), locals.pages.toArray())
    .filter(post => {
      return post.sitemap !== false && !isMatch(post.source, skipRenderList);
    })
    .sort((a, b) => {
      // 按照旧的在前，新的在后
      return a.updated - b.updated;
    });

  if (posts.length <= 0) {
    sitemap.rel = false;
    return;
  }

  const postsGroup = [];

  while (posts.length > 0) {
    postsGroup.push(posts.splice(0, Math.max(max_urls_per_sitemap - 1, 0))); // Safe way to avoid infinite loop
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

      if (isIncludeXMLSiteMap) {
        if (extname(resList[i].path) === '.xml') {
          if (site_url[site_url.length - 1] === '/') {
            sitemapFileNames.push(`${site_url}${resList[i].path}${zipExt}`);
          } else {
            sitemapFileNames.push(`${site_url}/${resList[i].path}${zipExt}`);
          }
        }
      } else {
        if (site_url[site_url.length - 1] === '/') {
          sitemapFileNames.push(`${site_url}${resList[i].path}${zipExt}`);
        } else {
          sitemapFileNames.push(`${site_url}/${resList[i].path}${zipExt}`);
        }
      }
    }

    allResList.push(...resList, ...gzResList);
  }

  if (postsGroup.length > 0) {
    const res = templateForIndex(config);
    res.data = res.data.render({
      config,
      sitemaps: sitemapFileNames,
      // date, now, use W3C Datetime format
      sNow: new Date().toISOString()
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
