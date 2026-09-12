const 特效 = extend(ExplosionEffect, {
    waveRad: 12,
    waveRadBase: 0,
    waveColor: Color.valueOf("ff0000"),
    waveStroke: 4,
    waveLife: 15,
    smokes: 0,
});//注册特效，什么都可以注册()
// ==========================================
// 通用单位创建函数（调用即可生成新单位）
// ==========================================
function newUnit(name, unitType) {
	const u = extend(UnitType, name, {});
	u.constructor = () => extend(unitType, {});
	return exports[name] = u;
}

/*"flying" -> UnitEntity;
"mech" -> MechUnit;
"legs" -> LegsUnit;
"naval" -> UnitWaterMove;
"payload" -> PayloadUnit;
"missile" -> TimedKillUnit;
"tank" -> TankUnit;
"hover" -> ElevationMoveUnit;
"tether" -> BuildingTetherPayloadUnit;
"crawl" -> CrawlUnit;*/

// ==========================================
// AAA常规单位批量创建
// ==========================================
newUnit("铁刃", MechUnit);
newUnit("斩杀", MechUnit);
newUnit("流浪者", MechUnit);
newUnit("巡回者", MechUnit);
newUnit("剿灭", MechUnit);
newUnit("清算", MechUnit);
newUnit("巡飞者", UnitEntity);
newUnit("组装无人机", UnitEntity);
newUnit("蜉蝣", UnitEntity);
newUnit("飞船", UnitEntity);
newUnit("投掷", UnitEntity);
newUnit("死命", UnitEntity);
newUnit("抛射", UnitEntity);
newUnit("忠诚", UnitEntity);
newUnit("载荷", UnitEntity);
newUnit("报告者", LegsUnit);
newUnit("勘探者", LegsUnit);
newUnit("爬行勘探器", LegsUnit);
newUnit("漂流", UnitWaterMove);
newUnit("兵蚁", LegsUnit);
newUnit("蚁后", LegsUnit);