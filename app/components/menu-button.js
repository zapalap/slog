import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        clicked(){
            this.get('onClick')();
        }
    }
});
