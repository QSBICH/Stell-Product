//此代码来自无限宇宙
/*
待研究
        gier = makeAsteroid("gier", erekir, Blocks.ferricStoneWall, Blocks.carbonWall, -5, 0.4f, 7, 1f, gen -> {
            gen.min = 25;
            gen.max = 35;
            gen.carbonChance = 0.6f;
            gen.iceChance = 0f;
            gen.berylChance = 0.1f;
        });
*/
const lib = require("base/lib");
const {前线基地} = require("blocks/核心");
const {科沃德} = require("planets/科沃德");
const {战线基地} = require("blocks/二代核心");
const {细胞培养皿} = require("特定/工厂");

const 科格拉斯 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(科格拉斯, 5, 6, Color.valueOf("#D2B48C"),1.8, 6, 1, 0.1, 4),
            new NoiseMesh(科格拉斯, 1, 7, Color.valueOf("#228B22"),2.2, 6, 1, 0.2, 1)
    )); //网格密度？
/*
NoiseMesh(Planet planet, int seed, int divisions, Color color, float radius, int octaves, float persistence, float scale, float mag)
行星，种子，精细度(网格细分次数)，颜色，半径，噪声层数，噪声衰减系数，缩放(噪声缩放)，幅值(强度、幅度)
*/
        this.super$load();
    }//行星构建
}, "科格拉斯", 科沃德, 2.5);//名字: ,母星: ,大小: (单位塞普罗)

科格拉斯.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(科格拉斯, 2, 0.15, 0.14, 5, Color.valueOf("7E493380"), 2, 1, 1, 0.43),//种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
	new HexSkyMesh(科格拉斯, 3, 0.6, 0.15, 5, Color.valueOf("E3A876FF"), 2, 1, 1.2, 0.45)
));

const c1 = Color.valueOf("#D2B48C"), c2 = Color.valueOf("#228B22"), c3 = Color.valueOf("#8B4513");//低地颜色c1高地颜色c2，特殊颜色c3
const sS = require("sectorSize");
sS.planetGrid(科格拉斯, 3);//行星网格数量10*3^n+2

科格拉斯.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
});

科格拉斯.allowCampaignRules = true;//可使用规则
科格拉斯.atmosphereColor = 科格拉斯.lightColor = Color.valueOf("4e546f90");
科格拉斯.landCloudColor = Color.valueOf("4e546f");//云层颜色
科格拉斯.atmosphereRadIn = 1;//大气层内半径
科格拉斯.atmosphereRadOut = 1;//星球大气层外半径
科格拉斯.hasAtmosphere = true;//自身可看见大气层
科格拉斯.lightSrcTo = 0.5;//区块光照变化
科格拉斯.lightDstFrom = 0.5;//大气层
科格拉斯.localizedName = "科格拉斯";//行星名
科格拉斯.visible = true;//星球是否可见
科格拉斯.bloom = false;//光源（？）
科格拉斯.updateLighting = true;//区块的昼夜交替
科格拉斯.accessible = true;//星球是否可以到达
科格拉斯.launchCapacityMultiplier = 0.5;//发射核心时最大可携带的资源量,“1”为发射的核心的100%容量,0.5为50%
科格拉斯.allowLaunchSchematics = true;//开启发射核心蓝图
科格拉斯.description = "一颗资源丰富的行星，但是他们早已登录，我们需要跟他们争夺地盘";//星球介绍
科格拉斯.allowSectorInvasion = true;//模拟攻击图入侵
科格拉斯.allowWaveSimulation = true;//模拟后台波次
科格拉斯.alwaysUnlocked = true;//默认解锁
科格拉斯.clearSectorOnLose = false;//不知道什么玩意,关了吧
科格拉斯.allowLaunchLoadout = true;//允许带资源发射核心
科格拉斯.startSector = 83;//我以前写的没改，这里写你第一个区块的区块ID，否则会报错
科格拉斯.orbitRadius = 100;//星球轨道半径
科格拉斯.tidalLock = false//星球潮汐锁定
科格拉斯.iconColor = Color.valueOf("#228B22");//图标颜色
科格拉斯.rotateTime = 476;//星球自转一周的时间
科格拉斯.defaultCore = 前线基地;//默认发射核心

exports.科格拉斯 = 科格拉斯

