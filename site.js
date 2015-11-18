var linkTo = require('./layouts/helpers/linkTo');

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
        "url": "https://github.com/evocode/metalsmith-base",
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
      //"metalsmith-drafts": {},
      "metalsmith-markdown": {
        "smartypants": true,
        "smartLists": true,
        "gfm": true,
        "tables": true
      },
      //"metalsmith-excerpts": {},
      "metalsmith-metadata": {
        "sitedata": "config.yml"
      },
      "metalsmith-register-helpers": {
        "directory": "./layouts/helpers"
      },
      "metalsmith-permalinks": {
        "pattern": ":collection/:title"
      },
      //"metalsmith-collections": {
      //  "blog": {
      //    "sortBy": "date",
      //    "reverse": true
      //  }
      //},
      //"metalsmith-pagination": {
      //  "collections.blog": {
      //    "perPage": 6,
      //    "layout": "blog.html",
      //    "first": "blog/index.html",
      //    "noPageOne": true,
      //    "path": "blog/:num/index.html"
      //  }
      //},
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
