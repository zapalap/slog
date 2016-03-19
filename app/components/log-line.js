import Ember from 'ember';

export default Ember.Component.extend({
    isMarked:false,
    actions:{
        logLineMarked() {
            this.set('isMarked', true);
            this.get('onMark')();
        },
        logLineUnmarked() {
            this.set('isMarked', false);
            this.get('onUnmark')();
        }
    }
});
