Ext.define 'Ext.override.data.reader.Reader',
    override: 'Ext.data.reader.Reader'

    # http://www.sencha.com/forum/showthread.php?288839
    read: (response, readOptions) ->
        if response.status is 204
            @nullResultSet
        else @callParent arguments