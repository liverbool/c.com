Ext.define('Magice.Cloud.view.server.form.CreateHostname', {
  extend: 'Ext.panel.Panel',
  xtype: 'creator-hostname',
  title: 'Server Hostname',
  items: {
    xtype: 'textfield',
    emptyText: 'Enter Hostname',
    allowBlank: false,
    vtype: 'domain',
    listeners: {
      blur: 'on.creator.hostname.change'
    }
  }
});
