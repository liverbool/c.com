Ext.define 'Magice.Cloud.view.image.View',
    extend: 'Ext.panel.Panel'

    xtype: 'images'
    itemId: 'images'

    border: no

    controller: 'images'
    viewModel: type: 'images'
    dockedItems: xtype: 'view-images-toolbar'

    bind: loading: '{maskingimages}'

    xlayout:
        type: 'vbox'
        pack: 'start'
        align: 'stretch'

    defaults:
        flex: 1
        border: no

    config:
        activeState: null,
        defaultActiveState: 'all'

    maskings:
        key: 'maskingimages'
        stores: ['images']

    validStates:
        all: 1
        backup: 1
        snapshot: 1

    isValidState: (state) -> !!@validStates[state]

    items: [
        {
            xtype: 'image-list'
        }
    ]
