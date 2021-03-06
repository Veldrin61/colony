var space = require('strategy.space').run();

var desired_population = 
{
	'harvester': {'count': 6, type: 'worker'},
	'builder': {'count': 4, type: 'worker'},
	'upgrader': {'count': 8, type: 'worker'},
	'repairer': {'count': 6, type: 'worker'}
};

var maxEnergy = function(spawn) {
	var fromSpawn = 300; // spawn
	var level = spawn.room.controller.level;
	var exts = _.filter(Game.spawns.Spawn.room.find(FIND_STRUCTURES), (s) => {return s.structureType == STRUCTURE_EXTENSION}).length;
	var fromExts = exts * EXTENSION_ENERGY_CAPACITY[level];
	return fromSpawn + fromExts;
};

var composeWorker = function(spawn) {
	var total = maxEnergy(spawn) - 3*BODYPART_COST['move'];
	var result = [MOVE, MOVE, MOVE];
	while(total > BODYPART_COST['work'] + BODYPART_COST['carry']){
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
				var src_count = space.find(FIND_SOURCES).length;
				var src_id_seed = Math.random();
				var src_edge = 1/src_count;
				var src_id = 0;
				for(var j=0; j<src_count; ++j){
					if(src_id_seed > src_edge - 1/src_count && src_id_seed < src_edge){
						src_id = j;
						break;
					}
					src_edge += 1/src_count;
				}

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