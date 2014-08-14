Ext.define('Magice.Cloud.view.server.ListSnapshotsController', {
  'on.list.snapshots': function() {
    return this.takeAction('server-list-snapshots');
  },
  'on.list.snapshots.refresh': function() {
    return this.model.get('snapshots').reload();
  },
  'on.list.snapshots.edit': function(ed, cell) {
    var title, win;
    if (!ed.editing) {
      return;
    }
    win = ed.grid.up('window');
    title = win.title;
    win.setTitle(sprintf('%s <i><small>%s</small></i>', title, this.locale.snapshotlist.updating));
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
          return Ext.Notify.prototype.error(_this.locale.snapshotlist.renameError);
        };
      })(this)
    });
  }
});
