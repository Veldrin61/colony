var src_find = require('tactics.sourceSelect')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            src_find.run(creep);
        }
        else {
            var target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            target = _.sortBy(target, (str) => {return str.energyCapacity - str.energy});
            
            if(target.length > 0) {
                if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0]);
                }
            }
            else {
                var flags = creep.room.find(FIND_FLAGS);
                var target = _.filter(flags, (f) => {return f.color == COLOR_YELLOW});
                creep.moveTo(target);
            }
        }
	}
};

module.exports = roleHarvester;