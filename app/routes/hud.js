import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('entry');
    },
    actions:{
      markEntry(logEntry) {
          logEntry.set('isMarked', !logEntry.get('isMarked'));
      }  
    }
});
