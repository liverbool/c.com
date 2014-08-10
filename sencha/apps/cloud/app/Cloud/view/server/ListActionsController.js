Ext.define('Magice.Cloud.view.server.ListActionsController', {
  'on.list.actions': function() {
    return this.takeAction('server-list-actions');
  },
  'on.list.actions.refresh': function() {
    return this.model.get('actions').reload();
  }
});
