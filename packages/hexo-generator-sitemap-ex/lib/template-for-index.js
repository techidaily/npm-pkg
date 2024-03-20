'use strict';

const { join } = require('path');
const { readFileSync } = require('fs');
let sitemapTmpl;
const { encodeURL } = require('hexo-util');

module.exports = function(config) {
  const nunjucks = require('nunjucks');
  const env = new nunjucks.Environment(null, {
    autoescape: false,
    watch: false
  });

  env.addFilter('uriencode', str => {
    return encodeURL(str);
  });

  // Extract date from datetime
  env.addFilter('formatDate', input => {
    return input.toISOString().substring(0, 10);
  });

  const sitemapSrc = join(__dirname, '../sitemap-index.xml');
  sitemapTmpl = nunjucks.compile(readFileSync(sitemapSrc, 'utf8'), env);

  return {
    path: 'sitemap-index.xml',
    data: sitemapTmpl
  };
};
