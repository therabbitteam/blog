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
      "contentful-metalsmith": {
        "accessToken" : process.env.CONTENTFUL_ACCESS_TOKEN
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
        "config": "config.yml"
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
