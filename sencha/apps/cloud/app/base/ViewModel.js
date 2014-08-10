Ext.define('Magice.base.ViewModel', {
  extend: 'Ext.app.ViewModel',
  create: function(model, data) {
    var len, ns;
    ns = this.$className.split('.');
    len = ns.length;
    ns[len - 1] = model;
    ns[len - 2] = 'model';
    return Ext.create(ns.join('.'), data);
  },
  save: function(record, options, callback) {
    if (typeof record === 'string') {
      record = this.get(record);
    }
    record.save(options);
    if (callback) {
      return record.on(callback);
    }
  }
});
