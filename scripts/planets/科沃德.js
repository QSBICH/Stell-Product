const lib = require("base/lib");
const 科沃德 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new SunMesh(
            this, 6,                    // 行星网格精细度
            6, 0.5, 1.7, 1, 1,        // 噪声层数、衰减、缩放、对比度、放大倍数
            1,                        // 颜色缩放
            Color.valueOf("552222"),    // 核心暗红
            Color.valueOf("663333"),    // 深红
            Color.valueOf("773333"),    // 中间亮一点
            Color.valueOf("663333"),    // 深红
            Color.valueOf("552222"),    // 暗红
            Color.valueOf("331111")     // 边缘黑褐
        ));
        this.super$load();
    }
}, "科沃德", null, 10);                // 名称, 父级(null=恒星), 大小(10倍赛普罗)

// =====残日·垂死挣扎=====
科沃德.bloom = true;                    // 发光效果
科沃德.accessible = false;              // 不可降落
科沃德.hasAtmosphere = true;            // 有大气光晕
科沃德.atmosphereColor = Color.valueOf("88333380");  // 光晕颜色（深红，半透明）
科沃德.atmosphereRadIn = 0.5;           // 光晕内圈半径
科沃德.atmosphereRadOut = 3.0;          // 光晕外圈半径（巨大）
科沃德.lightColor = Color.valueOf("884444");  // 光照颜色（暗红）
科沃德.orbitRadius = 0;                 // 轨道半径(0=恒星中心)
科沃德.rotateTime = 1800;               // 自转周期(帧数, 1800=30秒)
科沃德.updateLighting = true;            // 产生光照
科沃德.localizedName = "科沃德";         // 显示名称
科沃德.visible = true;                  // 在星系图中可见
科沃德.alwaysUnlocked = true;//默认解锁
科沃德.iconColor = Color.valueOf("663333");  // 星系图图标颜色

// ===== 暗红色星云 =====
科沃德.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(科沃德, 5, 0.15, 0.3, 6,
        Color.valueOf("44222230"), 3, 0.15, 1.2, 0.1),
    new HexSkyMesh(科沃德, 6, 0.25, 0.45, 6,
        Color.valueOf("55222220"), 3, 0.1, 1.8, 0.05),
    new HexSkyMesh(科沃德, 4, 0.08, 0.2, 5,
        Color.valueOf("33111140"), 2, 0.2, 0.8, 0.08)
));

exports.科沃德 = 科沃德;

// ===== 关键：不关联原版太阳 =====
// 父级是 null，本身就是恒星
// 不给它设定 sector 或 startSector，独立存在