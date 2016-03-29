import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('entry').then((entries) => { return entries.toArray();});
    },
});
