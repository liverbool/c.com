Ext.define('Magice.Cloud.view.server.actions.PowerCycleController', {
  actionCycleSelector: 'server-actions-cycle',
  'on.action.cycle': function() {
    return this.takeAction(this.actionCycleSelector);
  },
  'on.action.cycle.action': function() {
    return this['cycle.action']();
  },
  'on.action.cycle.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.cycle.error': function() {
    return this.server('sync');
  },
  'on.action.cycle.success': function() {
    return this.server('sync');
  },
  'cycle.action': function() {
    var operation;
    operation = this.operation(this.actionCycleSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/cycle',
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
