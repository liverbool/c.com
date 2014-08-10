Ext.define('Magice.Cloud.view.sshkey.Controller', {
  extend: 'Magice.base.ViewController',
  alias: 'controller.sshkeys',
  locale: {
    renameError: {
      title: 'Oops!',
      message: 'Unable to update your image name.'
    },
    imagelist: {
      destoryTitle: 'Destroy image.',
      noSelection: {
        title: 'Oops!',
        message: "Cannot destroy empty record. You may lost backup's selection."
      }
    }
  },
  takeAction: function(name, config) {
    config.locks = this.view;
    return this.view.add(Ext.widget(name, config)).show();
  },
  record: function() {
    var rs;
    rs = this.lookup('sshkeylist').getSelection();
    if (rs.length) {
      return rs[0];
    } else {
      return null;
    }
  },
  'on.refresh': function() {
    return this.model.get('sshkeys').reload();
  },
  'on.create': function(btn) {
    var rs, selModel;
    selModel = this.lookup('sshkeylist').selModel;
    if (btn.create) {
      selModel.deselectAll();
    }
    this.view.add(Ext.widget('sshkey-form')).show();
    if (!this.record()) {
      rs = this.model.get('sshkeys').add(new Magice.Cloud.model.Key);
      return selModel.select(rs);
    }
  },
  'on.close': function() {
    if (this.model.get('isPhantom')) {
      return this.model.get('sshkeys').remove(this.record());
    }
  },
  'on.edit': function(btn) {
    return this.callAction('on.create', btn);
  },
  'on.destroy': function(btn) {
    return this.record().erase();
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
  }
});
