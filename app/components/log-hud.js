import Ember from 'ember';

export default Ember.Component.extend({
    atLeastOneMarked:false,
    markedEntries:{},
    actions:{
        lineMarked(logEntry) {
            var entries = this.get('markedEntries');
            entries[logEntry.get('id')] = logEntry;
            
            if(!this.get('atLeastOneMarked')) {
                this.set('atLeastOneMarked', true);
            }
        },
        lineUnmarked(logEntry) {
            var entries = this.get('markedEntries');
            if (entries[logEntry.get('id')]) {
                delete(entries[logEntry.get('id')]);
                this.set('markedEntries', entries);
            }
            console.log(this.get('markedEntries'));
            if (Object.keys(this.get('markedEntries')).length <= 0) {
                this.set('atLeastOneMarked', false);
            }
        },
        clearAllSelectedLogLines() {
           this.set('markedEntries', {});
           this.set('atLeastOneMarked', false);
        }
    },
    attributeBindings:[
        'dataSpy:data-spy'
    ],
    dataSpy:'affix'
});
