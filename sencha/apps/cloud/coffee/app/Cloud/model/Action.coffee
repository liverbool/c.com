Ext.define 'Magice.Cloud.model.Action',
    extend: 'Ext.data.Model'

    fields: [
        {name: 'id', type: 'int'}
        {name: 'type'}
        {name: 'status'}
        {name: 'startedAt', type: 'date'}
        {name: 'completedAt', type: 'date'}
        {
            name: 'tooltip'
            convert: (v, r) ->

                start = if r.get('startedAt') then r.get('startedAt').toLocaleString() else '-'
                end = if r.get('completedAt') then r.get('completedAt').toLocaleString() else '-'

                sprintf '%s - %s', start, end
        }
        {
            name: 'duration'
            convert: (v, r) -> Ext.humanize.diff r.get('startedAt'), r.get('completedAt')
        }
    ]
