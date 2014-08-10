Ext.define('Magice.base.ViewController', {
  extend: 'Ext.app.ViewController',
  init: function() {
    return this.model = this.getViewModel();
  },
  lookup: function(key, valueTo) {
    var cmp;
    cmp = this.lookupReference(key);
    if (cmp && cmp.setValue && valueTo !== void 0) {
      cmp.setValue(valueTo);
    }
    return cmp;
  },
  load: function(store, callback) {
    var opts;
    store = this.model.get(store);
    if (!store) {
      return;
    }
    if (callback) {
      opts = Ext.isObject(callback) ? callback : {
        callback: callback
      };
    } else {
      opts = null;
    }
    store.load(opts);
    return store;
  },
  loadData: function(store, data) {
    return this.model.get(store).loadData(data);
  },
  clearData: function(store) {
    return this.model.get(store).removeAll();
  },
  callAction: function() {
    var args, fn;
    args = Array.prototype.slice.call(arguments);
    fn = this[args.shift()];
    if (!args.length) {
      args = void 0;
    }
    return fn.apply(this, args);
  },
  operation: function(selector) {
    console.log(selector);
    console.log(this.view.down(selector));
    console.log(this.view.down(selector).getOperation());
    return this.view.down(selector).getOperation();
  },
  showItems: function(owner, items) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      _results.push(owner.down(item).show());
    }
    return _results;
  },
  hideItems: function(owner, items) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      _results.push(owner.down(item).hide());
    }
    return _results;
  }
});
