Ext.define('Magice.Cloud.view.image.Controller', {
  extend: 'Magice.base.ViewController',
  alias: 'controller.images',
  mixins: ['Magice.Cloud.view.server.actions.DestoryImageController'],
  locale: {
    renameError: {
      title: 'Oops!',
      message: 'Unable to update your image name.'
    },
    imagelist: {
      destoryTitle: 'Destroy image.',
      noSelection: {
        title: 'Oops!',
        message: "Cannot destroy empty record. You may lost backup's selection."
      }
    }
  },
  init: function(view) {
    this.callParent(arguments);
    return view.updateActiveState = this.updateActiveState.bind(this);
  },
  updateActiveState: function(activeState) {
    this.load('images', {
      params: {
        type: activeState
      }
    });
    this.fireEvent('changeroute', this, 'images/' + activeState);
    return this.getView().down('#filter-button').down(sprintf('[filter="%s"]', activeState)).setPressed(true);
  },
  takeAction: function(name, config) {
    config.locks = this.view;
    return this.view.add(Ext.widget(name, config)).show();
  },
  'on.refresh': function() {
    return this.model.get('images').reload();
  },
  'on.edit': function(ed, field) {
    return Ext.Ajax.request({
      url: '/cloud/images/[id]/[img]/edit',
      method: 'PUT',
      params: {
        name: field.value
      },
      parameters: {
        id: field.record.get('machineId'),
        img: field.record.get('id')
      },
      success: function() {
        return field.record.commit();
      },
      failure: (function(_this) {
        return function() {
          field.record.reject();
          return Ext.Notify.prototype.error(_this.locale.renameError);
        };
      })(this)
    });
  },
  'on.rename': function(btn) {
    var imagelist, rec;
    rec = btn.getRecord();
    if (!rec) {
      return;
    }
    imagelist = this.lookup('imagelist');
    imagelist.editing.cancelEdit();
    return imagelist.editing.startEdit(rec, 2);
  },
  'on.destroy': function(btn) {
    return this.callAction('on.action.destroyimage', btn);
  },
  'on.filter': function(btn) {
    return this.getView().setActiveState(btn.filter);
  }
});
