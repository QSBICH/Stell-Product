function newItem(name) {
	exports[name] = extend(Item, name, {});
}
function newCellLiquid(name) {
	exports[name] = extend(CellLiquid, name, {});
}
function newLiquid(name) {
	exports[name] = extend(Liquid, name, {});
}
function newBlock(name) {
	exports[name] = extend(Block, name, {});
}
//Item——————————————————
//其实就是给物品上type,方便配方文件引用
newItem("铁矿");
newItem("金矿");
newLiquid("氧气");
newLiquid("沙子水");
newItem("钢铁");
newItem("钻石");
newItem("零件");
newItem("金刚石");
newItem("红宝石");
newItem("锂");
newItem("煤矿");
newItem("沙砾");
newItem("沙子");
newItem("机器人蓝图");
newItem("辐射火药");
newItem("火药");
newItem("硅");
newItem("铀原矿");
newItem("铀矿III");
newItem("铀矿II");
newItem("铀矿I");