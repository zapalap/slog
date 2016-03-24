import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    shouldBackgroundReloadRecord: () => false,
    namespace:'api'
});
