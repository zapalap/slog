import Ember from 'ember';

export default Ember.Component.extend({
    menuShouldShow:Ember.computed('atLeastOneMarked', 'filterIsNotEmpty', function(){
        return this.get('atLeastOneMarked') || this.get('filterIsNotEmpty');
    }),
    atLeastOneMarked:false,
    filterIsNotEmpty:false,
    actions:{
        lineMarked(logEntry) {
           this.set('atLeastOneMarked', true);
        },
        lineUnmarked(logEntry) {
            var marked = this.get('logEntryList').isAny('isMarked', true);
            if (!marked) {
                this.get('logEntryList').forEach(function(model) {
                model.set('isDimmed', false);
                });
                this.set('atLeastOneMarked', false);
            }
        },
        resetAllLogLines() {
            this.get('logEntryList').forEach(function(model) {
               model.set('isMarked', false); 
               model.set('isDimmed', false);
            });
           this.set('atLeastOneMarked', false);
        },
        dimAllNotSelectedLogLines() {
            var notSelected = this.get('logEntryList').filterBy('isMarked', false);
            
            notSelected.forEach(function(model) {
                 console.log(model);
                model.set('isDimmed', !model.get('isDimmed'));
            });
        },
        filterAllLogLines(filterValue) {
            if (filterValue.length > 0) {
                this.set('filterIsNotEmpty', true);
            } else {
                this.set('filterIsNotEmpty', false);
            }
            
            this.get('logEntryList').forEach(function(model) {
                console.log(model.get('verboseMessage'), model.get('verboseMessage').indexOf(filterValue));
               if(model.get('verboseMessage').indexOf(filterValue) === -1) {
                   model.set('isVisible', false);
               } else if (model.get('isVisible') === false) {
                   model.set('isVisible', true);
               }
            });
        }
    },
  
    attributeBindings:[
        'dataSpy:data-spy'
    ],
    dataSpy:'affix',
});
