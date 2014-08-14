Ext.define('Magice.Cloud.view.domain.Controller', {
  extend: 'Magice.base.ViewController',
  alias: 'controller.domains',
  locale: {
    domain: {
      destroyConfirm: 'This will remove your domain. Do you wish to proceed?'
    },
    dns: {
      destroyConfirm: 'This will remove your records. Do you wish to proceed?'
    }
  },
  takeAction: function(name, config) {
    config.locks = this.view;
    return this.view.add(Ext.widget(name, config)).show();
  },
  record: function() {
    var rs;
    rs = this.lookup('domainlist').getSelection();
    if (rs.length) {
      return rs[0];
    } else {
      return null;
    }
  },
  'on.refresh': function() {
    return this.model.get('domains').reload();
  },
  'on.create': function(btn) {
    var rs, selModel;
    selModel = this.lookup('domainlist').selModel;
    if (btn.create) {
      selModel.deselectAll();
    }
    this.view.add(Ext.widget('domain-form')).show();
    if (!this.record()) {
      rs = this.model.get('domains').add(new Magice.Cloud.model.Domain);
      return selModel.select(rs);
    }
  },
  'on.close': function() {
    if (this.model.get('isPhantom')) {
      return this.model.get('domains').remove(this.record());
    }
  },
  'on.destroy': function(btn) {
    return this.record().erase(this.locale.domain.destroyConfirm);
  },
  'on.save': function(btn) {
    var form, rec, win;
    rec = this.record();
    win = btn.up('window');
    form = win.down('form');
    console.log(rec);
    if (!rec.isValid()) {
      return;
    }
    return rec.save(win);
  },
  'on.selectionchange': function(sm, rs) {
    return this.load('records', {
      parameters: {
        domain: rs[0].get('id')
      }
    });
  },
  'on.dns.refresh': function() {
    return this.model.get('records').reload();
  },
  'on.dns.remove': function(btn) {
    var ids, rec, _i, _len, _ref;
    if (!window.confirm(this.locale.dns.destroyConfirm)) {
      return;
    }
    ids = [];
    _ref = this.lookup('recordlist').getSelectionModel().getSelection();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rec = _ref[_i];
      ids.push(rec.get('id'));
    }
    btn.setLoading('Deleting ...');
    return Ext.Ajax.request({
      url: '/cloud/dns/[domain]',
      method: 'DELETE',
      parameters: {
        domain: this.model.get('record').get('id')
      },
      jsonData: ids,
      callback: function() {
        return btn.setLoading(false);
      },
      success: (function(_this) {
        return function() {
          return _this.model.get('records').reload();
        };
      })(this),
      failure: Ext.Msg.error
    });
  },
  'on.dns.add.GMAIL': function(btn) {
    btn.setLoading('Adding Gmail MX ...');
    return Ext.Ajax.request({
      url: '/cloud/dns/[domain]/gmail',
      method: 'POST',
      parameters: {
        domain: this.model.get('record').get('id')
      },
      callback: function() {
        return btn.setLoading(false);
      },
      success: (function(_this) {
        return function() {
          return _this.model.get('records').reload();
        };
      })(this),
      failure: Ext.Msg.error
    });
  },
  getRecordForm: function(name, config) {
    var win;
    win = this.view.add(Ext.widget(name, config));
    return win.show();
  },
  'on.dns.add': function(btn) {
    return this.getRecordForm('dns-form-' + btn.dnstype);
  },
  'on.dns.save': function(btn) {
    btn.setLoading('Adding Record ...');
    return Ext.Ajax.request({
      url: '/cloud/dns/[domain]/' + btn.dnstype,
      method: 'POST',
      parameters: {
        domain: this.model.get('record').get('id')
      },
      callback: function() {
        return btn.setLoading(false);
      },
      success: (function(_this) {
        return function() {
          return _this.model.get('records').reload();
        };
      })(this),
      failure: Ext.Msg.error
    });
  }
});
