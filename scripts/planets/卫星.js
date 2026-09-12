const lib=require("base/lib");
const {一阶核心}=require("blocks/一阶核心");
const {战线基地}=require("blocks/二代核心");
const {科格拉斯}=require("planets/星球");

const 护卫 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new MultiMesh(
            new NoiseMesh(this, 69, 5, 0.43, 8, 1, 0.05, 3, Color.valueOf("#FFFFFF"), Color.valueOf("#aacee2"), 1, 5, 2, 0.5),
            new HexSkyMesh(护卫, 2, 5, 0.14, 5, Color.valueOf("#ffffff"), 2, 1, 1, 0.43),//种子，旋转速度，半径，精细度，颜色，噪声层数，噪声衰减，缩放比例，筛选
            new HexSkyMesh(护卫, 3, 5, 0.15, 5, Color.valueOf("#f7f7f7"), 2, 1, 1.2, 0.45),
    )); //网格密度
/*
NoiseMesh(Planet planet, int seed, int divisions, Color color, float radius, int octaves, float persistence, float scale, float mag)
行星，种子，精细度(网格细分次数)，颜色，半径，噪声层数，噪声衰减系数，缩放(噪声缩放)，幅值(强度、幅度)
NoiseMesh(Planet planet, int seed, int divisions, float radius, int octaves, float persistence, float scale, float mag, Color color1, Color color2, int coct, float cper, float cscl, float cthresh)
行星，种子，精细度（网格细分次数），半径，噪声层数，噪声衰减系数，缩放（噪声缩放），幅值（强度、幅度），第一种颜色，第二种颜色，颜色噪声层数，颜色噪声衰减系数，颜色缩放比例，颜色筛选阈值
*/
        this.super$load();
    }
}, "护卫", 科格拉斯, 0.5);

const c1 = Color.valueOf("#4e546f"), c2 = Color.valueOf("#6e7a8d"), c3 = Color.valueOf("#91a0b0");
const sS = require("sectorSize");
sS.planetGrid(护卫, 1);

护卫.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(护卫, 2, 0.15, 0.14, 5, Color.valueOf("91A0B080"), 2, 0.546, 0.5, 0.43),
    new HexSkyMesh(护卫, 3, 0.6, 0.16, 5, Color.valueOf("6E7A8DFF"), 2, 0.546, 1.2, 0.45)
));

护卫.generator = extend(SerpuloPlanetGenerator, {
    getDefaultLoadout() {
        return Schematics.readBase64("bXNjaAF4nGNgYmBiYWDJS8xNZWB7tmDH0/3NDOzFJamJuZkpDFzFyRmpuYklmcnFDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAzyT3fNfzpn/vPlE591Neg+2dHwcsY2oNCzaTOhJjIwMDJAAADBmCrd");
    },
    allowLanding(sector) {
        return false;
    }
});

护卫.minZoom = 0.6;
护卫.allowCampaignRules = true;
护卫.atmosphereColor = 护卫.lightColor = Color.valueOf("#4e546f90");
护卫.landCloudColor = Color.valueOf("#4e546f");
护卫.atmosphereRadIn = 0;
护卫.atmosphereRadOut = 0.5;
护卫.hasAtmosphere = true;
护卫.lightSrcTo = 0.5;
护卫.lightDstFrom = 0.5;
护卫.localizedName = "护卫";
护卫.visible = true;
护卫.bloom = false;
护卫.updateLighting = true;
护卫.accessible = true;
护卫.launchCapacityMultiplier = 0.5;
护卫.allowLaunchSchematics = true;
护卫.description = "敌人在这驻扎了指挥部";
护卫.allowSectorInvasion = true;
护卫.allowWaveSimulation = true;
护卫.alwaysUnlocked = true;
护卫.clearSectorOnLose = false;
护卫.allowLaunchLoadout = true;
护卫.startSector = 0;
护卫.orbitRadius = 10;
护卫.tidalLock = true;
护卫.iconColor = Color.valueOf("#6A7379");
护卫.rotateTime = 300;
护卫.defaultCore = 一阶核心;

exports.护卫 = 护卫;
const map1=new SectorPreset("始发地区",护卫,0);
map1.alwaysUnlocked=false;
map1.difficulty=4;
map1.captureWave=5;
map1.description="我们从主星发射，到这个卫星防备力量最弱的区域";
map1.localizedName="始发地区";
Events.on(ContentInitEvent,e=>{
    lib.addToResearch(map1,{parent:"一阶核心",objectives:Seq.with(new Objectives.Research(战线基地))});
});
exports.map1=map1;

const map2=new SectorPreset("冰川",护卫,23);
map2.alwaysUnlocked=false;
map2.difficulty=4;
map2.captureWave=15;
map2.description="这里是一片冰川，暴风雪仍在进行，预计50年后结束";
map2.localizedName="冰川";
Events.on(ContentInitEvent,e=>{
    lib.addToResearch(map2,{parent:"始发地区",objectives:Seq.with(new Objectives.SectorComplete(map1))});
});
exports.map2=map2;

const map3=new SectorPreset("冰封火山",护卫,15);
map3.alwaysUnlocked=false;
map3.difficulty=6;
map3.description="这里的附近有火山，已经超过1000年没有喷发了";
map3.localizedName="冰封火山";
Events.on(ContentInitEvent,e=>{
    lib.addToResearch(map3,{parent:"冰川",objectives:Seq.with(new Objectives.SectorComplete(map2))});
});
exports.map3=map3;

const lqmap4=new SectorPreset("寒冷林区",护卫,17);
lqmap4.alwaysUnlocked=false;
lqmap4.difficulty=6;
lqmap4.captureWave=20;
lqmap4.description="这里是一片森林，似乎还有新的资源";
lqmap4.localizedName="寒冷林区";
Events.on(ContentInitEvent,e=>{
    lib.addToResearch(lqmap4,{parent:"冰封火山",objectives:Seq.with(new Objectives.SectorComplete(map3))});
});
exports.lqmap4=lqmap4;

const bzmap5=new SectorPreset("冰藏雪廊",护卫,19);
bzmap5.alwaysUnlocked=false;
bzmap5.difficulty=4;
bzmap5.captureWave=25;
bzmap5.description="这里矿物较少，因此敌人未在此处部署过多防守，占据此处，以便推进！";
bzmap5.localizedName="冰藏雪廊";
Events.on(ContentInitEvent,e=>{
    lib.addToResearch(bzmap5,{parent:"冰封火山",objectives:Seq.with(new Objectives.SectorComplete(map3))});
});
exports.bzmap5=bzmap5;