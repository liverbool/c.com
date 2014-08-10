Ext.define('Magice.Cloud.view.server.actions.EnableIPv6Controller', {
  actionEnableIPv6Selector: 'server-actions-enableipv6',
  'on.action.enableipv6': function() {
    return this.takeAction(this.actionEnableIPv6Selector);
  },
  'on.action.enableipv6.action': function() {
    return this['enableipv6.action']();
  },
  'on.action.enableipv6.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.enableipv6.error': function() {
    return this.server('sync');
  },
  'on.action.enableipv6.success': function() {
    return this.server('sync');
  },
  'enableipv6.action': function() {
    var operation;
    operation = this.operation(this.actionEnableIPv6Selector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/enableipv6',
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
