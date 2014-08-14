Ext.define 'Magice.Cloud.view.server.CreateController',

    'on.create.new': ->
        @view.disable()

        win = @view.add new Magice.Cloud.view.server.form.Create
            listeners: close: (me) =>
                @view.remove me
                @setupCreator null
                @view.enable()

        # auto load creators on create win
        @load 'creators', (rs) =>
            @setupCreator rs
            win.show()

    'on.create.step0': (me) ->
        win = me.up 'window'
        @hideItems win, ['#stepBar', '#btnNext', '#btnBack', '#btnStart']

    'on.create.step-select': (me) ->
        win = me.up 'window'
        @showItems win, ['#stepBar', '#btnNext']
        @hideItems win, ['#btnBack', '#btnStart']

    'on.create.step-summary': (me) ->
        win = me.up 'window'
        @showItems win, ['#btnBack', '#btnStart']
        @hideItems win, ['#stepBar', '#btnNext']

    'on.create.back': (me) -> me.up('window').setActiveItem 1

    # summary
    'on.create.next': (me) ->
        win = me.up 'window'

        steps = @model.get 'steps'

        if !steps.hostname.active or !steps.size.active or !steps.image.active
            return Ext.Msg.error @locale.stepInvalid

        @model.set 'summary',
            hostname: steps.hostname.data
            size: steps.size.data[0].data
            image: steps.image.data[0].data
            features: steps.feature.data

        win.setActiveItem 2

    # start create
    'on.create.start': (me) ->

        operation = @getCreateOperation()
        operation.prepare @processer

        summary = @model.get 'summary'
        backups = ipv6 = privateNetworking = no

        if summary.features
            for f in summary.features
                ipv6 = yes if f.data.slug is 'ipv6'
                backups = yes if f.data.slug is 'backups'
                privateNetworking = yes if f.data.slug is 'private_networking'

        data =
            name: summary.hostname
            size: summary.size.slug
            image: summary.image.slug
            ipv6: ipv6
            backups: backups
            privateNetworking: privateNetworking

        # create server
        Ext.Ajax.request
            url: '/cloud/servers'
            method: 'POST'
            jsonData: data
            success: (response) => operation.processing response
            failure: (response) =>
                operation.failure response
                win = me.up 'window'
                @showItems win, ['#btnBack']

    getCreateOperation: -> @lookup('creatorWindow').getOperation()

    setupCreator: (rs) ->
        if rs is null
            @model.set 'creatorsImages', null
            @clearData 'creatorsSizes'
            @clearData 'creatorsDistributors'
            @clearData 'creatorsFeatures'
        else
            r = rs[0]
            @model.set 'creatorsImages', r.get 'images'
            @loadData 'creatorsSizes', r.get 'sizes'
            @loadData 'creatorsDistributors', r.get 'dists'
            @loadData 'creatorsFeatures', r.get 'features'
            @loadData 'creatorsPrivateImages', r.get 'privates'
            @loadData 'creatorsBackupImages', r.get 'backups'

    setStepActive: (data, step, active) ->
        # store step state
        steps = @model.get 'steps'

        steps[step].icon = if active then 'checked checkbox' else 'empty checkbox'
        steps[step].active = active
        steps[step].data = data

        @model.set 'steps', steps

    deselectAllOfChildGrid: (parent, current) ->
        for grid in parent.query('grid')
            grid.getSelectionModel().deselectAll(yes) if grid.id isnt current.id

    'on.creator.hostname.change': (me) ->
        @setStepActive me.value, 'hostname', me.value && me.isValid()

    'on.creator.dist.selectionchange': (sm, rs) ->
        images = @model.get 'creatorsImages'
        @loadData 'creatorsDistributorsImages', images[rs[0].get 'slug']

        @setStepActive null, 'image', no

    'on.creator.dist.image.selectionchange': (sm, rs) ->
        @deselectAllOfChildGrid sm.view.up('creator-image'), sm.view.grid
        @setStepActive rs, 'image', rs.length

    'on.creator.private.image.selectionchange': (sm, rs) ->
        @deselectAllOfChildGrid sm.view.up('creator-image'), sm.view.grid
        @setStepActive rs, 'image', rs.length

    'on.creator.backup.image.selectionchange': (sm, rs) ->
        @deselectAllOfChildGrid sm.view.up('creator-image'), sm.view.grid
        @setStepActive rs, 'image', rs.length

    'on.creator.size.selectionchange': (sm, rs) ->
        @setStepActive rs, 'size', rs.length

    'on.creator.feature.selectionchange': (sm, rs) ->
        @setStepActive rs, 'feature', rs.length
        sm.view.el.select('div.item input').set checked: null, no
        sm.view.el.select('div.x-item-selected input').set checked: yes, no

    'on.create.ended': (res) -> @load 'servers'
