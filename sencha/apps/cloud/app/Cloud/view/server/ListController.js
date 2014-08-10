Ext.define('Magice.Cloud.view.server.ListController', {
  'on.list.selection.change': function(sm, rs) {
    var server;
    if (rs.length && (server = this.model.get('server'))) {
      return server.reject();
    }
  },
  'on.list.refresh': function() {
    return this.model.get('servers').reload();
  }
});
