Ext.define 'Magice.Cloud.view.server.form.CreateHostname',
    extend: 'Ext.panel.Panel'
    xtype: 'creator-hostname'

    title: 'Server Hostname' #locale

    items:
        xtype: 'textfield'
        emptyText: 'Enter Hostname' #locale
        allowBlank: no
        vtype: 'domain'
        listeners: blur: 'on.creator.hostname.change'
