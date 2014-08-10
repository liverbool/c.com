Ext.define('Magice.Cloud.view.server.actions.ShutdownController', {
  actionShutdownSelector: 'server-actions-shutdown',
  'on.action.shutdown': function() {
    return this.takeAction(this.actionShutdownSelector);
  },
  'on.action.shutdown.action': function() {
    return this['shutdown.action']();
  },
  'on.action.shutdown.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.shutdown.error': function() {
    return this.server('sync');
  },
  'on.action.shutdown.success': function() {
    return this.server('sync');
  },
  'shutdown.action': function() {
    var operation;
    if (this.powerCurrentlyOff()) {
      return;
    }
    operation = this.operation(this.actionShutdownSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/shutdown',
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
