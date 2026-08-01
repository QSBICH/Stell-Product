var writer=Core.settings.getDataDirectory().child("科格拉斯.md").writer(false);
writer.write("_#科格拉斯日志#_\n")
writer.flush();
function thislogWarn(log,level){
	if(level==null)level="";
	writer.write(level+Date.now()+" ms: "+log+"\n");
	writer.flush()
};
var Lvs=["","`[Info]`","[Warn]","#[Error]#"];
function thislog(level, log, error){
	var Lv;
	Lv=Lvs[level];
	if(log==null)log="";
	if(error==null)error="";
	if(Lv==null){
		Lv="[Unallocated]";
		thislogWarn("无法理解的日志等级")
	};
	thislogWarn(log+error,Lv)
};
function loadContent(loadThing){
	try {
		require(loadThing);
		thislog(1,loadThing+"加载完毕")
	} catch (error) {
		thislog(3, loadThing+"加载或执行失败,原因: ", error);
	};
}
exports.thislogWarn=thislogWarn
exports.thislog=thislog
exports.loadContent=loadContent

