import DS from 'ember-data';

export default DS.Model.extend({
  verboseMessage: DS.attr('string'),
  shortMessage:DS.attr('string'),
  showing: DS.attr('boolean'),
  timestamp:DS.attr('string'),
  isMarked:DS.attr('boolean'),
  isDimmed:DS.attr('boolean'),
  
  brief:Ember.computed('verboseMessage', function(){
     return this.get('verboseMessage').substr(0, 10);
  })
});
