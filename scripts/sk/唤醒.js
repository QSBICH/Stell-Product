const 状态=require("sk");
//当你试图引用特效那你将离报错不远了
const 特效=extend(ExplosionEffect,{
    waveRad:12,
    waveRadBase:0,
    waveColor:Color.valueOf("d42222"),
    waveStroke:4,
    waveLife:20,
    smokes:0
});//效果是一个红色的圆环状的冲击波类似
const 唤醒=extend(UnitType,"唤醒",{});
唤醒.constructor=()=>extend(UnitEntity,{
    n:0,
    update(){
        this.super$update();
        this.n+=1;
        if(this.n>=1800){
            this.apply(状态.奇袭,900);//60 = 1s 上面的1.8k根据帧率算的，其实就是1.8k帧率，60fps就是30s，我一般运行到200-300fps10秒不到((())) 状态.奇袭可以看出 引用的文件给的名字.效果名（前提是引用的文件内部有
            特效.at(this.x,this.y);
            this.heal(this.maxHealth*0.1);//百分比回血，这个兵330就是33点
            this.n=0;//这些执行完就回到0进行重新蓄力
        }
    },

    damage(X){
        特效.at(this.x,this.y);
        if(X>1) X=15;
        this.super$damage(X)
    },//看沉睡

    displayBars(unit,bars){
        this.super$displayBars(unit,bars);
        bars.add(()=>new Bar(
            ()=>"能量条",
            ()=>Color.valueOf("FF9900"),
            ()=>unit.n/1800
        ));//不知道为啥没用，看个乐呵吧
    },
    classId(){
        return 152;//存档ID 看沉睡
    },
    write(write){
        this.super$write(write);
        write.f(this.n);
    },
    read(read){
        this.super$read(read);
        this.n=read.f();//读取 写入
    }
});

EntityMapping.idMap[152]=唤醒.constructor;

exports.唤醒=唤醒;
// ====== 根据血量回血（模板） ======
        // let aa = this.health;
        // if (this.health < 300) {
        //     this.heal(300);
        // } else if (this.health > 300) {
        //     this.heal(500);
        // } else {
        //     this.heal(this.maxHealth * 1.0); // 百分比回血
        // }
        // ================================效果是小于300血恢复300 大于300恢复500 其他情况恢复百分之100 仅供参考，未经测试!!!