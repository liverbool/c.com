Ext.define('Magice.Cloud.view.server.actions.PowerOffController', {
  actionPowerOffSelector: 'server-actions-poweroff',
  'on.action.poweroff': function() {
    return this.takeAction(this.actionPowerOffSelector);
  },
  'on.action.poweroff.action': function() {
    return this['poweroff.action']();
  },
  'on.action.poweroff.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.poweroff.error': function() {
    return this.server('sync');
  },
  'on.action.poweroff.success': function() {
    return this.server('sync');
  },
  'poweroff.action': function() {
    var operation;
    if (this.powerCurrentlyOff()) {
      return;
    }
    operation = this.operation(this.actionPowerOffSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/poweroff',
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
