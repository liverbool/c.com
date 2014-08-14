Ext.define('Magice.Cloud.view.server.form.CreateImage', {
  extend: 'Ext.tab.Panel',
  xtype: 'creator-image',
  title: 'Images',
  defaults: {
    border: false
  },
  plain: true,
  items: [
    {
      title: 'Linux Distributions',
      layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
      },
      defaults: {
        border: false
      },
      items: [
        {
          itemId: 'distributor',
          xtype: 'dataview',
          bind: {
            store: '{creatorsDistributors}'
          },
          itemSelector: '.item',
          multiSelect: false,
          selModel: {
            allowDeselect: false
          },
          listeners: {
            selectionchange: 'on.creator.dist.selectionchange',
            refresh: function() {
              if (!this.selModel.isSelected()) {
                return this.selModel.select(0);
              }
            }
          },
          tpl: ['<div class="ui horizontal list">', '<tpl for=".">', '<div class="item">', '<img class="ui avatar image" src="http://semantic-ui.com/images/demo/avatar.jpg">', '<div class="content">', '<div class="header">{name}</div>', '</div>', '</div>', '</tpl>', '</div>'],
          selectAt: function(index) {
            var rec;
            rec = this.store.getAt(index);
            return this.getSelectionModel().select([rec], false);
          }
        }, {
          flex: 1,
          xtype: 'grid',
          bind: {
            store: '{creatorsDistributorsImages}'
          },
          listeners: {
            selectionchange: 'on.creator.dist.image.selectionchange'
          },
          hideHeaders: true,
          autoScroll: true,
          columns: [
            {
              dataIndex: 'name',
              flex: 1
            }
          ]
        }
      ]
    }, {
      title: 'My Images',
      xtype: 'grid',
      bind: {
        store: '{creatorsPrivateImages}'
      },
      listeners: {
        selectionchange: 'on.creator.private.image.selectionchange'
      },
      columns: [
        {
          text: 'Distribution',
          dataIndex: 'distribution'
        }, {
          flex: 1,
          text: 'Name',
          dataIndex: 'name'
        }
      ]
    }, {
      title: 'My Backups',
      xtype: 'grid',
      bind: {
        store: '{creatorsBackupImages}'
      },
      listeners: {
        selectionchange: 'on.creator.backup.image.selectionchange'
      },
      columns: [
        {
          text: 'Distribution',
          dataIndex: 'distribution'
        }, {
          flex: 1,
          text: 'Name',
          dataIndex: 'name'
        }
      ]
    }
  ]
});
