import Ember from 'ember';

export default Ember.Component.extend({
    tagName:"span",
     keyUp(event) {
            let value = $(event.target).val();
            this.get('onFilterChanged')(value);
        }
});
