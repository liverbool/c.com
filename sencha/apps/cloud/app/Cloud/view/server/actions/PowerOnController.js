Ext.define('Magice.Cloud.view.server.actions.PowerOnController', {
  actionPowerOnSelector: 'server-actions-poweron',
  'on.action.poweron': function() {
    return this.takeAction(this.actionPowerOnSelector);
  },
  'on.action.poweron.action': function() {
    return this['poweron.action']();
  },
  'on.action.poweron.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.poweron.error': function() {
    return this.server('sync');
  },
  'on.action.poweron.success': function() {
    return this.server('sync');
  },
  'poweron.action': function() {
    var operation;
    if (this.powerCurrentlyOn()) {
      return;
    }
    operation = this.operation(this.actionPowerOnSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/poweron',
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
