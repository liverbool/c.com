Ext.define('Magice.Cloud.view.domain.Model', {
  extend: 'Magice.base.ViewModel',
  alias: 'viewmodel.domains',
  data: {
    maskingsshkeys: false
  },
  stores: {
    domains: {
      model: 'Magice.Cloud.model.Domain',
      url: '/cloud/domains',
      autoLoad: true
    },
    records: {
      model: 'Magice.Cloud.model.Record',
      url: '/cloud/dns/[domain]',
      groupField: 'type'
    }
  },
  formulas: {
    record: {
      bind: {
        bindTo: '{domainlist.selection}',
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
