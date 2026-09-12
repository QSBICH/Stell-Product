const 特效 = extend(ExplosionEffect, {
    waveRad: 12,
    waveRadBase: 0,
    waveColor: Color.valueOf("ff0000"),
    waveStroke: 4,
    waveLife: 15,
    smokes: 0,
});

const 小铁墙 = extend(Wall, "小铁墙", {});
exports.小铁墙 = 小铁墙;

const 大铁墙 = extend(Wall, "大铁墙", {});
exports.大铁墙 = 大铁墙;

const 小钢铁墙 = extend(Wall, "小钢铁墙", {});
exports.小钢铁墙 = 小钢铁墙;

const 大钢铁墙 = extend(Wall, "大钢铁墙", {});
exports.大钢铁墙 = 大钢铁墙;

const 小红宝石墙 = extend(Wall, "小红宝石墙", {});
exports.小红宝石墙 = 小红宝石墙;

const 大红宝石墙 = extend(Wall, "大红宝石墙", {});
exports.大红宝石墙 = 大红宝石墙;

const 小钻石墙 = extend(Wall, "小钻石墙", {});
exports.小钻石墙 = 小钻石墙;

const 大钻石墙 = extend(Wall, "大钻石墙", {});
exports.大钻石墙 = 大钻石墙;

const 小钢钛合金墙 = extend(Wall, "小钢钛合金墙", {});
exports.小钢钛合金墙 = 小钢钛合金墙;

const 大钢钛合金墙 = extend(Wall, "大钢钛合金墙", {});
大钢钛合金墙.buildType = () => extend(Wall.WallBuild, 大钢钛合金墙, {
    handleDamage(X){
        // 在被攻击时原地产生特效
        特效.at(this.x, this.y);
        
        // 用 if 语句进行伤害判定（只需要 复制就能添加判断逻辑）
        if (X < 50) {
            return X * 0.9;  // 减免10%
        } else if (X >= 50 && X < 200) {
            return X * 0.85;  // 减免15%
        } else if (X >= 200) {
            return X * 0.8;  // 全免疫
        } else {
            return X * 0.75;  // 如果前面都不匹配
        }
    }
});
exports.大钢钛合金墙 = 大钢钛合金墙;

const 钢铁闸门 = extend(AutoDoor, "钢铁闸门", {});
exports.钢铁闸门 = 钢铁闸门;