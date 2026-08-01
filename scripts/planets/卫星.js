const lib = require("base/lib");
const {一阶核心} = require('blocks/一阶核心');
const {战线基地} = require('blocks/二代核心');
const {科格拉斯} = require('planets/星球');
const 护卫 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new HexMesh(护卫, 5));//行星网格
        this.super$load();
    }//行星构建
}, "护卫",科格拉斯 , 0.5);//类型:行星

const c1 = Color.valueOf("#228B22"), c2 = Color.valueOf("#D2B48C"), c3 = Color.valueOf("4e546f90");//行星总体颜色
const sS = require("sectorSize");
sS.planetGrid(护卫, 1);//行星网格数量10*3的n次幂+2

护卫.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(护卫, 2, 0.15, 0.14, 5, Color.valueOf("91A0B080"), 2, 0.42, 0.5, 0.43),//种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
	new HexSkyMesh(护卫, 3, 0.6, 0.16, 5, Color.valueOf("6E7A8DFF"), 2, 0.42, 1.2, 0.45)
));
护卫.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
    getColor(position) {
        var depth = Simplex.noise3d(4, 4, 0.56, 1, position.x, position.y, position.z) / 2;/*三维柏林噪声生成
        变量 深度 =三维柏林噪声(种子,精细度,衰减系数,缩放比,xyz位置)/2 */
        return c1.write(c3).lerp(c2, Mathf.clamp(Mathf.round(depth, 0.25)));//返回值
    },
});
护卫.minZoom = 0.6;
护卫.allowCampaignRules = true;//见科格拉斯
护卫.atmosphereColor = 护卫.lightColor = Color.valueOf("4e546f90");
护卫.landCloudColor = Color.valueOf("4e546f");//云层颜色
护卫.atmosphereRadIn = 0;
护卫.atmosphereRadOut = 0.5;//星球大气层厚度
护卫.hasAtmosphere = true;//自身可看见大气层
护卫.lightSrcTo = 0.5;//区块光照变化
护卫.lightDstFrom  = 0.5;//大气层
护卫.localizedName = "护卫";//行星名
护卫.visible = true;//星球是否可见
护卫.bloom = false;//光源（？）
护卫.atmosphereColor = 护卫.lightColor = Color.valueOf("4e546f90");//大气颜色光效
护卫.updateLighting = true;//区块的昼夜交替
护卫.accessible = true;//星球是否可以到达
护卫.launchCapacityMultiplier = 0.5;//发射核心时最大可携带的资源量,“1”为发射的核心的100%容量,0.5为50%
护卫.allowLaunchSchematics = true;//开启发射核心蓝图
护卫.description = "敌人在这驻扎了指挥部";//星球介绍
护卫.allowSectorInvasion = true;//模拟攻击图入侵
护卫.allowWaveSimulation = true;//模拟后台波次
护卫.alwaysUnlocked = true;//默认解锁
护卫.clearSectorOnLose = false;//不知道什么玩意,关了吧
护卫.allowLaunchLoadout = true;//允许带资源发射核心
护卫.startSector = 0;//星球起始公转方向(相对于太阳,1~360随便填)
护卫.orbitRadius = 10;//星球轨道半径
护卫.tidalLock = true//星球潮汐锁定
护卫.iconColor = Color.valueOf("#6e7a8d");//图标颜色
护卫.rotateTime = 300;//星球自转一周的时间
护卫.defaultCore = 一阶核心;//默认发射核心

exports.护卫 = 护卫

const map1 = new SectorPreset("始发地区", 护卫, 0);
map1.alwaysUnlocked = false;//默认解锁此区块
map1.difficulty = 4;//难度
map1.captureWave = 5;//敌人波数
map1.description = "我们从主星发射，到这个卫星防备力量最弱的区域";//统计资料顶上的简介
map1.localizedName = "始发地区";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map1, {
        parent: '一阶核心',
        objectives: Seq.with(
            new Objectives.Research(战线基地),
        )
    });
});
exports.map1 = map1//地图排序

const map2 = new SectorPreset("冰川", 护卫, 23);
map2.alwaysUnlocked = false;//默认解锁此区块
map2.difficulty = 4;//难度
map2.captureWave = 15;//敌人波数
map2.description = "这里是一片冰川，暴风雪仍在进行，预计50年后结束";//统计资料顶上的简介
map2.localizedName = "冰川";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map2, {
        parent: "始发地区", objectives: Seq.with(new Objectives.SectorComplete(map1))
    });
});

exports.map3 = map3//地图排序

const map3 = new SectorPreset("冰封火山", 护卫, 15);
map3.alwaysUnlocked = false;//默认解锁此区块
map3.difficulty = 6;//难度
map3.description = "这里的附近有火山，已经超过1000年没有喷发了";//统计资料顶上的简介
map3.localizedName = "冰封火山";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(map3, {
        parent: "冰川", objectives: Seq.with(new Objectives.SectorComplete(map2))
    });
});

const lqmap4 = new SectorPreset("寒冷林区", 护卫, 17);
lqmap4.alwaysUnlocked = false;//默认解锁此区块
lqmap4.difficulty = 6;//难度
lqmap4.captureWave = 20;//敌人波数
lqmap4.description = "这里是一片森林，似乎还有新的资源";//统计资料顶上的简介
lqmap4.localizedName = "寒冷林区";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(lqmap4, {
        parent: "冰封火山", objectives: Seq.with(new Objectives.SectorComplete(map3))
    });
});

exports.lqmap4 = lqmap4//地图排序

const bzmap5 = new SectorPreset("冰藏雪廊", 护卫, 19);
bzmap5.alwaysUnlocked = false;//默认解锁此区块
bzmap5.difficulty = 4;//难度
bzmap5.captureWave = 25;//敌人波数
bzmap5.description = "这里矿物较少，因此敌人未在此处部署过多防守，占据此处，以便推进！";//统计资料顶上的简介
bzmap5.localizedName = "冰藏雪廊";//区块名
Events.on(ContentInitEvent, (e) => {
    lib.addToResearch(bzmap5, {
        parent: "冰封火山", objectives: Seq.with(new Objectives.SectorComplete(map3))
    });
});

exports.bzmap5 = bzmap5//地图排序