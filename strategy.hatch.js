var desired_population = 
{
	'harvester': {'count': 4, 'setup': [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE]},
	'builder': {'count': 4, 'setup': [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE]},
	'upgrader': {'count': 4, 'setup': [WORK, WORK, CARRY, CARRY, MOVE]},
	'repairer': {'count': 1, 'setup': [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE]}
}

var hatch = {
	run: function(creeps_d){

		var creeps = Object.keys(creeps_d).map(function(k) {return creeps_d[k];});
        var keys = Object.keys(desired_population);
        
		for(var i=0; i<keys.length; ++i){
		    var key = keys[i];
		    var cnt = _.filter(creeps, function(o) {return o.memory.role == key;}).length;
		    
			if(cnt < desired_population[key].count){
				var src_id = (Math.floor(Math.random() * (1000 - 10)) + 10) % 2;
				for(var j=0; j<desired_population[key].count; ++j){
				    var result = Game.spawns.Spawn.createCreep( desired_population[key].setup, key + j, {role: key, source_id: src_id} );
					console.log('spawning:' + key, result);
					if(result != -3) return;
				}
			}
		}
	}
}

module.exports = hatch;