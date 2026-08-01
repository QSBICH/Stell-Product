Vars.maxSchematicSize = 99;//蓝图最大尺寸
MapResizeDialog.minSize = 1//地图最小尺寸
MapResizeDialog.maxSize = 5000//地图最大尺寸
//------------------------------------
require("base/lib");
require("blocks/核心");
require("blocks/三代核心");
require("blocks/二代核心");
require("blocks/一阶核心");
require("blocks/吸血1");
require("科技树");
require("科技树2");
require("科技树3");
require("blocks/岛屿核心");
require("特定/物品");
require("blocks/前哨基地");
require("library");
require("提示");
require("log");
require("多方块/电弧炉FTKJ");
require("多方块/机床FTKJ");
require("配方/多功能冶炼厂配方");
require("配方/铀矿提纯厂配方");
require("配方/火药冶炼厂配方");
require("配方/金矿商店配方");
const ln = require("log")
ln.loadContent("blocks/核心");
ln.loadContent("blocks/三代核心");
ln.loadContent("blocks/二代核心");
ln.loadContent("blocks/一阶核心");
ln.loadContent("科技树");
ln.loadContent("科技树2");
ln.loadContent("科技树3");
ln.loadContent("blocks/岛屿核心");
ln.loadContent("特定/物品");
ln.loadContent("blocks/前哨基地");
ln.loadContent("library");
ln.loadContent("提示");
ln.loadContent("log");
ln.loadContent("多方块/电弧炉FTKJ");
ln.loadContent("多方块/机床FTKJ");
ln.loadContent("配方/多功能冶炼厂配方");
ln.loadContent("配方/铀矿提纯厂配方");
ln.loadContent("配方/火药冶炼厂配方");
ln.loadContent("配方/金矿商店配方");
ln.thislog(1, "科格拉斯的js已全部加载")
ln.thislog(0, "。。。")
ln.thislog(0, "此次mod测试唯一性编号:"+Math.floor(Date.now()/315576000000)+"-"+
Date.now()%315576000000)
//type
require("特定/辅助");
require("特定/单位工厂");
require("特定/工厂");
require("特定/物品");
require("特定/地形加成");
require("特定/逻辑");
require("特定/单位")