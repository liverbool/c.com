Ext.define('Magice.Cloud.view.server.actions.DestroyController', {
  actionDestroySelector: 'server-actions-destroy',
  'on.action.destroy': function() {
    return this.takeAction(this.actionDestroySelector);
  },
  'on.action.destroy.action': function() {
    return this.callAction('destroy.action');
  },
  'on.action.destroy.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.destroy.error': function() {
    return this.server('sync');
  },
  'on.action.destroy.success': function() {
    return this.model.get('servers').remove(this.server());
  },
  'destroy.action': function() {
    var operation;
    operation = this.operation(this.actionDestroySelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'DELETE',
      url: '/cloud/servers/[id]',
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
