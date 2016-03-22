import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    dimAllClicked() {
      this.get('onDimAllNotSelected')();
    },
  }
});
