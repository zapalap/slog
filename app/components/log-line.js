import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        logLineMarked(logEntry) {
            logEntry.set('isMarked', true);
            this.get('onMark')();
        },
        logLineUnmarked() {
            logEntry.set('isMarked', false);
            this.get('onUnmark')();
        }
    }
});
