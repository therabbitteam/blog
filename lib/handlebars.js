var HandlebarsLayouts = require('handlebars-layouts');
var moment = require('moment');

module.exports = function(Handlebars) {

  Handlebars.registerHelper(HandlebarsLayouts(Handlebars));

  Handlebars.registerHelper('json', function(obj) {
    return JSON.stringify(obj);
  });

  Handlebars.registerHelper('removeIndex', function(url) {
    return url.replace('index.html', '');
  });

  Handlebars.registerHelper('formatDate', function(context, options) {

    var format = options.hash.format || "YYYY-MM-DD";

    if (context === "now") {
      context = new Date();
    }

    var result = moment(context).locale("vi").format(format);

    if (options.hash.fromNow) {
      result.fromNow();
    }

    return result;
  });

  Handlebars.registerHelper('image', function(context, options) {
    return require('../layouts/helpers/image')(context, options);
  });

  // http://stackoverflow.com/a/16315366/3976412
  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });
};
