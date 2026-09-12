// ==========================================
// 特效定义
// ==========================================
const 特效 = extend(ExplosionEffect, {
    waveRad: 12,
    waveRadBase: 0,
    waveColor: Color.valueOf("d42222"),
    waveStroke: 4,
    waveLife: 20,
    smokes: 0,
});

const 沉睡 = extend(UnitType, "沉睡", {});

沉睡.constructor = () => extend(UnitEntity, {
    update() {
        this.super$update();
    },

    damage(X) {
        特效.at(this.x, this.y);

        if (X > 1) {
            X = 15;
        }

        this.super$damage(X);
    },

    classId() {
        return 150;
    },

    write(write) {
        this.super$write(write);
    },

    read(read) {
        this.super$read(read);
    }
});

EntityMapping.idMap[150] = 沉睡.constructor;
exports.沉睡 = 沉睡;
// ========== 1. 概率闪避 (50%) ==========
        // 如果成功闪避，伤害变成 0(未经测试喵)原理是这玩意会生成0-1的随机数受击时，在0-0.5就是一半的概率会吧收到的伤害x0,但是纯随机，没有保底这一说法，你脸黑那就真的出不了
        //if (Math.random() < 0.5) {
            //X = X * 0; 
//||  只要满足其中一个条件，就触发
//&&两边都为true，才为true（严格