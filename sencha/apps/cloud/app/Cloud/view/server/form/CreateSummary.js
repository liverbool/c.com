Ext.define('Magice.Cloud.view.server.form.CreateSummary', {
  extend: 'Ext.panel.Panel',
  xtype: 'creator-summary',
  locale: {
    header: 'Summary',
    title: {
      hostname: 'Hostname',
      size: 'Size',
      image: 'Image',
      feature: 'Feature'
    },
    emptyFeature: {
      title: 'No feature selected!',
      message: 'You will create server with no feature selected. Well, We recomend you to select Enable VirtIO.'
    }
  },
  bind: {
    data: {
      bindTo: '{summary}',
      deep: true
    }
  },
  initComponent: function() {
    this.tpl = ['<h2 class="ui dividing header">' + this.locale.header + '</h2>', '<h4 class="ui header">' + this.locale.title.hostname + '</h4>', '<p>{hostname}</p>', '<h4 class="ui header">' + this.locale.title.size + '</h4>', '<div>', '<div><b>{size.slug}</b></div>', '<div><b>CPU:</b> {size.vcpus}GB</div>', '<div><b>Memory:</b> {size.memory}MB</div>', '<div><b>SSD Disk:</b> {size.disk}GB</div>', '<div><b>Transfer:</b> {size.transfer}MB</div>', '<div><b>Hourly Price:</b> {size.priceHourly}</div>', '<div><b>Monthly Price:</b> {size.priceMonthly}</div>', '</div>', '<h4 class="ui header">' + this.locale.title.image + '</h4>', '<p>{image.distribution}</p>', '<p>{image.name}</p>', '<h4 class="ui header">' + this.locale.title.feature + '</h4>', '<div class="ui list">', '<tpl for="features">', '<div class="item"><i class="icon checkmark"></i> {name}</div>', '</tpl>', '</div>', '<tpl if="!features">', '<div class="ui warning message">', '<div class="header">' + this.locale.emptyFeature.title + '</div>', this.locale.emptyFeature.message, '</div>', '</tpl>'];
    return this.callParent(arguments);
  }
});
