Ext.define('Magice.Cloud.view.sshkey.Model', {
  extend: 'Magice.base.ViewModel',
  alias: 'viewmodel.sshkeys',
  data: {
    maskingsshkeys: false
  },
  stores: {
    sshkeys: {
      model: 'Magice.Cloud.model.Key',
      url: '/cloud/keys',
      autoLoad: true
    }
  },
  formulas: {
    record: {
      bind: {
        bindTo: '{sshkeylist.selection}',
        deep: true
      },
      get: function(rec) {
        return rec;
      },
      set: function(rec) {
        return console.log(arguments);
      }
    },
    isPhantom: {
      bind: {
        bindTo: '{record}'
      },
      get: function(rec) {
        return rec && rec.phantom;
      }
    }
  }
});
