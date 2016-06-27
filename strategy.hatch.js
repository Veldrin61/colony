var desired_population = 
{
	'harvester': {'count': 3, setup: [WORK, CARRY, MOVE]},
	'builder': {'count': 6, setup: [WORK, CARRY, MOVE]},
	'uprader': {'count': 2, setup: [WORK, CARRY, MOVE]}
}

var hatch = {
	run: function(creeps_d){

		var creeps = Object.keys(creeps_d).map(function(k) {return creeps_d[k];});
        var keys = Object.keys(desired_population);
        
		for(var i=0; i<keys.length; ++i){
		    var key = keys[i];
		    var cnt = _.filter(creeps, function(o) {return o.memory.role == key;}).length;
		    
			if(cnt < desired_population[key].count){
				var src_id = Math.random() % 2;
				Game.spawns.Spawn.createCreep( desired_population[key].setup, key + (cnt+1), {role: key, source_id: src_id} );
				return;
			}
		}
	}
}

module.exports = hatch;