const map1 = new SectorPreset("降落区", 科格拉斯, 83);
map1.alwaysUnlocked = false;//默认解锁此区块
map1.difficulty = 1;//难度
map1.captureWave = 10;//敌人波数
map1.description = "我们从这块区域降落，没有极端高温，没有防备力量，可以进行初步发展";//统计资料顶上的简介
map1.localizedName = "降落区";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map1, {
        parent: "前线基地",
	     objectives: Seq.with(new Objectives.SectorComplete(SectorPresets.planetaryTerminal))
    });
});
exports.map1 = map1//地图排序

const map2 = new SectorPreset("盆地", 科格拉斯, 84);
map2.alwaysUnlocked = false;//默认解锁此区块
map2.difficulty = 2;//难度
map2.captureWave = 20//敌人波数
map2.description = "这里拥有更加丰富的资源，同时也有一定的敌人驻守";//统计资料顶上的简介
map2.localizedName = "盆地";//区块名
exports.map2 = map2//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map2, {
        parent: '降落区',
        objectives: Seq.with(
            new Objectives.SectorComplete(map1)
        )
    });
});

const map3 = new SectorPreset("矿区遗迹", 科格拉斯, 195);
map3.alwaysUnlocked = false;//默认解锁此区块
map3.difficulty = 4;//难度
map3.captureWave = 25//敌人波数
map3.description = "这里有敌人开采过的痕迹，或许在这能找到些许矿物";//统计资料顶上的简介
map3.localizedName = "矿区遗迹";//区块名
exports.map3 = map3//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map3, {
        parent: '盆地',
        objectives: Seq.with(
            new Objectives.SectorComplete(map2)
        )
    });
});

const map4 = new SectorPreset("熔岩要塞", 科格拉斯, 3);
map4.alwaysUnlocked = false;//默认解锁此区块
map4.difficulty = 6;//难度
map4.description = "这里有敌人驻扎，拿下就能获得更多的资源和技术";//统计资料顶上的简介
map4.localizedName = "熔岩要塞";//区块名
exports.map4 = map4//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map4, {
        parent: '矿区遗迹',
        objectives: Seq.with(
            new Objectives.SectorComplete(map3)
        )
    });
});

const map5 = new SectorPreset("机器人组装厂", 科格拉斯, 49);
map5.alwaysUnlocked = false;//默认解锁此区块
map5.difficulty = 8;//难度
map5.captureWave = 20//敌人波数
map5.description = "被遗弃的机器人组装厂，但任有巡逻队还有未知兵种";//统计资料顶上的简介
map5.localizedName = "机器人组装厂";//区块名
exports.map5 = map5//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map5, {
        parent: '熔岩要塞',
        objectives: Seq.with(
            new Objectives.SectorComplete(map4)
        )
    });
});

const map6 = new SectorPreset("火山口", 科格拉斯, 202);
map6.alwaysUnlocked = false;//默认解锁此区块
map6.difficulty = 10;//难度
map6.description = "我们本想在这驻扎，但是我们来晚一步，敌人已经部署了基本防线，敌人的防御非常强还有极其恶劣的天气";//统计资料顶上的简介
map6.localizedName = "火山口";//区块名
exports.map6 = map6//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map6, {
        parent: '熔岩要塞',
        objectives: Seq.with(
            new Objectives.SectorComplete(map11)
        )
    });
});

const map7 = new SectorPreset("熔岩通道", 科格拉斯, 111);
map7.alwaysUnlocked = false;//默认解锁此区块
map7.difficulty = 4;//难度
map7.captureWave = 10//敌人波数
map7.description = "这里是熔岩要塞与火山口的连接通道";//统计资料顶上的简介
map7.localizedName = "熔岩通道";//区块名
exports.map7 = map7//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map7, {
        parent: '熔岩要塞',
        objectives: Seq.with(
            new Objectives.SectorComplete(map5)
        )
    });
});
const map8 = new SectorPreset("通讯站", 科格拉斯, 226);
map8.alwaysUnlocked = false;//默认解锁此区块
map8.difficulty = 4;//难度
map8.captureWave = 5//敌人波数
map8.description = "我们在这建立了信号塔，保护好信号塔，这是我们与总部联系的关键";//统计资料顶上的简介
map8.localizedName = "通讯站";//区块名
exports.map8 = map8//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map8, {
        parent: '机器人组装厂',
        objectives: Seq.with(
            new Objectives.SectorComplete(map5)
        )
    });
});

