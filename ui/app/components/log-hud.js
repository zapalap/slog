import Ember from 'ember';

export default Ember.Component.extend({
  socketService: Ember.inject.service('socket-io'),

  willRender() {
    var self = this;
    const socket = this.get('socketService').socketFor('http://localhost:3000');
    socket.on('message', function(event) {
      let newEntry = {
          verboseMessage:event.data.text,
          shortMessage:event.data.text,
          showing:true,
          isMarked:false,
          isVisible:true,
          timestamp:event.data.timestamp
      }
      console.log(newEntry);
      self.get('logEntryList').pushObject(newEntry);
    })
  },
  menuShouldShow: Ember.computed.or('atLeastOneMarked', 'filterIsNotEmpty'),
  atLeastOneMarked: false,
  filterIsNotEmpty: Ember.computed.notEmpty('filterValue'),
  filterValue:'',
  filteredLogs: Ember.computed('filterValue', function() {
    let filterValue = this.get('filterValue');
    return this.get('logEntryList').filter(function(entry) {
      return entry.get('verboseMessage').includes(filterValue);
    });
  }),
  actions: {
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
      this.set('filterValue', '');
      this.set('atLeastOneMarked', false);
    },
    dimAllNotSelectedLogLines() {
      var notSelected = this.get('logEntryList').filterBy('isMarked', false);

      notSelected.forEach(function(model) {
        console.log(model);
        model.set('isDimmed', !model.get('isDimmed'));
      });
    }
  },

  attributeBindings: [
    'dataSpy:data-spy'
  ],
  dataSpy: 'affix',
});
