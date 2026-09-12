const 工厂 = require("特定/工厂");//需使用定义这个工厂type的文件,这两个名字（JiChuang,核电站）不能相同（存疑）,这段代码会在第56行用到,需要修改
const coord=[-2,2,-1,2,0,2,1,2,2,2,-2,1,-1,1,0,1,1,1,2,1,-2,0,-1,0,1,0,2,0,-2,-1,-1,-1,0,-1,1,-1,2,-1,-2,-2,-1,-2,0,-2,1,-2,2,-2]//方块位置,以工厂核心的中心（核心边长为奇数）/中心偏左下角（核心边长为偶数） 为原点
const list=[1,2,2,2,1,2,3,4,3,2,2,5,5,2,2,3,6,3,2,1,2,2,2,1]//以最右上角为开始,数字项类似宏定义,数字见下
function bbbb(a){//定义
	var b
	a=a.toString()
if (a=="原版拓展-钢制架构"){b=1}
if (a=="原版拓展-钢制重装板"){b=2}
if (a=="原版拓展-反应堆"){b=3}
if (a=="原版拓展-电路板"){b=4}
if (a=="原版拓展-储能块"){b=5}
if (a=="原版拓展-微型处理器"){b=6}
//这里b定义多少行都没问题,只要你想,就可以做一个超级复杂的工厂
return b
}
//~~~~~~~~~~~~~~
var auto = false
const 核电站核心 = extend(GenericCrafter, '核电站核心', {});
核电站核心.configurable = true;
核电站核心.buildType = prov(() => {
	var other
	var ii=0
	var d
	var bb
	var cc
	var e
	return new JavaAdapter(GenericCrafter.GenericCrafterBuild, {
		buildConfiguration(table){
			table.button("操作", Icon.infoCircle, run(() => {
			var dialog = new BaseDialog("核电站核心");
			dialog.cont.pane(table => {
				table.add("多方块结构:核电站")
				table.row()
				table.add(" ")
				table.row()
				table.button("教程", Icon.book, run(() => {
			var dialog = new BaseDialog("教程");
			dialog.cont.pane(table => {
				table.add("导弹发射井或许有一些\n残留的遗迹，如果它还在");
				table.row()
				table.image(Core.atlas.find("原版拓展-核电站参考")).left().size(0, 0).pad(3).row();
			})
			dialog.buttons.button("@close", ()=>{dialog.hide()}).size(400, 128);
			dialog.show()})).size(140, 70);
				table.row()
				table.add(" ")
				table.row()
				if (cc==0){table.add("[yellow]结构不完整!!!")}
				else{table.add("[blue]结构就绪");table.row();table.add(" ");table.row();table.button("建造", Icon.infoCircle, run(() => {dialog.hide();e=1})).size(140, 70);}
				table.row()
				table.add(" ")
				table.row()
				if (auto){table.button("切换至手动建造", Icon.infoCircle, run(() => {auto=false;e=0})).size(140, 70)}
				else{table.button("请在我下次结构就绪时自动完成建造", Icon.infoCircle, run(() => {auto=true})).size(300, 70)}
			})
			dialog.buttons.button("@close", ()=>{dialog.hide()}).size(400, 128);
			dialog.show();
			})).size(100, 50);
		},
		updateTile(){
			if (auto){e=1}
			this.super$updateTile()
			other = Vars.world.build(this.tileX()+coord[2*ii], this.tileY()+coord[(2*ii)+1])
			if (cc==1 && e==1){
Vars.world.tile(this.tileX(), this.tileY()).setBlock(工厂.核电站,this.team);}
			if (other!=null){
				bb=bbbb(other.block);
				if (other.team!=this.team){d=0}
			}else{bb=null}
			if (bb!=list[ii]){d=0}
			if (ii<list.length-1){ii=ii+1}
			else{ii=0;
			if (d==1){cc=1}
			else{cc=0;d=1}}
		}
	},核电站核心);
});