var desired_population = 
{
	'harvester': {'count': 4, type: 'worker'},
	'builder': {'count': 4, type: 'worker'},
	'upgrader': {'count': 4, type: 'worker'},
	'repairer': {'count': 1, type: 'worker'}
};

var maxEnergy = function(spawn) {
	var fromSpawn = 300; // spawn
	var level = spawn.room.controller.level;
	var fromExts = spawn.room.find(STRUCTURE_EXTENSION).length * EXTENSION_ENERGY_CAPACITY[level];
	return fromSpawn + fromExts;
};

var composeWorker = function(spawn) {
	var total = maxEnergy(spawn) - BODYPART_COST['move'];
	var result = [MOVE];
	for(var i=0; i<total; ++i){
		result.push(WORK);
		result.push(CARRY);
		total -= BODYPART_COST['work'] + BODYPART_COST['carry'];
	}

	if(total >= BODYPART_COST['carry'])
		result.push(CARRY);
	return result;
};

var hatch = {
	run: function(spawn) {

		var creeps = Object.keys(Game.creeps).map(function(k) {return Game.creeps[k];});
        var keys = Object.keys(desired_population);
        
		for(var i=0; i<keys.length; ++i){
		    var key = keys[i];
		    var cnt = _.filter(creeps, function(o) {return o.memory.role == key;}).length;
		    
			if(cnt < desired_population[key].count){
				var src_id = (Math.floor(Math.random() * (1000 - 10)) + 10) % 2;
				for(var j=0; j<desired_population[key].count; ++j) {
					var xst = Game.creeps[key + j];
					if(!xst) {
						spawn.createCreep(composeWorker(spawn), key + j, {role: key, source_id: src_id} );
						return;
					}
				}
			}
		}
	}
}

module.exports = hatch;