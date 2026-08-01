try {
    require("planets/卫星3")
    require("planets/星球");
    require("planets/卫星");
    require("planets/卫星2");
} catch (error) {
    log("星球加载或执行失败,原因:", error);
    log("已跳过星球模块，继续执行下一个js");
}
log("所有行星及其子卫星加载完成")
log("地图树加载完成")