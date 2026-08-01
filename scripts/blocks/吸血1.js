// 简化版：只给炮塔自身回血
const 吸血 = extend(ItemTurret, "吸血", {
    init() {
        this.super$init();
        this.healAmount = 20; // 每次击杀回复20生命
    },
    
    onKill(enemy) {
        this.super$onKill(enemy);
        
        // 给自身回血
        this.heal(this.healAmount);
        
        // 可选：添加视觉反馈
        Fx.heal.at(this.x, this.y);
        
        // 显示回血数字
        if (Vars.state.isGame()) {
            Call.label("+" + this.healAmount, 0.5, this.x, this.y);
        }
    }
});

exports.吸血 = 吸血;