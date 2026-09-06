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

// ============================================
// 基础矿物
// ============================================
newItem("铁矿");
newItem("煤矿");
newItem("沙砾");
newItem("沙子");
newItem("铀原矿");
newItem("铀矿I");
newItem("铀矿II");
newItem("铀矿III");
newItem("红宝石");
newItem("金刚石");
newItem("钻石");
newItem("锂");
newItem("金");
newItem("硅");
newItem("细胞");

// ================
// 加工材料
// ================
newItem("钢铁");
newItem("零件");
newItem("火药");
newItem("辐射火药");

// ===============
// 技术物品
// ===============
newItem("硬盘");
newItem("存储了激光技术的硬盘");
newItem("激光技术");

// ===============
// 特殊物品
// ===============
newItem("机器人蓝图");

// ===============
// 液体
// ===============
newLiquid("氧气");
newLiquid("沙子水");