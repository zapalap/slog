import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        resetAllClicked() {
            this.get('onResetAll')();
        },
        dimAllClicked() {
            this.get('onDimAllNotSelected')();
        },
    }
});
