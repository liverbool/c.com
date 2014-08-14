Ext.define('Magice.Cloud.view.server.ListBackupsController', {
  'on.list.backups': function() {
    return this.takeAction('server-list-backups');
  },
  'on.list.backups.refresh': function() {
    return this.model.get('backups').reload();
  },
  'on.list.backups.edit': function(ed, cell) {
    var title, win;
    if (!ed.editing) {
      return;
    }
    win = ed.grid.up('window');
    title = win.title;
    win.setTitle(sprintf('%s <i><small>%s</small></i>', title, this.locale.backuplist.updating));
    return Ext.Ajax.request({
      url: '/cloud/images/[id]/[img]',
      method: 'PUT',
      params: {
        name: cell.value
      },
      parameters: {
        id: this.server('get', 'id'),
        img: cell.record.get('id')
      },
      callback: function() {
        return win.setTitle(title);
      },
      success: function() {
        return cell.record.commit();
      },
      failure: (function(_this) {
        return function() {
          cell.record.reject();
          return Ext.Notify.prototype.error(_this.locale.backuplist.renameError);
        };
      })(this)
    });
  }
});
