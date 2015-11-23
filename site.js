var linkTo = require('./layouts/helpers/linkTo');
var path = require('path');
  //haha
module.exports = {
  "vendor": [],
  "scripts": {},
  "styles": {
    "prefix": ["> 1%", "last 2 versions", "IE >= 9"],
    "include": []
  },
  "metalsmith": {
    "metadata": {
      "site": {
        "url": "http://beta.rabbitlearn.com",
      }
    },
    "config": {
      "contentRoot": "./content",
      "assetRoot": "./sources",
      "scriptRoot": "./scripts",
      "styleRoot": "./styles",
      "layoutRoot": "./layouts",
      "destRoot": "./build"
    },
    "plugins": {
      "metalsmith-prismic": {
        "url": "https://rabbitlearn.prismic.io/api",
        "linkResolver": function (ctx, doc) {
          if (doc.isBroken || !ctx.path) return;

          if (doc.data) {
            return linkTo(doc);
          }
          // create file based off of type, id and the filename (extracted from the full path)
          return '/' + doc.type + '/' + doc.id + '/' +  ctx.path.replace(/^.*(\\|\/|\:)/, '');
        }
      },
      "./lib/map-data-to-file-metadata": {},
      "metalsmith-markdown": {
        "smartypants": true,
        "smartLists": true,
        "gfm": true,
        "tables": true
      },
      "metalsmith-metadata": {
        "config": "config\\config.yml".replace(/(\/|\\)/g, path.sep),
        "headerLinks": "config\\header-link.yml".replace(/(\/|\\)/g, path.sep),
        "lang": "languages\\vi.yml".replace(/(\/|\\)/g, path.sep)
      },
      "metalsmith-register-helpers": {
        "directory": "./layouts/helpers"
      },
      "metalsmith-collections": {
        "blog": {
          "sortBy": "date",
          "reverse": true
        }
      },
      "metalsmith-permalinks": {
        "pattern": ":collection/:slug",
        "relative": false
      },
      "metalsmith-related": {
        'terms': 5,
        'max': 5,
        'threshold': 0,
        'pattern': '**/index.html',
        'text': function(doc) {
          return String(doc.contents);
        }
      },
      "metalsmith-pagination": {
        "collections.blog": {
          "perPage": 5,
          "layout": "index.html",
          "first": "index.html",
          "noPageOne": true,
          "path": "page/:num/index.html",
          "pageMetadata": {
            "title": "Trang chủ"
          }
        }
      },
      "metalsmith-tags": {
        "handle": "tags",
        "path": "tag/:tag/index.html",
        "pathPage": "tag/:tag/:num/index.html",
        "perPage": 5,
        "layout": "index.html",
        "sortBy": "date",
        "reverse": true,
        "skipMetadata": false,
        "slug": {
          "mode": "rfc3986"
        }
      },
      "metalsmith-wordcloud": {
        category: 'tags',
        reverse: false,
        path: '/tag'
      },
      "./lib/set-title-for-tag-page": {},
      "metalsmith-layouts": {
        "engine": "handlebars",
        "directory": "./layouts",
        "partials": "./layouts/partials"
      },
      "metalsmith-assets": {
        "source": "./sources",
        "destination": "./"
      },
      "metalsmith-html-minifier": {
        "_metalsmith_if": "production",
        "removeAttributeQuotes": false,
        "keepClosingSlash": true
      }
    }
  }
}
