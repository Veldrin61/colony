var roleModel = {
    'harvester': require('role.harvester'),
    'upgrader': require('role.upgrader'),
    'builder' : require('role.builder'),
    'repairer' : require('role.repairer')
}

var hatch = require('strategy.hatch');

module.exports.loop = function () {

    if(!Game.spawns.Spawn.spawning)
        hatch.run(Game.creeps);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.ticksToLive <= 600){
            creep.moveTo(Game.spawns.Spawn);
            Game.spawns.Spawn.renewCreep(creep);
        }

        roleModel[creep.memory.role].run(creep);
    }
}