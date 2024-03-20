# hexo-generator-sitemap-ex

Generate sitemap and sitemap index files for search engines.

## Install

``` bash
$ npm install hexo-generator-sitemap-ex --save
```

or

``` bash
$ yarn add hexo-generator-sitemap-ex
```

or

``` bash
$ pnpm add hexo-generator-sitemap-ex
```


- Hexo >=5: 3.x
- Hexo 4: 2.x
- Hexo 3: 1.x
- Hexo 2: 0.x

## Options

You can configure this plugin in `_config.yml`.

``` yaml
sitemap:
  path: 
    - sitemap.xml
    - sitemap.txt
  template: ./sitemap_template.xml
  template_txt: ./sitemap_template.txt
  rel: false
  tags: true
  categories: true
  site_url: https://www.example.com
  gzip: true,
  max_urls_per_sitemap: 50000
```

- **path** - Sitemap path. (Default: sitemap.xml)
- **template** - Custom template path. This file will be used to generate sitemap.xml (See [default xml template](/sitemap.xml))
- **template_txt** - Custom template path. This file will be used to generate sitemap.txt (See [default txt template](/sitemap.txt))
- **rel** - Add [`rel-sitemap`](http://microformats.org/wiki/rel-sitemap) to the site's header. (Default: `false`)
- **tags** - Add site's tags
- **categories** - Add site's categories
- **site_url** - Site URL. (Default: config.url)
- **gzip** - Generate sitemap.xml.gz (Default: `true`)
- **max_urls_per_sitemap** - Maximum number of URLs per sitemap file. (Default: 50000)

## Exclude Posts/Pages

Add `sitemap: false` to the post/page's front matter.

``` yml
---
title: lorem ipsum
date: 2020-01-02
sitemap: false
---
```

## Notes

- This plugin will not generate sitemap files when `hexo` is in `draft` mode.
- This plugin will not generate sitemap files when `hexo` is in `server` mode.
- This plugin will not generate sitemap files when `hexo` is in `generate` mode and `--no-sitemap` is set.