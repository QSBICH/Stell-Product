const ln = require("log");

ln.thislog(1, "========== 星球模块加载开始 ==========");


// ====================
// 1. 主星
// ====================
try {
    require("planets/星球");
    ln.thislog(1, "planets/星球 加载成功");
} catch (error) {
    ln.thislog(3, "planets/星球 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过星球，继续执行");
}


// ====================
// 2. 科格拉斯的卫星
// ====================
try {
    require("planets/卫星");
    ln.thislog(1, "planets/卫星 加载成功");
} catch (error) {
    ln.thislog(3, "planets/卫星 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过卫星，继续执行");
}


// ====================
// 3. 卫星2
// ====================
try {
    require("planets/卫星2");
    ln.thislog(1, "planets/卫星2 加载成功");
} catch (error) {
    ln.thislog(3, "planets/卫星2 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过卫星2，继续执行");
}


// ====================
// 4. 卫星3
// ====================
try {
    require("planets/卫星3");
    ln.thislog(1, "planets/卫星3 加载成功");
} catch (error) {
    ln.thislog(3, "planets/卫星3 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过卫星3，继续执行");
}
// ====================
// 4. 主星
// ====================
try {
    require("planets/星球1");
    ln.thislog(1, "planets/星球1 加载成功");
} catch (error) {
    ln.thislog(3, "planets/星球 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过星球，继续执行");
}
// ====================
// 5. 主星
// ====================
try {
    require("planets/星球2");
    ln.thislog(1, "planets/星球2 加载成功");
} catch (error) {
    ln.thislog(3, "planets/星球 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过星球，继续执行");
}
// ====================
// 6. 卫星
// ====================
try {
    require("planets/星球2卫星");
    ln.thislog(1, "planets/星球2卫星 加载成功");
} catch (error) {
    ln.thislog(3, "planets/星球2卫星 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过星球，继续执行");
}
// ====================
// 7. 主星
// ====================
try {
    require("planets/星球3");
    ln.thislog(1, "planets/星球3 加载成功");
} catch (error) {
    ln.thislog(3, "planets/星球3 加载或执行失败,原因:", error);
    ln.thislog(0, "已跳过星球，继续执行");
}
ln.thislog(1, "所有行星及其子卫星加载完成");
ln.thislog(1, "========== 星球模块加载完成 ==========");