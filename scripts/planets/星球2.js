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
const 维克托 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(this, 69, 5, 1, 8, 1, 0.1, 3, Color.valueOf("#547dca"), Color.valueOf("#4e88f1"), 67, 2, 2, 2),
            new HexSkyMesh(维克托, 3, 5, 0.3, 5, Color.valueOf("#223fdf80"), 0.6, 1, 1, 0.43),//种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
            new HexSkyMesh(维克托, 16, 5, 0.3, 5, Color.valueOf("#34b4c5"), 0.6, 1, 1.2, 0.45),
    )); //网格密度？
/*
NoiseMesh(Planet planet, int seed, int divisions, Color color, float radius, int octaves, float persistence, float scale, float mag)
行星，种子，精细度(网格细分次数)，颜色，半径，噪声层数，噪声衰减系数，缩放(噪声缩放)，幅值(强度、幅度)
NoiseMesh(Planet planet, int seed, int divisions, float radius, int octaves, float persistence, float scale, float mag, Color color1, Color color2, int coct, float cper, float cscl, float cthresh)
行星，种子，精细度（网格细分次数），半径，噪声层数，噪声衰减系数，缩放（噪声缩放），幅值（强度、幅度），第一种颜色，第二种颜色，颜色噪声层数，颜色噪声衰减系数，颜色缩放比例，颜色筛选阈值
*/
        this.super$load();
    }//行星构建
}, "维克托", 科沃德, 1.1);//名字: ,母星: ,大小: (单位塞普罗)

const sS = require("sectorSize");
sS.planetGrid(维克托, 3);//行星网格数量10*3^n+2

维克托.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
});
维克托.hasAtmosphere = true;
维克托.prebuildBase = false
维克托.atmosphereColor = Color.valueOf("#3735b4");
维克托.atmosphereRadIn = 1;//大气层内半径
维克托.atmosphereRadOut = 1;//星球大气层外半径
维克托.allowCampaignRules = false;//可使用规则
维克托.localizedName = "维克托";
维克托.visible = true;//星球是否可见
维克托.bloom = false;//光源（？）
维克托.updateLighting = true;//区块的昼夜交替
维克托.accessible = false;//星球是否可以到达
维克托.lightDstFrom = 0.5;//大气层
//维克托.launchCapacityMultiplier = 0.5;发射核心时最大可携带的资源量,“1”为发射的核心的100%容量,0.5为50%
维克托.allowLaunchSchematics = false;//是否开启发射核心蓝图
维克托.description = "好闷";//星球介绍
维克托.allowSectorInvasion = false;//模拟攻击图入侵
维克托.allowWaveSimulation = true;//模拟后台波次
维克托.alwaysUnlocked = false;//默认解锁
维克托.clearSectorOnLose = true;//在死亡后重置区块
维克托.allowLaunchLoadout = false;//是否允许带资源发射核心
维克托.startSector = 0;//星球初始区块
维克托.orbitRadius = 55;//星球轨道半径
维克托.tidalLock = false//星球潮汐锁定
维克托.iconColor = Color.valueOf("#363636");//图标颜色
维克托.rotateTime = 600;//星球自转一周的时间
维克托.defaultCore = 前线基地;//默认发射核心

exports.维克托 = 维克托

// map1相关代码整合