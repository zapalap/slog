import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'span',
    actions:{
        markClicked() {
            this.get('onMark')();
        }
    }
});
