const lib = require("base/lib");
const 科沃德 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new SunMesh(
            this, 6,
            5, 0.3, 1.7, 1.2, 1,
            1.1,
            Color.valueOf("ff7a38"),
            Color.valueOf("ff9638"),
            Color.valueOf("ffc64c"),
            Color.valueOf("ffc64c"),
            Color.valueOf("ffe371"),
            Color.valueOf("f4ee8e")
        ));
        this.super$load();
    }//行星构建
}, "科沃德", null, 8);
科沃德.bloom = true;
科沃德.accessible = false;
/*
public SunMesh(planet, divisions, octaves, persistence, scl, pow, mag, colorScale, colors)
行星，精细度，噪声层数，衰减，缩放，噪声对比度，噪声放大倍数，颜色缩放（控制明暗），颜色（多个，决定色彩分布）
*/
exports.科沃德 = 科沃德;