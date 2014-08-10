Ext.define 'Ext.extend.grid.Panel', extend: 'Ext.grid.Panel', ->

    Ext.grid.tooltip = (view) ->
        view.tip = Ext.create 'Ext.tip.ToolTip',

            # The overall target element.
            target: view.el

            # Each grid row causes its own seperate show and hide.
            delegate: view.itemSelector

            # Moving within the row should not hide the tip.
            trackMouse: yes

            # Render immediately so that tip.body can be referenced prior to the first show.
            renderTo: Ext.getBody()

            listeners:

                # Change content dynamically depending on which element triggered the show.
                beforeshow: (tip) ->
                    tooltip = view.getRecord(tip.triggerElement).get('tooltip')

                    if tooltip
                        tip.update tooltip
                    else
                        tip.on 'show', ->
                             Ext.defer tip.hide, 10, tip
                        , tip, single: yes