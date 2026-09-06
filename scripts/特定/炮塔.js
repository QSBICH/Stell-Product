const 防空机枪 = extend(ItemTurret, "防空机枪", {
    setBars() {
        this.super$setBars();
        this.addBar("预热进度", entity => new Bar(
            () => "预热进度 " + Math.floor(entity.预热倍率() * 100) + "%",
            () => Color.valueOf("ff8800"),
            () => entity.预热倍率() / 2
        ));
    },
});

防空机枪.buildType = () => extend(ItemTurret.ItemTurretBuild, 防空机枪, {
    n: 0,

    预热倍率() {
        return 1 + this.n / 100;
    },

    updateTile() {
        this.n -= 1;
        if (this.n < 0) this.n = 0;
        this.super$updateTile();
    },

    updateShooting() {
        this.n += 2;
        if (this.n > 100) this.n = 100;
        this.super$updateShooting();
    },

    shoot(b) {
        var 倍率 = this.预热倍率();
        var 新子弹 = b.copy();
        新子弹.damage *= 倍率;
        this.super$shoot(新子弹);
    },

    write(write) {
        this.super$write(write);
        write.f(this.n);
    },

    read(read, revision) {
        this.super$read(read, revision);
        this.n = read.f();
    }
});

exports.防空机枪 = 防空机枪;