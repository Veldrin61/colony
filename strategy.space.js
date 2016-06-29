var space = {
	run: function() {
		var rooms = [Game.spawns.Spawn.room];

		var leftRoomKey = Game.map.describeExits('E36S7')['7'];
		rooms.push(Game.rooms[leftRoomKey]);
		console.log(rooms);

		return {
			find: function(query){
				var result = [];
				for(var i=0; i<rooms.length; ++i){

					result.concat(rooms[i].find(query));
				}
				return result;
			}
		};
	}
}

module.exports = space;