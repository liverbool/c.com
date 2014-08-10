Ext.define('Magice.Cloud.view.server.actions.DisableBackupsController', {
  actionDisableBackupsSelector: 'server-actions-disablebackups',
  'on.action.disablebackups': function() {
    return this.takeAction(this.actionDisableBackupsSelector);
  },
  'on.action.disablebackups.action': function() {
    return this['disablebackups.action']();
  },
  'on.action.disablebackups.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.disablebackups.error': function() {
    return this.server('sync');
  },
  'on.action.disablebackups.success': function() {
    return this.server('sync');
  },
  'disablebackups.action': function() {
    var operation;
    operation = this.operation(this.actionDisableBackupsSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/disablebackups',
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
