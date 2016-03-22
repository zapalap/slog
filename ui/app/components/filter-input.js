import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  actions:{
    filterUpdated() {
      this.get('onFilterChanged')(this.get('inputValue'));
    }
  }
});
