Ext.define('Magice.Cloud.model.Action', {
  extend: 'Ext.data.Model',
  fields: [
    {
      name: 'id',
      type: 'int'
    }, {
      name: 'type'
    }, {
      name: 'status'
    }, {
      name: 'startedAt',
      type: 'date'
    }, {
      name: 'completedAt',
      type: 'date'
    }, {
      name: 'tooltip',
      convert: function(v, r) {
        var end, start;
        start = r.get('startedAt') ? r.get('startedAt').toLocaleString() : '-';
        end = r.get('completedAt') ? r.get('completedAt').toLocaleString() : '-';
        return sprintf('%s - %s', start, end);
      }
    }, {
      name: 'duration',
      convert: function(v, r) {
        return Ext.humanize.diff(r.get('startedAt'), r.get('completedAt'));
      }
    }
  ]
});
