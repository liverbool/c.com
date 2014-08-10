Ext.define('Magice.Cloud.view.server.actions.SnapshotController', {
  actionSnapshotelector: 'server-actions-snapshot',
  getSnapshotLabel: function() {
    return this.view.down(this.actionSnapshotelector).down('[xtype="textfield"]');
  },
  snapshotCallback: function(state) {
    var snapshotlist;
    this.server('sync');
    if (snapshotlist = this.lookup('snapshotlist')) {
      return snapshotlist.store.reload();
    }
  },
  'on.action.snapshot': function() {
    return this.takeAction(this.actionSnapshotelector, true);
  },
  'on.action.snapshot.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.snapshot.save': function() {
    return this['snapshot.action']();
  },
  'on.action.snapshot.error': function() {
    return this.snapshotCallback('error');
  },
  'on.action.snapshot.success': function() {
    return this.snapshotCallback('success');
  },
  'snapshot.action': function() {
    var operation;
    if (this.confirmPowerOff()) {
      return;
    }
    if (this.getSnapshotLabel().isValid() !== true) {
      return Ext.Msg.error(this.locale.snapshot.notValid);
    }
    operation = this.operation(this.actionSnapshotelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/snapshot',
      params: {
        name: this.getSnapshotLabel().getValue()
      },
      parameters: {
        id: this.server('get', 'id')
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
