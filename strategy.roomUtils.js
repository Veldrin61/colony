var roomUtils = {
	maxEnergy: function(spawn){
		var fromSpawn = 300; // spawn
		var level = spawn.room.controller.level;
		var fromExts = spawn.room.find(STRUCTURE_EXTENSION).length * EXTENSION_ENERGY_CAPACITY[level];
		return fromSpawn + fromExts;
	}
	
}

module.export = roomUtils;