/*        gier = makeAsteroid("gier", erekir, Blocks.ferricStoneWall, Blocks.carbonWall, -5, 0.4f, 7, 1f, gen -> {
            gen.min = 25;
            gen.max = 35;
            gen.carbonChance = 0.6f;
            gen.iceChance = 0f;
            gen.berylChance = 0.1f;
        });
*/
const lib = require("base/lib");
const {前线基地} = require('blocks/核心');
const {维克托} = require('planets/星球2');
const 微利德 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(this, 69, 5, 0.125, 6, 1, 0.1, 3, Color.valueOf("#71bd1b"), Color.valueOf("#4add10"), 13, 4, 3, 2),
    )); //网格密度？
/*
NoiseMesh(Planet planet, int seed, int divisions, Color color, float radius, int octaves, float persistence, float scale, float mag)
行星，种子，精细度(网格细分次数)，颜色，半径，噪声层数，噪声衰减系数，缩放(噪声缩放)，幅值(强度、幅度)
NoiseMesh(Planet planet, int seed, int divisions, float radius, int octaves, float persistence, float scale, float mag, Color color1, Color color2, int coct, float cper, float cscl, float cthresh)
行星，种子，精细度（网格细分次数），半径，噪声层数，噪声衰减系数，缩放（噪声缩放），幅值（强度、幅度），第一种颜色，第二种颜色，颜色噪声层数，颜色噪声衰减系数，颜色缩放比例，颜色筛选阈值
*/
        this.super$load();
    }//行星构建
}, "微利德", 维克托, 0.1);//名字: ,母星: ,大小: (单位塞普罗)

const sS = require("sectorSize");
sS.planetGrid(微利德, 3);//行星网格数量10*3^n+2

微利德.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
});
微利德.hasAtmosphere = true;
微利德.prebuildBase = false
微利德.atmosphereColor = Color.valueOf("#3735b4");
微利德.atmosphereRadIn = 1;//大气层内半径
微利德.atmosphereRadOut = 1;//星球大气层外半径
微利德.allowCampaignRules = false;//可使用规则
微利德.localizedName = "微利德";
微利德.visible = true;//星球是否可见
微利德.bloom = false;//光源（？）
微利德.updateLighting = true;//区块的昼夜交替
微利德.accessible = false;//星球是否可以到达
微利德.lightDstFrom = 0.5;//大气层
//维克托.launchCapacityMultiplier = 0.5;发射核心时最大可携带的资源量,“1”为发射的核心的100%容量,0.5为50%
微利德.allowLaunchSchematics = false;//是否开启发射核心蓝图
微利德.description = "困兽之斗";//星球介绍
微利德.allowSectorInvasion = false;//模拟攻击图入侵
微利德.allowWaveSimulation = true;//模拟后台波次
微利德.alwaysUnlocked = false;//默认解锁
微利德.clearSectorOnLose = true;//在死亡后重置区块
微利德.allowLaunchLoadout = false;//是否允许带资源发射核心
微利德.startSector = 0;//星球初始区块
微利德.orbitRadius = 4;//星球轨道半径
微利德.tidalLock = false//星球潮汐锁定
微利德.iconColor = Color.valueOf("#363636");//图标颜色
微利德.rotateTime = 476;//星球自转一周的时间
微利德.defaultCore = 前线基地;//默认发射核心

exports.微利德 = 微利德

// map1相关代码整合