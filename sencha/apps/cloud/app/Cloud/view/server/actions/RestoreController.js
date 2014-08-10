Ext.define('Magice.Cloud.view.server.actions.RestoreController', {
  actionRestoreSelector: 'server-actions-restore',
  'on.action.restore': function(btn) {
    this.restoreImageReferer = btn.referer;
    return this.takeAction(this.actionRestoreSelector, {
      title: this.locale[this.restoreImageReferer].restoreTitle
    });
  },
  'on.action.restore.action': function() {
    return this['restore.action']();
  },
  'on.action.restore.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.restore.error': function() {
    return this.server('sync');
  },
  'on.action.restore.success': function() {
    return this.server('sync');
  },
  'restore.action': function() {
    var operation, rs;
    rs = this.lookup(this.restoreImageReferer).getSelection();
    if (!rs.length) {
      return Ext.Msg.alert(this.locale[this.restoreImageReferer].noSelection);
    }
    operation = this.operation(this.actionRestoreSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/restore/[img]',
      parameters: {
        id: this.server('get', 'id'),
        img: rs[0].get('id')
      },
      success: function(response) {
        return operation.processing(response);
      },
      failure: function(response) {
        return operation.failure(response);
      }
    });
  }
});
