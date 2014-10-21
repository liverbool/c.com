
/*
 The main application class. An instance of this class is created by app.js when it calls
 Ext.application(). This is the ideal place to handle application launch and initialization
 details.
 */
var MAGICE_URL, endsWith, humanize, sprintf, vsprintf;

MAGICE_URL = 'http://c.com/web';

sprintf = _.string.sprintf;

vsprintf = _.string.vsprintf;

endsWith = _.string.endsWith;

Ext.define('Magice.Application', {
  extend: 'Ext.app.Application',
  name: 'Magice',
  defaultToken: '!info',
  viewportId: 'viewport',
  uses: ['Ext.window.Toast'],
  requires: ['Glyph', 'Ext.bugfix.*', 'Ext.override.*', 'Ext.extend.*', 'Ext.ux.jp.panel.TopBar'],
  views: ['Magice.Main.view.View'],
  launch: function() {
    if (Ext.browser.is.Gecko && Ext.browser.version.major < 28) {
      return Ext.getBody().addCls('x-flex-wrap-broken');
    }
  },
  handleForbidden: function(conn, response, options, eOpts) {
    return console.log(response.json);
  },
  statics: {
    URL: MAGICE_URL,
    path: function(path) {
      return Magice.Application.URL + path;
    },
    setLoading: function(status) {
      if (Magice.Application.viewport) {
        return Magice.Application.viewport.viewModel.set('loading', status);
      }
    }
  }
});

humanize = {
  text: function(v) {
    return _.string.humanize(v);
  },
  duration: function(v) {
    if (v) {
      return moment.duration(v).humanize() + ' ago';
    } else {
      return '';
    }
  },
  date: function(v, format) {
    if (v) {
      return moment(v).format('ll');
    } else {
      return '';
    }
  },
  datetime: function(v, format) {
    if (v) {
      return moment(v).format('lll');
    } else {
      return '';
    }
  },
  diff: function(a, b) {
    console.info('this is contrains a bug!');
    if (!a || !b) {
      return null;
    } else {
      return moment.duration(moment(b).diff(a)).humanize();
    }
  },
  format: function(v, format, input) {
    if (input === 'mb') {
      v = v * Math.pow(1024, 2);
    }
    return numeral(v).format(format);
  }
};

Ext.util.ObjectId = function(val) {
  if (typeof val === 'object') {
    return val.id;
  } else {
    return null;
  }
};

Ext.util.inArray = function(value, collection) {
  if (!collection) {
    return false;
  }
  return collection.indexOf(value) !== -1;
};

Ext.util.bindParameter = function(str, parameter) {
  if (!parameter) {
    return str;
  }
  return str = str.replace(/\[\w+\]/g, function(k) {
    var key;
    key = k.replace('[', '');
    key = key.replace(']', '');
    return parameter[key] || k;
  });
};

Ext.util.isFullyUrl = function(str) {
  if (/^\/\/.*/.test(str || /^http(s?)\:\/\/.*/.test(str))) {
    return true;
  }
};

Ext.Ajax.setDefaultHeaders({
  "X-Requested-With-Sencha": true
});

Ext.Ajax.on('beforerequest', function(conn, options) {
  var parameters;
  Magice.Application.setLoading(true);
  if (options.parameters) {
    parameters = options.parameters;
  }
  if (options.operation && options.operation.config) {
    parameters = options.operation.config.parameters;
  }
  if (parameters) {
    options.url = Ext.util.bindParameter(options.url, parameters);
  }
  console.log(arguments);
  if (!Ext.util.isFullyUrl(options.url)) {
    options.url = Magice.Application.path(options.url);
  }
  if (options.operation && options.operation.config.background) {
    return console.info('Running background process.');
  }
});

Ext.Ajax.on('requestcomplete', function() {
  return Magice.Application.setLoading(false);
});


/*

Ext.Ajax.on 'requestexception', (conn, response, options, eOpts) ->
    Magice.Application.setLoading no

     * convert json string response to object
    if response.responseText
        response.json = Ext.decode(response.responseText)

     * exception handlers
    switch response.status
         * AccessDeniedException
        when 403 then @handleForbidden.apply Magice.Application, arguments
        else console.log arguments
 */
