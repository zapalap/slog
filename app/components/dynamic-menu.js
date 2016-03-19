import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        clearAllClicked() {
            this.get('onClearAll')();
        },
        dimAllClicked() {
            this.get('onDimAllNotSelected')();
        }
    }
});
