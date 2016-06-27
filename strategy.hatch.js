var desired_population = 
{
	'harvester': 6,
	'builder': 2,
	'uprader': 1
}

var hatch = {
	run: function(creeps){
		for(var key in Object.keys(desired_population)){
			var cnt = _.filter(creeps, function(o) {o.memory.role == key}).length;
			if(cnt < desired_population[key]){
				Game.spawns.Spawn.createCreep( [WORK, CARRY, MOVE], key + (cnt+1), {role: key} );
				return;
			}
		}
	}
}

module.exports = hatch;