const map9 = new SectorPreset("洛斯河", 科格拉斯, 199);
map9.alwaysUnlocked = false;//默认解锁此区块
map9.difficulty = 4;//难度
map9.captureWave = 10//敌人波数
map9.description = "根据检测，这块区域有2个地雷，同时有新的资源";//统计资料顶上的简介
map9.localizedName = "洛斯河";//区块名
exports.map9 = map9//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map9, {
        parent: '通讯站',
        objectives: Seq.with(
            new Objectives.SectorComplete(map8)
        )
    });
});

const map10 = new SectorPreset("导弹发射井", 科格拉斯, 194);
map10.alwaysUnlocked = false;//默认解锁此区块
map10.difficulty = 6;//难度
map10.description = "敌人在这建造了导弹发射井，根据检测敌人正在准备发射导弹对我们的区块进行打击";//统计资料顶上的简介
map10.localizedName = "导弹发射井";//区块名
exports.map10 = map10//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map10, {
        parent: '熔岩通道',
        objectives: Seq.with(
            new Objectives.SectorComplete(map6)
        )
    });
});

const map11 = new SectorPreset("单位合成区", 科格拉斯, 19);
map11.alwaysUnlocked = false;//默认解锁此区块
map11.difficulty = 6;//难度
map11.captureWave = 20//敌人波数
map11.description = "这里有些许单位重构厂的遗骸，或许能够研究新的技术";//统计资料顶上的简介
map11.localizedName = "单位合成区";//区块名
exports.map11 = map11//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map11, {
        parent: '洛斯河',
        objectives: Seq.with(
            new Objectives.SectorComplete(map8)
        )
    });
});

const map12 = new SectorPreset("数据库中心遗骸", 科格拉斯, 225);
map12.alwaysUnlocked = false;//默认解锁此区块
map12.difficulty = 6;//难度
map12.captureWave = 30//敌人波数
map12.description = "这里是被敌人抛弃的区域，似乎能获取一些新的技术";//统计资料顶上的简介
map12.localizedName = "数据库中心遗骸";//区块名
exports.map12 = map12//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map12, {
        parent: '机器人组装厂',
        objectives: Seq.with(
            new Objectives.SectorComplete(map5)
        )
    });
});

const map13 = new SectorPreset("辐射区", 科格拉斯, 62);
map13.alwaysUnlocked = false;//默认解锁此区块
map13.difficulty = 8;//难度
map13.captureWave = 40//敌人波数
map13.description = "这里终年被辐射尘埃覆盖，同时此处有大量的敌人，但也有新的矿物";//统计资料顶上的简介
map13.localizedName = "辐射区";//区块名
exports.map13 = map13//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map13, {
        parent: '单位合成区',
        objectives: Seq.with(
            new Objectives.SectorComplete(map12)
        )
    });
});

const map14 = new SectorPreset("细胞森林", 科格拉斯, 175);
map14.alwaysUnlocked = false;//默认解锁此区块
map14.difficulty = 4;//难度
map14.captureWave = 20//敌人波数
map14.description = "这里拥有着培养细胞的环境，或许可以获取一些新的材料与技术？";//统计资料顶上的简介
map14.localizedName = "细胞森林";//区块名
exports.map14 = map14//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map14, {
        parent: '熔岩通道',
        objectives: Seq.with(
            new Objectives.SectorComplete(map7)
        )
    });
});

const map15 = new SectorPreset("增殖区", 科格拉斯, 41);
map15.alwaysUnlocked = false;//默认解锁此区块
map15.difficulty = 8;//难度
map15.description = "这里紧挨着细胞森林，在这里或许能够习得更好的技术";//统计资料顶上的简介
map15.localizedName = "增殖区";//区块名
exports.map15 = map15//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map15, {
        parent: '辐射区',
objectives: Seq.with(
            new Objectives.SectorComplete(map13),
            new Objectives.Research(细胞培养皿)
        )
    });
});

