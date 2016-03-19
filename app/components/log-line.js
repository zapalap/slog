import Ember from 'ember';

export default Ember.Component.extend({
    isMarked:false,
    actions:{
        logLineMarkButtonClicked() {
            this.set('isMarked', !this.get('isMarked'));
        }
    }
});
