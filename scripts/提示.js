//参考:合晶工业
const ln = require("log");

Events.on(EventType.ClientLoadEvent, cons(e => {
			var dialog = new BaseDialog("原版拓展");//新建一个显示窗口
	var dv = 0;
	var dialogTitle = "";
	dialog.cont.pane(table => {
		var titleRand = ""
		const Vars = Packages.mindustry.Vars
		var name="你好"
		if(Vars.player.name&&Vars.steamPlayerName){name+=(Vars.player.name+", 或者说"+Vars.steamPlayerName)}else if(Vars.player.name){name+=(", "+Vars.player.name)}else if(Vars.steamPlayerName){name+=(", "+Vars.steamPlayerName)};
		const titles=[
			"试试铁锈战争!",
			"加入了114514个虫族建筑!",
			"[#c000c0]正在编译代码中...",
			"你战役打到哪了?",
			"我们修复了114514个bug!",
			"玩玩赤石科技让你烂手回冬!",
			"正在重置贴图...",
			"我已急哭!",
			"我的天呐我之前在干什么这么极端的代码错误\n[red]我竟然没看到[]",
			"独特的工厂合成方式",
			"EMMM?",
			name,
			"\n[#ffe262]亲爱的alpha欢迎[red]回来"
		];
		const titleRandVar = Math.floor(GlobalVars.rand.nextDouble() * (titles.length));
		titleRand = titles[titleRandVar];
		ln.thislog(1, titleRandVar+"号随机标题:"+titleRand);
		table.add("[red]钢铁工业[beta]2.1\n\n关于本mod\n[red]mod还在制作期,还会有很多问题\n可以跟作者反馈,[green]如果你有想投\n稿的东西，请带上贴图和你的描\n\n\n有没有会画像素画并且有意\n愿加入作者的制作组的可以 \n联系作者,原画师因为部分原\n因无法继续创作，下次创作不\n知到是多久，所以出此下策，非\n常感谢愿意加入的人!对绘画水准大概可以做到制\n作方块就行了，兵种这些可以\n慢慢学\n\n\n[gold]由于未知原因带资源默认\n会带铅和铜,发射核心时需要\n点击核心图标以恢复正常.\n目前因为技术原因无法制作\n本星球的数字区块生成同时\n作者推荐在熟悉游戏机制\n后再游玩新星球，同时赛普罗\n也有新物品，可以更好的游玩\n\n如果你有建议或者有问题，可\n以进群:1076753049\n或者在创意工坊页面留言\n\n\nmod已在github开源了:https://github.com/QSBICH/Stell-Product\n\n\n"+titleRand)
		table.row();
	})
	
	// -------- 第一行按钮 --------
	dialog.buttons.button("[#c000c0](看看注意事项!)关闭", run(() => {
		dialog.hide()//退出此界面
	})).size(110, 64);//按钮用原版@close
	//贴图size（长,宽）
	
	dialog.buttons.button("[red]注意事项", run(() => {
		var dialog2 = new BaseDialog('注意事项');
		dialog2.cont.pane(table => {
			table.add("[red]极少数人可能会在游玩本mod时，因mod中的闪光或图形出\n现癫痫症状，即便没有癫痫病史也可能出现类似状况。这些症状\n包含眼睛疼痛、视觉异常、偏头痛、痉挛、意识障碍（如昏迷）\n等。若游玩过程中出现上述症状，请立即停止游戏并就医。若您\n或亲属有癫痫病史，游玩前建议咨询医生。同时，可通过坐远屏\n幕、使用小屏幕设备、保持环境明亮、避免疲劳时游戏等方式降\n低风险"/*区块旁的数字区块十分庞大,发射核心至数字区块时,需在进入区块加载页面时大退,重新打开游戏并重新进入区块并等待\n[red]请勿在获得建筑“资源转化器”与“资源发射器”前进入数字区块,并且进入数字区块前必须带超过1k的黄铜、铁、废料,否则无法正常游玩本mod星球的数字区块*/)
		})
		dialog2.buttons.defaults().size(210, 64);
		dialog2.addCloseButton();
		dialog2.show();
	})).size(110, 64);
	
	dialog.buttons.button("[gold]制作人员&致谢名单", run(() => {
		var dialog3 = new BaseDialog('制作人员');
		dialog3.cont.pane(table => {
		table.add(" [gold]作者：[gold]月半猫(qq:3893990966)\n[gold]美术: boebee\n[gold]美术2:吃空气群众\n--------------------\n[yellow]沉默是金:深度游玩了护卫并提出不足(●—●)\nC-beverage:投稿了部分贴图\n\n")})
		dialog3.buttons.defaults().size(210, 64);
		dialog3.addCloseButton();
		dialog3.show();
	})).size(110, 96);
	
	dialog.buttons.button("[gold]制作组大头照", run(() => {
		var dialog4 = new BaseDialog('制作组大头照');
		dialog4.cont.pane(table => {
		table.image(Core.atlas.find("原版拓展-月抛猫")),
		table.image(Core.atlas.find("原版拓展-boebee")),
		table.image(Core.atlas.find("原版拓展-吃空气"))
		})
		dialog4.buttons.defaults().size(210, 64);
		dialog4.addCloseButton();
		dialog4.show();
	})).size(110, 64);
	
	// -------- 新增：第二行按钮（建议与反馈）--------
	dialog.buttons.button("[red]📝 建议与反馈", run(() => {
		Core.app.openURI("https://docs.qq.com/form/page/DSFNDTkpkS2FKcE5U");
	})).size(210, 64).pad(10);
	
        dialog.show();
}))
/*结构
1（2，3（4））
*/