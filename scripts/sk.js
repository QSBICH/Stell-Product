const 恢复 = extend(StatusEffect, "恢复", {});
const 核辐射 = extend(StatusEffect, "核辐射", {});
const 防御 = extend(StatusEffect, "防御", {});
const 奇袭 = extend(StatusEffect, "奇袭", {});
const 分解 = extend(StatusEffect, "分解", {});

const 处决 = extend(StatusEffect, "处决", {
    update(u, e) {
        this.super$update(u, e);
        if (u.health / u.maxHealth < 0.25) {
            u.killed();
        }
    }
});

module.exports = {
    防御: 防御,
    恢复: 恢复,
    奇袭: 奇袭,
    核辐射: 核辐射,
    处决: 处决,
    分解: 分解,
};