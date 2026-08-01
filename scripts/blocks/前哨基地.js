const 前哨基地 = extend(CoreBlock, "前哨基地", 
 {
       canBreak(tile) { return Vars.state.teams.cores(tile.team()).size > 1; },
       canReplace(other) { return other.alwaysReplace; },
       canPlaceOn(tile, team) { return Vars.state.teams.cores(team).size < 2; },
 });
exports.前哨基地 = 前哨基地;