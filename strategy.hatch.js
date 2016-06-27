var desired_population = 
{
	'harvester': 3,
	'builder': 6,
	'uprader': 2
}

var hatch = {
	run: function(creeps_d){

		var creeps = Object.keys(creeps_d).map(function(k) {return creeps_d[k];});
        var keys = Object.keys(desired_population);
        
		for(var i=0; i<keys.length; ++i){
		    var key = keys[i];
		    var cnt = _.filter(creeps, function(o) {return o.memory.role == key;}).length;
		    
			if(cnt < desired_population[key]){
				Game.spawns.Spawn.createCreep( [WORK, CARRY, MOVE], key + (cnt+1), {role: key} );
				return;
			}
		}
	}
}

module.exports = hatch;