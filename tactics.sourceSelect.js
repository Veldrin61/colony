var sourceFind = {
	run: function(creep) {
		var sources = creep.room.find(FIND_SOURCES);
		var src_id = creep.memory.source_id;
        if(creep.harvest(sources[src_id]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[src_id]);
        }
	}
}

module.exports = sourceFind;