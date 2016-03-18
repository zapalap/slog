import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    verboseMessage(i) { return faker.hacker.phrase(); },
    shortMessage:'Costam',
    showing:true,
    isMarked:false,
    timestamp(i) { 
        var d = new Date();
        return d.getHours() + ':' +d.getMinutes() + ':' + d.getSeconds();
    }
});