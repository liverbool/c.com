Ext.define('Ext.mixins.data.Proxy', {
  findApp: function() {
    var ns;
    ns = (this.entityName || this.model.entityName || this.$className).split('.');
    if (!window[ns[0]]) {
      return;
    }
    return window[ns[0]]['Application'];
  },
  isFullyUrl: function(str) {
    if (/^\/\/.*/.test(str || /^http(s?)\:\/\/.*/.test(str))) {
      return true;
    }
  },
  appendURL: function(apis) {
    var APP, key, path;
    APP = this.findApp();
    if (APP && APP['URL']) {
      if (typeof apis === 'string') {
        if (this.isFullyUrl(apis)) {
          return apis;
        }
        return APP['URL'] + apis;
      }
      for (key in apis) {
        path = apis[key];
        if (!this.isFullyUrl(path)) {
          apis[key] = APP['URL'] + path;
        }
      }
    }
    return apis;
  },
  bindParameter: function(str, parameter) {
    if (!parameter) {
      return str;
    }
    return str = str.replace(/\[\w+\]/g, function(k) {
      var key;
      key = k.replace('[', '');
      key = key.replace(']', '');
      return parameter[key] || k;
    });
  },
  bindUrl: function(parameter) {
    var url;
    url = this.url || (this.api ? this.api.read : void 0);
    return this.proxy.setUrl(this.bindParameter(this.appendURL(url), parameter));
  },
  bindApi: function(parameter) {
    var api, key, url, _ref;
    api = {};
    _ref = this.api;
    for (key in _ref) {
      url = _ref[key];
      api[key] = this.bindParameter(this.appendURL(url), parameter);
    }
    return this.proxy.setApi(api);
  }
});
