# hexo-generator-sitemap-ex

Generate sitemap and sitemap index files for search engines.

## Install

``` bash
npm install hexo-generator-sitemap-ex --save
```

or

``` bash
yarn add hexo-generator-sitemap-ex
```

or

``` bash
pnpm add hexo-generator-sitemap-ex
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
- **gzip** - Generate sitemap.xml.gz (Default: `false`)
- **max_urls_per_sitemap** - Maximum number of URLs per sitemap file. (Default: 50000)

Will generate sitemap.xml and sitemap.xml.gz in the public folder.

If has sitemap index file, will generate `sitemap_index.xml` and `sitemap_index.xml.gz` in the public folder.

See:

- <https://developers.google.cn/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=zh-tw#general-guidelines>
- <https://developers.google.cn/search/docs/crawling-indexing/sitemaps/large-sitemaps?hl=zh-tw>

You can see the [https://techidaily.com](https://techidaily.com) for example.

Download the [https://techidaily.com](https://techidaily.com)/sitemap.xml.gz file and open it with a text editor.

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

## Donate

<br/>
<a href="https://www.paypal.com/ncp/payment/FBZEL5WWHC7CS"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" style="height: 41px !important; width: 174px !important; box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important; -webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important; "  target="_blank"></a>
<br/><br/>