const map16 = new SectorPreset("资源前哨", 科格拉斯, 50);
map16.alwaysUnlocked = false;//默认解锁此区块
map16.difficulty = 6;//难度
map16.description = "这里掌握着敌方些许物流，占领这里可以获得更新的技术";//统计资料顶上的简介
map16.localizedName = "资源前哨";//区块名
exports.map16 = map16//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map16, {
        parent: '导弹发射井',
objectives: Seq.with(
            new Objectives.SectorComplete(map6),
            new Objectives.Research(战线基地)
        )
    });
});

const map17 = new SectorPreset("石油钻井平台", 科格拉斯, 129);
map17.alwaysUnlocked = false;//默认解锁此区块
map17.difficulty = 4;//难度
map17.description = "敌人在这里大量开采石油，我们或许可以占领这里获取技术";//统计资料顶上的简介
map17.localizedName = "石油钻井平台";//区块名
exports.map17 = map17//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map17, {
        parent: '资源前哨',
objectives: Seq.with(
            new Objectives.SectorComplete(map16),
        )
    });
});

const map18 = new SectorPreset("黄金入口", 科格拉斯, 265);
map18.alwaysUnlocked = false;//默认解锁此区块
map18.captureWave = 15//敌人波数
map18.difficulty = 2;//难度
map18.description = "这里曾经是原住民的淘金厂，这里或许还有一些原住民留下的东西";//统计资料顶上的简介
map18.localizedName = "黄金入口";//区块名
exports.map18 = map18//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map18, {
        parent: '熔岩通道',
objectives: Seq.with(
            new Objectives.SectorComplete(map6)
        )
    });
});

const map19 = new SectorPreset("工业区2号", 科格拉斯, 140);
map19.alwaysUnlocked = false;//默认解锁此区块
map19.captureWave = 40//敌人波数
map19.difficulty = 8;//难度
map19.description = "由于这里的矿产资源丰富和气候环境宜人，原住民在这里搭建了工业区，即使被敌人驱逐也留下了很多废墟";//统计资料顶上的简介
map19.localizedName = "工业区2号";//区块名
exports.map19 = map19//地图排序
Events.on(ContentInitEvent, (e) => {
lib.addToResearch(map19, {
        parent: '石油钻井平台',
objectives: Seq.with(
            new Objectives.SectorComplete(map13)
        )
    });
});

const map20 = new SectorPreset("核电站", 科格拉斯, 123);
map20.alwaysUnlocked = false;//默认解锁此区块
map20.captureWave = 30//敌人波数
map20.difficulty = 8;//难度
map20.description = "这里消灭的原因不是敌人的进攻，而是在内部坍塌，一切始于上司对下属的压榨，但是这里仍然有大量敌人在附近\ngood luck for u!";//统计资料顶上的简介
map20.localizedName = "核电站";//区块名
exports.map20 = map20//地图排序
Events.on(ContentInitEvent, (e) => {
lib.addToResearch(map20, {
        parent: '辐射区',
objectives: Seq.with(
            new Objectives.SectorComplete(map13)
        )
    });
});

const map21 = new SectorPreset("废墟遗址", 科格拉斯, 91);
map21.alwaysUnlocked = false;//默认解锁此区块
map21.captureWave = 20//敌人波数
map21.difficulty = 4;//难度
map21.description = "这里曾是以前科格拉斯人的居民区，但是遭到了未知势力侵袭\n经调查并不是目前的敌人所为，是一个未知的阵营";//统计资料顶上的简介
map21.localizedName = "废墟遗址";//区块名
exports.map21 = map21//地图排序
Events.on(ContentInitEvent, (e) => {
lib.addToResearch(map21, {
        parent: '石油钻井平台',
objectives: Seq.with(
            new Objectives.SectorComplete(map17)
        )
    });
});

const map22 = new SectorPreset("激光技术总部", 科格拉斯, 177);
map22.alwaysUnlocked = false;//默认解锁此区块
map22.difficulty = 6;//难度
map22.description = "在这里我们或许可以获取新的，革命性的技术!";//统计资料顶上的简介
map22.localizedName = "激光技术总部";//区块名
exports.map22 = map22//地图排序
Events.on(ContentInitEvent, (e) => {
lib.addToResearch(map22, {
        parent: '废墟遗址',
objectives: Seq.with(
            new Objectives.SectorComplete(map19)
        )
    });
});