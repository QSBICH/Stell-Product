// ==========================================
// 特效定义（必须在最前面！）
// ==========================================
const 特效 = extend(ExplosionEffect, {
    waveRad: 12,
    waveRadBase: 0,
    waveColor: Color.valueOf("d42222"),
    waveStroke: 4,
    waveLife: 20,
    smokes: 0,
});

// ==========================================
// 沉睡SK（special skill）
// ==========================================
const 沉睡 = extend(UnitType, "沉睡", {});  // 必须用 UnitType，下面随意
沉睡.constructor = () => extend(UnitEntity, {
    // [每帧更新] 单位活着的时候会一直执行
    update() {
        this.super$update(); // [必留]原版的移动逻辑
    },

    // [受击处理] 敌人打中单位时触发
    damage(X) {
        特效.at(this.x, this.y);
        // 只要伤害大于1，damage=15 X或许可以换吧，我懒得换ORZ
        if (X > 1) {
            X = 15;
        }
        // 如果还有其他减伤逻辑，只在这一个地方改JS中÷其实是 x/y
        // [必留] 把修改后的伤害传给原版扣血（且只能调用这一次！）
        this.super$damage(X); 
    },

    // [存档ID] 独一无二的数字（0~255之间）不要乱动，不然单位的数据会反复消失
    classId() { 
        return 150;
    },

    // [存档写入]
    write(write) {
        this.super$write(write);
    },

    // [存档读取]
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