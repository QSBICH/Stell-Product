// ============================================
// 日志模块 - 科格拉斯
// 支持单个加载 (loadContent) 和批量加载 (loadContents)
// ============================================

var writer = Core.settings.getDataDirectory().child("科格拉斯.md").writer(false);//true就是续写 false为覆盖
writer.write("_#科格拉斯日志#_\n")
writer.flush();

var startTime = Date.now();

function thislogWarn(log, level) {
    if (level == null) level = "";
    var elapsed = Date.now() - startTime;
    writer.write(level + elapsed + "ms: " + log + "\n");
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

function loadContent(loadThing) {
    try {
        require(loadThing);
        thislog(1, loadThing + "加载完毕")
    } catch (error) {
        thislog(3, loadThing + "加载或执行失败,原因: ", error);
    };
}

function loadContents(loadThings, loadroot) {
    if (!Array.isArray(loadThings)) {
        loadContent(loadThings);
        return;
    }
    for (var i = 0; i < loadThings.length; i++) {
        var item = loadThings[i];
        if (Array.isArray(item)) {
            var subRoot = loadroot + "/" + item[0] || loadroot;
            loadContents(item, subRoot);
        } else {
            var path = loadroot ? loadroot + "/" + item : item;
            loadContent(path);
        }
    }
}

exports.thislogWarn = thislogWarn;
exports.thislog = thislog;
exports.loadContent = loadContent;
exports.loadContents = loadContents;