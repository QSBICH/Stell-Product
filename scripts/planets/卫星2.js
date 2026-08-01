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
const {岛屿核心} = require('blocks/岛屿核心');
const {战线基地} = require("blocks/二代核心");
const {护卫} = require('planets/卫星');
const 潮星 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(潮星, 5, 6, Color.valueOf("4B5BABFF"),0.18, 6, 1, 0.04, 4),
            new NoiseMesh(潮星, 1, 7, Color.valueOf("4DA6FFFF"),0.22, 6, 1, 0.02, 1)
    )); //网格密度？
/*
NoiseMesh(Planet planet, int seed, int divisions, Color color, float radius, int octaves, float persistence, float scale, float mag)
行星，种子，精细度(网格细分次数)，颜色，半径，噪声层数，噪声衰减系数，缩放(噪声缩放)，幅值(强度、幅度)
*/
        this.super$load();
    }//行星构建
}, "潮星",护卫, 0.25);//名字: ,母星: ,大小: (单位塞普罗)

潮星.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(潮星, 2, 0.15, 0.14, 5, Color.valueOf("CAC2C2FF"), 2, 1, 1, 0.43),//种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
	new HexSkyMesh(潮星, 3, 0.6, 0.15, 5, Color.valueOf("DCD6D6FF"), 2, 1, 1.2, 0.45)
));

const c1 = Color.valueOf("#D2B48C"), c2 = Color.valueOf("#228B22"), c3 = Color.valueOf("#8B4513");//低地颜色c1高地颜色c2，特殊颜色c3
const sS = require("sectorSize");
sS.planetGrid(潮星, 1);//行星网格数量10*3^n+2

潮星.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
});

潮星.allowCampaignRules = true;//可使用规则
潮星.atmosphereColor = 潮星.lightColor = Color.valueOf("4e546f90");
潮星.landCloudColor = Color.valueOf("4e546f");//云层颜色
潮星.atmosphereRadIn = 1;//大气层内半径
潮星.atmosphereRadOut = 1;//星球大气层外半径
潮星.hasAtmosphere = true;//自身可看见大气层
潮星.lightSrcTo = 0.5;//区块光照变化
潮星.lightDstFrom = 0.5;//大气层
潮星.localizedName = "潮星";//行星名
潮星.visible = true;//星球是否可见
潮星.bloom = false;//光源（？）
潮星.updateLighting = true;//区块的昼夜交替
潮星.accessible = true;//星球是否可以到达
潮星.launchCapacityMultiplier = 0.5;//发射核心时最大可携带的资源量,“1”为发射的核心的100%容量,0.5为50%
潮星.allowLaunchSchematics = true;//开启发射核心蓝图
潮星.description = "一颗资源丰富的行星，但是他们早已登录，我们需要跟他们争夺地盘";//星球介绍
潮星.allowSectorInvasion = true;//模拟攻击图入侵
潮星.allowWaveSimulation = true;//模拟后台波次
潮星.alwaysUnlocked = true;//默认解锁
潮星.clearSectorOnLose = false;//不知道什么玩意,关了吧
潮星.allowLaunchLoadout = true;//允许带资源发射核心
潮星.startSector = 19;//星球起始公转方向(相对于太阳,1~360随便填)
潮星.orbitRadius = 2.5;//星球轨道半径
潮星.tidalLock = false//星球潮汐锁定
潮星.iconColor = Color.valueOf("4B5BABFF");//图标颜色
潮星.rotateTime = 120;//星球自转一周的时间
潮星.defaultCore = 岛屿核心;//默认发射核心

exports.潮星 = 潮星

exports.map1 = map1//地图排序

const map1 = new SectorPreset("荒芜岛屿", 潮星, 19);
map1.alwaysUnlocked = false;//默认解锁此区块
map1.difficulty = 2;//难度
map1.captureWave = 1//敌人波数
map1.description = "这里没有敌人驻守，可以进行初步发展";//统计资料顶上的简介
map1.localizedName = "荒芜岛屿";//区块名
exports.map1 = map1//地图排序
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map1, {
        parent: '岛屿核心',
        objectives: Seq.with(
            new Objectives.Research(战线基地),
        )
    });
});

const map2 = new SectorPreset("礁石群岛", 潮星, 18);
map2.alwaysUnlocked = false;//默认解锁此区块
map2.difficulty = 4;//难度
map2.captureWave = 20;//敌人波数
map2.description = "这里是分布着大量的岛屿，礁石早在上千年的时间里被海水侵蚀的体无完肤了，只剩下些许痕迹";//统计资料顶上的简介
map2.localizedName = "礁石群岛";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map2, {
        parent: "荒芜岛屿", objectives: Seq.with(new Objectives.SectorComplete(map1))
    });
});