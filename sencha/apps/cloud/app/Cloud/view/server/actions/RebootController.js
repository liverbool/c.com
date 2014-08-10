Ext.define('Magice.Cloud.view.server.actions.RebootController', {
  actionRebootSelector: 'server-actions-reboot',
  'on.action.reboot': function() {
    return this.takeAction(this.actionRebootSelector);
  },
  'on.action.reboot.action': function() {
    return this['reboot.action']();
  },
  'on.action.reboot.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.reboot.error': function() {
    return this.server('sync');
  },
  'on.action.reboot.success': function() {
    return this.server('sync');
  },
  'reboot.action': function() {
    var operation;
    operation = this.operation(this.actionRebootSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/reboot',
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
