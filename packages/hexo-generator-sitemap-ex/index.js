/* global hexo */
'use strict';

const { extname } = require('path');

hexo.config.sitemap = Object.assign({
  path: ['sitemap.xml', 'sitemap.txt'],
  rel: false,
  tags: true,
  categories: true,
  site_url: hexo.config.url,
  gzip: false,
  max_urls_per_sitemap: 500
}, hexo.config.sitemap);

const config = hexo.config.sitemap;

if (typeof config.path === 'string' && !extname(config.path)) {
  config.path += '.xml';
}

hexo.extend.generator.register('sitemap', require('./lib/generator'));

if (config.rel === true) {
  hexo.extend.filter.register('after_render:html', require('./lib/rel'));
}
