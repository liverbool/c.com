Ext.define 'Magice.Addressing.view.Model',
    extend: 'Magice.base.ViewModel'

    alias: 'viewmodel.addressing'

    geoSetter: (id, key) ->
        name = 'record.' + key
        origin = @get name

        return if origin and origin.id is id
        return @set name, null if !id

        @set name, @getStore(key + 's').getById(id).getData()

    stores:
        addresses:
            model: 'Magice.Addressing.model.Address'
            autoLoad: yes

        provinces:
            model: 'Magice.Addressing.model.Province'
            url: '/account/addressing/province'

        amphurs:
            model: 'Magice.Addressing.model.Amphur'
            url: '/account/addressing/province/[id]/amphur'

        districts:
            model: 'Magice.Addressing.model.District'
            url: '/account/addressing/amphur/[id]/district'

    data:
        record: null

    formulas:

        geoprovince:
            bind: bindTo: '{record}', deep: yes
            get: -> @get('record.province.id')
            set: (id) -> @geoSetter id, 'province'

        geoamphur:
            bind: bindTo: '{record}', deep: yes
            get: -> @get('record.amphur.id')
            set: (id) -> @geoSetter id, 'amphur'

        gedistrict:
            bind: bindTo: '{record}', deep: yes
            get: -> @get('record.district.id')
            set: (id) -> @geoSetter id, 'district'

        isDefaultAddress:
            bind: bindTo: '{record}', deep: yes
            get: -> isDefault: @get('record.isDefault')
            set: (val) -> @set 'record.isDefault', val.isDefault
