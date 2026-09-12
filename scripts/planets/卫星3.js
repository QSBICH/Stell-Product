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
const {前线基地} = require('blocks/核心');
const {战线基地} = require("blocks/二代核心");
const {科格拉斯} = require('planets/星球');
const 沃格克尔 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(沃格克尔, 5, 6, Color.valueOf("A9A9A9"),0.28, 6, 1, 0.18, 4),
            new NoiseMesh(沃格克尔, 1, 7, Color.valueOf("247F24FF"),0.35, 6, 1, 0.1, 1)
    )); //网格密度？
/*
NoiseMesh(Planet planet, int seed, int divisions, Color color, float radius, int octaves, float persistence, float scale, float mag)
行星，种子，精细度(网格细分次数)，颜色，半径，噪声层数，噪声衰减系数，缩放(噪声缩放)，幅值(强度、幅度)
*/
        this.super$load();
    }//行星构建
}, "沃格克尔",科格拉斯, 0.4);//名字: ,母星: ,大小: (单位塞普罗)

沃格克尔.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(沃格克尔, 2, 0.15, 0.14, 5, Color.valueOf("E5B68DFF"), 2, 1, 1, 0.43),//种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
	new HexSkyMesh(沃格克尔, 3, 0.6, 0.15, 5, Color.valueOf("6F4E3F80"), 2, 1, 1.2, 0.45)
));

const c1 = Color.valueOf("#D2B48C"), c2 = Color.valueOf("#228B22"), c3 = Color.valueOf("#8B4513");//低地颜色c1高地颜色c2，特殊颜色c3
const sS = require("sectorSize");
sS.planetGrid(沃格克尔, 1);//行星网格数量10*3^n+2

沃格克尔.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
});

沃格克尔.allowCampaignRules = true;//可使用规则
沃格克尔.atmosphereColor = 沃格克尔.lightColor = Color.valueOf("4e546f90");
沃格克尔.landCloudColor = Color.valueOf("4e546f");//云层颜色
沃格克尔.atmosphereRadIn = 1;//大气层内半径
沃格克尔.atmosphereRadOut = 1;//星球大气层外半径
沃格克尔.hasAtmosphere = true;//自身可看见大气层
沃格克尔.lightSrcTo = 0.5;//区块光照变化
沃格克尔.lightDstFrom = 0.5;//大气层
沃格克尔.localizedName = "沃格克尔";//行星名
沃格克尔.visible = true;//星球是否可见
沃格克尔.bloom = false;//光源（？）
沃格克尔.updateLighting = true;//区块的昼夜交替
沃格克尔.accessible = true;//星球是否可以到达
沃格克尔.description = "一颗资源丰富的行星，但是他们早已登录，我们需要跟他们争夺地盘";//星球介绍
沃格克尔.allowSectorInvasion = true;//模拟攻击图入侵
沃格克尔.allowWaveSimulation = true;//模拟后台波次
沃格克尔.alwaysUnlocked = true;//默认解锁
沃格克尔.clearSectorOnLose = false;//不知道什么玩意,关了吧
沃格克尔.allowLaunchLoadout = false;//允许带资源发射核心
沃格克尔.startSector = 9;//星球起始公转方向(相对于太阳,1~360随便填)
沃格克尔.orbitRadius = 22.5;//星球轨道半径
沃格克尔.tidalLock = false//星球潮汐锁定
沃格克尔.iconColor = Color.valueOf("247F24FF");//图标颜色
沃格克尔.rotateTime = 120;//星球自转一周的时间
沃格克尔.defaultCore = 前线基地;//默认发射核心

exports.沃格克尔 = 沃格克尔

const map1 = new SectorPreset("山林", 沃格克尔, 9);
map1.alwaysUnlocked = false;//默认解锁此区块
map1.difficulty = 2;//难度
map1.captureWave = 10;//敌人波数
map1.description = "这是一个与主星非常相似的星球，以至于可以共用科技";//统计资料顶上的简介
map1.localizedName = "山林";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map1, {
        parent: '前线基地',
        objectives: Seq.with(
            new Objectives.Research(战线基地),
        )
    });
});
exports.map1 = map1//地图排序

const map2 = new SectorPreset("狭长峡谷", 沃格克尔, 3);
map2.alwaysUnlocked = false;//默认解锁此区块
map2.difficulty = 6;//难度
map2.captureWave = 0;//敌人波数
map2.description = "这里布满了峡谷，地形非常陡峭，敌方占据了资源丰富的地区，留给你的只有贫瘠的墙矿，在这里还有一项特殊的任务等着你";//统计资料顶上的简介
map2.localizedName = "狭长峡谷";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map1, {
        parent: "山林", objectives: Seq.with(new Objectives.SectorComplete(map1))
    });
});
exports.map2 = map2//地图排序