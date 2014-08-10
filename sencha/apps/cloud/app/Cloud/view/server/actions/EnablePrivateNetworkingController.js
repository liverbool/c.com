Ext.define('Magice.Cloud.view.server.actions.EnablePrivateNetworkingController', {
  actionEnablePrivateNetworkingSelector: 'server-actions-enableprivatenetworking',
  'on.action.enableprivatenetworking': function() {
    return this.takeAction(this.actionEnablePrivateNetworkingSelector, true);
  },
  'on.action.enableprivatenetworking.action': function() {
    return this['enableprivatenetworking.action']();
  },
  'on.action.enableprivatenetworking.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.enableprivatenetworking.error': function() {
    return this.server('sync');
  },
  'on.action.enableprivatenetworking.success': function() {
    return this.server('sync');
  },
  'enableprivatenetworking.action': function() {
    var operation;
    if (this.confirmPowerOff()) {
      return;
    }
    operation = this.operation(this.actionEnablePrivateNetworkingSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/enableprivatenetworking',
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
