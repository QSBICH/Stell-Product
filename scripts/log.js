// ============================================
// 日志模块 - 科格拉斯
// 支持单个加载 (loadContent) 和批量加载 (loadContents)
// ============================================

var writer = Core.settings.getDataDirectory().child("科格拉斯.md").writer(false);
writer.write("_#科格拉斯日志#_\n")
writer.flush();

function thislogWarn(log, level) {
    if (level == null) level = "";
    writer.write(level + Date.now() + " ms: " + log + "\n");
    writer.flush()
};

var Lvs = ["", "`[Info]`", "[Warn]", "#[Error]#"];

function thislog(level, log, error) {
    var Lv = Lvs[level];
    if (log == null) log = "";
    if (error == null) error = "";
    if (Lv == null) {
        Lv = "[Unallocated]";
        thislogWarn("无法理解的日志等级");
    };
    thislogWarn(log + error, Lv)
};

// -------- 单个加载 --------
function loadContent(loadThing) {
    try {
        require(loadThing);
        thislog(1, loadThing + "加载完毕")
    } catch (error) {
        thislog(3, loadThing + "加载或执行失败,原因: ", error);
    };
}

// -------- 批量加载（新增） --------
function loadContents(loadThings, loadroot) {
    // 如果传入的是字符串，直接加载
    if (!Array.isArray(loadThings)) {
        loadContent(loadThings);
        return;
    }
    // 如果传入的是数组，遍历加载
    for (var i = 0; i < loadThings.length; i++) {
        var item = loadThings[i];
        if (Array.isArray(item)) {
            // 嵌套数组：递归处理
            var subRoot = loadroot + "/" + item[0] || loadroot;
            loadContents(item, subRoot);
        } else {
            var path = loadroot ? loadroot + "/" + item : item;
            loadContent(path);
        }
    }
}

// -------- 导出 --------
exports.thislogWarn = thislogWarn;
exports.thislog = thislog;
exports.loadContent = loadContent;
exports.loadContents = loadContents;