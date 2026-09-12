///参考:合晶工业
const ln = require("log");

Events.on(EventType.ClientLoadEvent, cons(e => {
    var dialog = new BaseDialog("原版拓展");//新建一个显示窗口
    var dv = 0;
    var dialogTitle = "";

    dialog.cont.pane(table => {
        var titleRand = "";
        const Vars = Packages.mindustry.Vars;
        var name = "你好";

        if (Vars.player.name && Vars.steamPlayerName) {
            name += (Vars.player.name + ", 或者说" + Vars.steamPlayerName);
        } else if (Vars.player.name) {
            name += (", " + Vars.player.name);
        } else if (Vars.steamPlayerName) {
            name += (", " + Vars.steamPlayerName);
        }

        const titles = [
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
            "\n[#ffe262]亲爱的alpha欢迎[red]回来",
            "[gold]科格拉斯在等着你...",
            "[green]你的第一个计算机正在编译...",
            "[orange]据说科拉人留下了更多秘密...",
            "[purple]BnBi AhB丨b丨o",
            "[#44ddff]扫描到未知信号...",
            "[#ff8844]激光技术已就绪...",
            "[#ff44ff]你需要更大的硬盘。"
        ];

        const titleRandVar = Math.floor(
            GlobalVars.rand.nextDouble() * (titles.length)
        );

        titleRand = titles[titleRandVar];

        ln.thislog(1, titleRandVar + "号随机标题:" + titleRand);

        table.add(
            "[red]钢铁工业[beta]2.4\n\n关于本mod\n" +
            "[red]mod还在制作期,还会有很多问题\n" +
            "可以跟作者反馈,[green]\n\n\n" +
            "[gold]由于未知原因带资源默认\n" +
            "会带铅和铜,发射核心时需要\n" +
            "点击核心图标以恢复正常.\n" +
            "目前因为技术原因无法制作\n" +
            "本星球的数字区块生成同时\n" +
            "作者推荐在熟悉游戏机制\n" +
            "后再游玩新星球，同时赛普罗\n" +
            "也有新物品，可以更好的游玩\n\n" +
            "如果你有建议或者有问题，可\n" +
            "以进群:947959067\n" +
            "进群可以优先体验最新版本\n\n" +
            "或者在创意工坊页面留言\n\n\n" +
            "[yellow]前情提要\n" +
            "本mod与原版扩展没有任\n" +
            "何关系本MOD在24年年\n" +
            "底就开始制作作者本人并不混圈\n" +
            "子故可能并不清楚原版扩展\n" +
            "的测试,mod由于公开的时\n" +
            "候木已成舟,不方便更改内部\n" +
            "名称,所以更改了显示名称\n\n" +
            "[red]本版本为BETA版本，作者没有足够的时间进行测试,铀BUG欢迎反馈\n\n\n" +
            "[gold]mod已在github公开了:https://github.com/QSBICH/Stell-Product\n\n\n" +
            titleRand
        );

        table.row();
    });

    // -------- 第一行按钮 --------

    dialog.buttons.button(
        "[#c000c0](看看注意事项!)关闭",
        run(() => {
            dialog.hide();//退出此界面
        })
    ).size(110, 64);

    // -------- 注意事项 --------

    dialog.buttons.button(
        "[red]注意事项",
        run(() => {
            var dialog2 = new BaseDialog("注意事项");

            dialog2.cont.pane(table => {
                table.add(
                    "[red]极少数人可能会在游玩本mod时，因mod中的闪光或图形出\n" +
                    "现癫痫症状，即便没有癫痫病史也可能出现类似状况。这些症状\n" +
                    "包含眼睛疼痛、视觉异常、偏头痛、痉挛、意识障碍（如昏迷）\n" +
                    "等。若游玩过程中出现上述症状，请立即停止游戏并就医。若您\n" +
                    "或亲属有癫痫病史，游玩前建议咨询医生。同时，可通过坐远屏\n" +
                    "幕、使用小屏幕设备、保持环境明亮、避免疲劳时游戏等方式降\n" +
                    "低风险"
                );
            });

            dialog2.buttons.defaults().size(210, 64);
            dialog2.addCloseButton();
            dialog2.show();
        })
    ).size(110, 64);

    // -------- 制作人员&致谢名单 --------

    dialog.buttons.button(
        "[gold]制作人员&致谢名单",
        run(() => {
            var dialog3 = new BaseDialog("制作人员");

            dialog3.cont.pane(table => {
                table.add(
                    " [gold]作者：[gold]月半猫(qq:3893990966)\n" +
                    "[gold]美术: boebee\n" +
                    "[gold]地图:云舒喵_\n" +
                    "--------------------\n" +
                    "[yellow]沉默是金:深度游玩了护卫并提出不足(●—●)\n" +
                    "C-beverage:投稿了部分贴图\n" +
                    "--------------------\n" +
                    "[yellow]剧情人物:我方(sharder)\n" +
                    "[red]敌方（crux）\n" +
                    "[white]科格拉斯 及其卫星 原住民 虫族"
                );
            });

            dialog3.buttons.defaults().size(210, 64);
            dialog3.addCloseButton();
            dialog3.show();
        })
    ).size(110, 96);

    // -------- 建议与反馈 --------

    dialog.buttons.button(
        "[red]📝 建议与反馈",
        run(() => {
            Core.app.openURI(
                "https://docs.qq.com/form/page/DSFNDTkpkS2FKcE5U"
            );
        })
    ).size(210, 64).pad(10);

    dialog.show();
}));

/*
结构
1（2，3）
*/