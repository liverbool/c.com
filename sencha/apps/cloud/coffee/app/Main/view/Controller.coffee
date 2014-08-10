###
This class is the main view for the application. It is specified in app.js as the
"autoCreateViewport" property. That setting automatically applies the "viewport"
plugin to promote that instance of this class to the body element.

The primary role of this controller is to manage routing.
###
Ext.define "Magice.Main.view.Controller",
    extend: "Ext.app.ViewController"
    alias: "controller.main"

    routes:
        "!:id":
            action: "onNavigate"
            before: "beforeNavigate"

        "!:id/:state":
            action: "onNavigateDeep"
            before: "beforeNavigateDeep"

    listen:
        controller:
            "*":

                # We delegate all changes of router history to this controller by firing
                # the "changeroute" event from other controllers.
                changeroute: "changeRoute"
                unmatchedroute: "onUnmatchedRoute"

    privates:
        getMenu: -> @getView().down('item-menu')
        getMain: -> @getView().down('[region="center"]')
        getItem: (id) -> @getMain().getComponent(id)
        hasWidget: (alias) -> Ext.ClassManager.getNameByAlias 'widget.' + alias

    destroy: ->
        Ext.destroyMembers this, "menu"
        @callParent()
        return

    beforeNavigate: (id, action) ->
        #Ext.log('beforeNavigate: ' + id);

        item = @getItem id

        if !item and @hasWidget id
            item = @getMain().add Ext.widget(id)

        if item
            action.resume()
        else
            @onBadRoute()

        return

    onNavigate: (id) ->

        #Ext.log('navigate: ' + id);
        item = @getMain().setActiveItem id

        @getMenu().setActiveMenu id, yes

        if item
            # if we changed active items...
            route = @getItemRoute item
            @changeRoute @, route if route and route isnt id

        return

    beforeNavigateDeep: (id, state, action) ->
        item = @getItem id

        if !item and @hasWidget id
            item = @getMain().add Ext.widget id

        valid = if item.isValidState then item.isValidState state else undefined

        if valid then action.resume() else @onBadRoute()
        return

    onNavigateDeep: (id, state) ->
        #Ext.log('navigate: ' + id + ' / ' + state);
        @getMenu().setActiveMenu id, yes
        @getMain().setActiveItem id
        @getItem(id).setActiveState state
        return

    changeRoute: (controller, route) ->

        # Since we parse
        route = "!" + route if route.substring(0, 1) isnt "!"
        #Ext.log('changeRoute: ' + route);
        @redirectTo route
        return

    getItemRoute: (item) ->
        route = item.xtype
        route += "/" + (item.getActiveState() or item.getDefaultActiveState()) if item.getActiveState
        route

    onBadRoute: ->
        console.trace()
        app = Magice.app.getApplication()
        @changeRoute @, app.getDefaultToken()
        return

    onUnmatchedRoute: (token) ->
        #Ext.log('onUnmatchedRoute: ' + token);
        @onBadRoute() if token
        return

    onMenuChange: (sm, rs) ->
        @changeRoute @, rs[0].id