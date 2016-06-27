var src_find = require('tactics.sourceSelect')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            src_find.run(creep);
        }
        else {
            var ext_tow = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            var spwn = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity;
                    }
            });
            if(ext_tow.length > 0) {
                if(creep.transfer(ext_tow[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ext_tow[0]);
                }
            }
            else if(spwn.length > 0){
                if(creep.transfer(spwn[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spwn[0]);
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