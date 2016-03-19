import Ember from 'ember';

export default Ember.Component.extend({
    atLeastOneMarked:false,
    actions:{
        lineMarked(logEntry) {
            if(!this.get('atLeastOneMarked')) {
                this.set('atLeastOneMarked', true);
            }
        },
        lineUnmarked(logEntry) {
            var marked = this.get('logEntryList').isAny('isMarked', true);
            
            if (!marked) {
                this.set('atLeastOneMarked', false);
            }
        },
        clearAllSelectedLogLines() {
            this.get('logEntryList').forEach(function(model) {
               model.set('isMarked', false); 
            });
           this.set('atLeastOneMarked', false);
        }
    },
    attributeBindings:[
        'dataSpy:data-spy'
    ],
    dataSpy:'affix'
});
