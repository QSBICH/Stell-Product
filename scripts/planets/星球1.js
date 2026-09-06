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
const {科沃德} = require('planets/科沃德');
const 泰力特 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(this, 69, 5, 0.6, 8, 1, 0.1, 3, Color.valueOf("#363636"), Color.valueOf("#e05438"), 1, 0.125, 0.6, 0.5),
            new HexSkyMesh(泰力特, 2, 0.6, 0.14, 5, Color.valueOf("#1E1E1E80"), 0.6, 1, 1, 0.43),//种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
            new HexSkyMesh(泰力特, 3, 0.6, 0.15, 5, Color.valueOf("#353535"), 0.6, 1, 1.2, 0.45),
    )); //网格密度？
/*
NoiseMesh(Planet planet, int seed, int divisions, Color color, float radius, int octaves, float persistence, float scale, float mag)
行星，种子，精细度(网格细分次数)，颜色，半径，噪声层数，噪声衰减系数，缩放(噪声缩放)，幅值(强度、幅度)
NoiseMesh(Planet planet, int seed, int divisions, float radius, int octaves, float persistence, float scale, float mag, Color color1, Color color2, int coct, float cper, float cscl, float cthresh)
行星，种子，精细度（网格细分次数），半径，噪声层数，噪声衰减系数，缩放（噪声缩放），幅值（强度、幅度），第一种颜色，第二种颜色，颜色噪声层数，颜色噪声衰减系数，颜色缩放比例，颜色筛选阈值
*/
        this.super$load();
    }//行星构建
}, "泰力特", 科沃德, 0.75);//名字: ,母星: ,大小: (单位塞普罗)

const sS = require("sectorSize");
sS.planetGrid(泰力特, 3);//行星网格数量10*3^n+2

泰力特.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
});
泰力特.hasAtmosphere = true;
泰力特.prebuildBase = false
泰力特.atmosphereColor = Color.valueOf("#363636");
泰力特.atmosphereRadIn = 1;//大气层内半径
泰力特.atmosphereRadOut = 1;//星球大气层外半径
泰力特.allowCampaignRules = false;//可使用规则
泰力特.localizedName = "泰力特";
泰力特.visible = true;//星球是否可见
泰力特.bloom = false;//光源（？）
泰力特.updateLighting = true;//区块的昼夜交替
泰力特.accessible = false;//星球是否可以到达
//泰力特.launchCapacityMultiplier = 0.5;发射核心时最大可携带的资源量,“1”为发射的核心的100%容量,0.5为50%
泰力特.allowLaunchSchematics = false;//是否开启发射核心蓝图
泰力特.description = "融化中";//星球介绍
泰力特.allowSectorInvasion = false;//模拟攻击图入侵
泰力特.allowWaveSimulation = true;//模拟后台波次
泰力特.alwaysUnlocked = false;//默认解锁
泰力特.clearSectorOnLose = true;//在死亡后重置区块
泰力特.allowLaunchLoadout = false;//是否允许带资源发射核心
泰力特.startSector = 0;//星球初始区块
泰力特.orbitRadius = 25;//星球轨道半径
泰力特.tidalLock = true//星球潮汐锁定
泰力特.iconColor = Color.valueOf("#363636");//图标颜色
泰力特.rotateTime = 238;//星球自转一周的时间
泰力特.defaultCore = 前线基地;//默认发射核心

exports.泰力特 = 泰力特

// map1相关代码整合