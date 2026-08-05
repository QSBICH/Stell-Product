// ============================================
// 智能墙壁：点击后选择一种物品，墙壁会显示选中物品的颜色
// 基础数值由 JSON 定义，JS 只负责交互逻辑
// ============================================

// 获取 JSON 中定义的方块
const 智能墙壁 = Vars.content.block("智能墙壁");

if (智能墙壁 != null) {
    智能墙壁.buildType = prov(() => {
        return new JavaAdapter(Wall.WallBuild, {
            // 当前选中的物品
            selectedItem: null,

            // -------- 点击时打开配置界面 --------
            buildConfiguration(table) {
                table.add("[yellow]点击选择物品:").left().row();
                table.add().row();

                let col = 0;
                Vars.content.items().each(item => {
                    table.button(
                        new TextureRegionDrawable(item.icon(Cicon.medium)),
                        () => {
                            this.selectedItem = item;
                            this.configure(item);
                            Vars.control.input.frag.config.hideConfig();
                        }
                    ).size(36, 36).pad(2);

                    col++;
                    if (col >= 4) {
                        table.row();
                        col = 0;
                    }
                });
            },

            // -------- 保存配置 --------
            configured(player, value) {
                this.super$configured(player, value);
                if (value instanceof Item) {
                    this.selectedItem = value;
                    this.onItemSelected();
                }
            },

            config() {
                return this.selectedItem;
            },

            // -------- 选中物品后触发 --------
            onItemSelected() {
                if (this.selectedItem != null) {
                    Vars.ui.hudfrag.showToast("[green]已选择: " + this.selectedItem.localizedName);
                }
            },

            // -------- 绘制墙壁 --------
            draw() {
                this.super$draw();
                if (this.selectedItem != null) {
                    Draw.color(this.selectedItem.color);
                    Draw.alpha(0.3);
                    Fill.square(this.x, this.y, 6);
                    Draw.alpha(1);
                    Draw.color();
                }
            },

            // -------- 存档 --------
            write(write) {
                this.super$write(write);
                write.s(this.selectedItem == null ? -1 : this.selectedItem.id);
            },

            read(read, revision) {
                this.super$read(read, revision);
                const id = read.s();
                this.selectedItem = id == -1 ? null : Vars.content.item(id);
            }
        }, 智能墙壁);
    });

    print("[green]✅ 智能墙壁功能已加载");
} else {
    print("[red]❌ 未找到智能墙壁，请确认 JSON 文件是否存在");
}