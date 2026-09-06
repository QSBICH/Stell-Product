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

const 迪钠德 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(迪钠德, 8, 6, Color.valueOf("#50390f"),0.9, 6, 1, 0.1, 4),
            new NoiseMesh(迪钠德, 11, 7, Color.valueOf("#c49c1b"),1.05, 6, 1, 0.2, 1),
            new NoiseMesh(迪钠德, 78, 7, Color.valueOf("#e0e40ff3"),1, 6, 1, 0.25, 1)
    )); //网格密度？
        this.super$load();
    }//行星构建
}, "迪钠德", 科沃德, 1.25);//名字: ,母星: ,大小: (单位塞普罗)

迪钠德.cloudMeshLoader = prov(() => new MultiMesh(
    // 种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
    new HexSkyMesh(迪钠德, 2, 32, 0.22, 6, Color.valueOf("#d8b311"), 2, 1, 1, 0.45),
    // 种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
    new HexSkyMesh(迪钠德, 3, 16, 0.32, 6, Color.valueOf("#887b05"), 2, 1, 1.2, 0.35),
    // 种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
    new HexSkyMesh(迪钠德, 5, 4, 0.64, 6, Color.valueOf("#8B6F47CC"), 2, 1, 1.2, 0.35)
));

const c1 = Color.valueOf("#50390f"), c2 = Color.valueOf("#1b0d68"), c3 = Color.valueOf("#e61d1df3");//低地颜色c1高地颜色c2，特殊颜色c3
const sS = require("sectorSize");
sS.planetGrid(迪钠德, 3);//行星网格数量10*3^n+2

迪钠德.generator = extend(SerpuloPlanetGenerator,{
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
	},
	allowLanding (sector) {
		return false
	},
});

迪钠德.allowCampaignRules = false;//可使用规则
迪钠德.atmosphereColor = 迪钠德.lightColor = Color.valueOf("#d41313");
迪钠德.landCloudColor = Color.valueOf("#910f0f");//云层颜色
迪钠德.atmosphereRadIn = 1;//大气层内半径
迪钠德.atmosphereRadOut = 1;//星球大气层外半径
迪钠德.hasAtmosphere = true;//自身可看见大气层
迪钠德.lightSrcTo = 0.5;//区块光照变化
迪钠德.lightDstFrom = 0.5;//大气层
迪钠德.localizedName = "迪钠德";//行星名
迪钠德.visible = true;//星球是否可见
迪钠德.bloom = false;//光源（？）
迪钠德.updateLighting = true;//区块的昼夜交替
迪钠德.accessible = true;//星球是否可以到达
迪钠德.launchCapacityMultiplier = 0.5;//发射核心时最大可携带的资源量,“1”为发射的核心的100%容量,0.5为50%
迪钠德.allowLaunchSchematics = true;//开启发射核心蓝图
迪钠德.description = "风声在呼啸";//星球介绍
迪钠德.allowSectorInvasion = true;//模拟攻击图入侵
迪钠德.allowWaveSimulation = true;//模拟后台波次
迪钠德.alwaysUnlocked = false;//默认解锁
迪钠德.clearSectorOnLose = false;//不知道什么玩意,关了吧
迪钠德.allowLaunchLoadout = true;//允许带资源发射核心
迪钠德.startSector = 83;//我以前写的没改，这里写你第一个区块的区块ID，否则会报错
迪钠德.orbitRadius = 75;//星球轨道半径
迪钠德.tidalLock = false//星球潮汐锁定
迪钠德.iconColor = Color.valueOf("#d62323");//图标颜色
迪钠德.rotateTime = 60;//星球自转一周的时间
迪钠德.defaultCore = 前线基地;//默认发射核心

exports.迪钠德 = 迪钠德