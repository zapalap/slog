import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'span',
    isMarked:false,
    actions:{
        markClicked() {
            var marked = this.get('isMarked');
            if(marked) {
               this.get('onUnmark')(); 
            }
            
            if(!marked) {
                this.get('onMark')();
            }
        }
    }
});
