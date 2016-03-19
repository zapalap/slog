import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        logLineMarked(logEntry) {
            logEntry.set('isMarked', true);
            logEntry.set('isDimmed', false);
            this.get('onMark')();
        },
        logLineUnmarked(logEntry) {
            logEntry.set('isMarked', false);
            this.get('onUnmark')();
        }
    }
});
