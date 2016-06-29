var src_find = require('tactics.sourceSelect')
var space = require('strategy.space').run();

var repairer = {
	run: function(creep) {
		if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        if(creep.memory.repairing) {
            var targets = space.find(FIND_STRUCTURES);
            targets = _.filter(targets, (str) => {
            	var isWall = str.structureType == STRUCTURE_WALL;
            	return isWall && str.hits <= 50000 || !isWall && str.hits < str.hitsMax * 0.8;
            });
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            src_find.run(creep);
        }
	}

}

module.exports = repairer;