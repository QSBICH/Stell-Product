//借用于ⅠCBM
/**
* v5.2.1
* 修改了查看方块状态一栏的显示，现在只会显示当前的配方
* 现在同一个配方可以输出多种液体了
*/

/**
* v5.1.1
* 添加了制造进度显示条，工艺进度显示条
* stages中，title决定在数据库中的工艺标题，bartitle决定在工艺进度显示条上显示的内容，weight决定当前工艺在总制造时间中的比重，input和output用于编排的数据库中的工艺说明
* 修复了数据库显示中配方被异常居中的问题
*/

/**
* v5.0.1
* 对该文件进行了大量修改
* 目前MultiCrafter只会接收/输出与当前配方相关的物品/液体
* 重新设计了数据库中的配方显示并添加了新的stages和group可供引用
* 对文件内的许多地方进行了注释
* 该文件最下方有使用示例
*
* 仍然不能在同一个配方输出多种液体
* 仍然不能使用热量
*/

/**
* v4
* 修复由于臭猫删东西导致的闪退，适配147
*/
/**
* v3
* 没啥，就是适配了136的更新
*/

/**
* v2
* 第二个版本发布是因为发现物品一直会跳
* 这个版本就是将这个bug修复(其实就是把原本覆盖的去除用原版的table)，其次物品消耗stat框颜色可以自己更改了，看下面注释，其实就是小改，主要怕你们删错，以后可能会改展示
* 保留所有注释，如有侵权，立即删除
*/

/**
* @author < (main) younggam 6.0 : v1 >
* @author < guiY 7.0 adapter&remake : v2 >
* @author < 晓伟 136 adapter : v3 >
* @应该不算anthor < R 147 adapter : v4 >
* @readme <
    Version 6.0 To version 7.0 Not available due to changes in game source code,
    for example, NumberValue becomes StatValues.number, This means that some parameters and internal functions are changed,
    i just change some parameters and functions, to make it can adapt ver 7.0(and StatValue can be extended[line 554])
    Item display has been fixed
>
* @anthor < 冰汐Angel 148 adapter : v5.*.*>
* @readme <
    The modification of this file has been approved by guiY
    I have made many modifications to this file to make it more user-friendly(Maybe)
>
*/

//这个函数定义了多配方合成器的实体行为，它是合成器的核心逻辑
function MultiCrafterBuild() {
    this.acceptItem = function(source, item) {
        if(this._toggle < 0) return false;
        if(typeof this.block["getInputItemSet"] !== "function") return false;
        if(this.items.get(item) >= this.getMaximumAccepted(item)) return false;
        // 没有选择配方时，拒绝所有物品输入
        if(this._toggle >= 0) {
            const recipe = this.block.getRecipes()[this._toggle];
            return recipe.input.items.some(stack => stack.item === item);
        }// 只接受当前配方需要的物品
        return false; // 默认拒绝
    };//判断是否接受某个物品,检查是否有`getInputItemSet`方法，物品是否未满，以及物品是否在输入物品集合中
    this.acceptLiquid = function(source, liquid) {
        if(this._toggle < 0) return false;
        if(typeof this.block["getInputLiquidSet"] !== "function") return false;
        // 没有选择配方时，拒绝所有液体输入
        if(this._toggle >= 0) {
            const recipe = this.block.getRecipes()[this._toggle];
            return recipe.input.liquids.some(stack => stack.liquid === liquid);
        }// 只接受当前配方需要的液体
        return false; // 默认拒绝
    };//判断是否接受某种液体，检查液体是否在输入液体集合中
    //以上两段已被修改以强化输入逻辑
    
    this.removeStack = function(item, amount) {
        var ret = this.super$removeStack(item, amount);
        if(!this.items.has(item)) this.toOutputItemSet.remove(item);
        return ret;
    };//移除物品，如果物品被移除完，则将其从输出集合中移除
    this.handleItem = function(source, item) {
        var current = this._toggle;
        if(current > -1 && this.block.getRecipes()[current].output.items.some(a => a.item == item)) {
            this.toOutputItemSet.add(item);
        }// 仅当物品属于当前配方的输出时才加入输出集合
        this.items.add(item, 1);
    };//处理接收到的物品
    this.handleStack = function(item, amount, tile, source) {
        var current = this._toggle;
        if(current > -1 && this.block.getRecipes()[current].output.items.some(a => a.item == item)) {
            this.toOutputItemSet.add(item);
        }// 仅当物品属于当前配方的输出时才加入输出集合
        this.items.add(item, amount);
    };//与`handleItem`类似，但处理多个物品
    //以上两段被修改以强化输出匹配
    
    this.displayConsumption = function(table) {
        if(typeof this.block["getRecipes"] !== "function") return;
        const recs = this.block.getRecipes();
        if (this.config() !== null){var current = this.config()}else{var current = -1};
        if (current >= 0){
            var items = recs[current].input.items;
            var _items = recs[current].output.items;
            var liquids = recs[current].input.liquids;
            var _liquids = recs[current].output.liquids;
            table.left();
            for(var j = 0, len = items.length; j < len; j++) {
                (function(that, stack) {
                    table.add(new ReqImage(new StatValues.stack(stack.item, stack.amount), () => that.items != null && that.items.has(stack.item, stack.amount))).size(8 * 4);
                })(this, items[j]);
            };
            for(var k = 0, len = liquids.length; k < len; k++) {
                (function(that, stack) {
                    table.add(new ReqImage(new StatValues.stack(stack.liquid, stack.amount), () => that.liquids != null && that.liquids.get(stack.liquid) > stack.amount)).size(8 * 4);
                })(this, liquids[k]);
            };
            table.add(" => ");
            for(var l = 0, len = _items.length; l < len; l++) {
                (function(that, stack) {
                    table.add(new ReqImage(new StatValues.stack(stack.item, stack.amount), () => that.items != null && that.items.has(stack.item, stack.amount))).size(8 * 4);
                })(this, _items[l]);
            };
            for(var m = 0, len = _liquids.length; m < len; m++) {
                (function(that, stack) {
                    table.add(new ReqImage(new StatValues.stack(stack.liquid, stack.amount), () => that.liquids != null && that.liquids.get(stack.liquid) > stack.amount)).size(8 * 4);
                })(this, _liquids[m]);
            };
        }else{
            table.left();
            table.add("  未选择配方")
        }
    };//在UI中显示合成所需的输入（物品和液体），根据配方列表动态创建显示元素
    
    this.getPowerProduction = function() {
        var i = this._toggle;
        if(i < 0 || typeof this.block["getRecipes"] !== "function") return 0;
        var oPower = this.block.getRecipes()[i].output.power;
        if(oPower > 0 && this._cond) {
            if(this.block.getRecipes()[i].input.power > 0) {
                this._powerStat = this.efficiency();
                return oPower * this.efficiency();
            } else {
                this._powerStat = 1;
                return oPower;
            };
        }
        this._powerStat = 0;
        return 0;
    };//计算并返回当前产生的功率，如果当前配方有功率输出且条件满足（`_cond`为真），则返回功率值
    this.getProgressIncreaseA = function(i, baseTime) {
        if(typeof this.block["getRecipes"] !== "function" || this.block.getRecipes()[i].input.power > 0) return this.getProgressIncrease(baseTime);
        else return 1 / baseTime * this.delta();
    };//计算进度增长，如果配方不需要输入功率，则使用自定义计算方式（基于时间增量）
    this.checkinput = function(i) {
        const recs = this.block.getRecipes();
        var items = recs[i].input.items;
        var liquids = recs[i].input.liquids;
        if(!this.items.has(items)) return true;
        for(var j = 0, len = liquids.length; j < len; j++) {
            if(this.liquids.get(liquids[j].liquid) < liquids[j].amount) return true;
        };
        return false;
    };//检查当前配方的输入物品和液体是否足够
    this.checkoutput = function(i) {
        const recs = this.block.getRecipes();
        var items = recs[i].output.items;
        var liquids = recs[i].output.liquids;
        for(var j = 0, len = items.length; j < len; j++) {
            if(this.items.get(items[j].item) + items[j].amount > this.getMaximumAccepted(items[j].item)) return true;
        };
        for(var j = 0, len = liquids.length; j < len; j++) {
            if(this.liquids.get(liquids[j].liquid) + liquids[j].amount > this.block.liquidCapacity) return true;
        };
        return false;
    };//检查当前配方的输出物品和液体是否超出容量
    this.checkCond = function(i) {
        if(this.block.getRecipes()[i].input.power > 0 && this.power.status <= 0) {
            this._condValid = false;
            this._cond = false;
            return false;
        } else if(this.checkinput(i)) {
            this._condValid = false;
            this._cond = false;
            return false;
        } else if(this.checkoutput(i)) {
            this._condValid = true;
            this._cond = false;
            return false;
        };
        this._condValid = true;
        this._cond = true;
        return true;
    };//检查合成条件是否满足（输入、输出、功率等），并设置`_cond`和`_condValid`状态
    this.customCons = function(i) {
        const recs = this.block.getRecipes();
        if(this.checkCond(i)) {
            if(this.progressArr[i] != 0 && this.progressArr[i] != null) {
                this.progress = this.progressArr[i];
                this.progressArr[i] = 0;
            };
            this.progress += this.getProgressIncreaseA(i, recs[i].craftTime);
            this.totalProgress += this.delta();
            this.warmup = Mathf.lerpDelta(this.warmup, 1, 0.02);
            if(Mathf.chance(Time.delta * this.updateEffectChance)) Effects.effect(this.updateEffect, this.x + Mathf.range(this.size * 4), this.y + Mathf.range(this.size * 4));
        } else this.warmup = Mathf.lerp(this.warmup, 0, 0.02);
    };//自定义消耗逻辑，如果条件满足，则增加进度条；否则，预热值（warmup）逐渐减少
    this.customProd = function(i) {
        const recs = this.block.getRecipes();
        var inputItems = recs[i].input.items;
        var inputLiquids = recs[i].input.liquids;
        var outputItems = recs[i].output.items;
        var outputLiquids = recs[i].output.liquids;
        var eItems = this.items;
        var eLiquids = this.liquids;
        for(var k = 0, len = inputItems.length; k < len; k++) eItems.remove(inputItems[k]);
        for(var j = 0, len = inputLiquids.length; j < len; j++) eLiquids.remove(inputLiquids[j].liquid, inputLiquids[j].amount);
        for(var a = 0, len = outputItems.length; a < len; a++) {
            for(var aa = 0, amount = outputItems[a].amount; aa < amount; aa++) {
                var oItem = outputItems[a].item
                if(!this.put(oItem)) {
                    if(!eItems.has(oItem)) this.toOutputItemSet.add(oItem);
                    eItems.add(oItem, 1);
                };
            };
        };
        for(var j = 0, len = outputLiquids.length; j < len; j++) {
            var oLiquid = outputLiquids[j].liquid;
            if(eLiquids.get(oLiquid) <= 0.001) this.toOutputLiquidset.add(oLiquid);
            this.handleLiquid(this, oLiquid, outputLiquids[j].amount);
        };
        this.block.craftEffect.at(this.x, this.y);
        this.progress = 0;
    };//自定义生产逻辑，消耗输入物品和液体，产生输出物品和液体，并播放效果
    this.updateTile = function() {
        if(typeof this.block["getRecipes"] !== "function") return;
        if(this.timer.get(1, 60)) {
            this.itemHas = 0;
            this.items.each(item => this.itemHas++);
        };
        if(!Vars.headless/*T*/) this.block.invFrag.hide();
        const recs = this.block.getRecipes();
        var recLen = recs.length;
        var current = this._toggle;
        if(typeof this["customUpdate"] === "function") this.customUpdate();
        if(current >= 0) {
            this.customCons(current);
            if(this.progress >= 1) this.customProd(current);
        };
        var eItems = this.items;
        var eLiquids = this.liquids;
        if(this.block.doDumpToggle() && current == -1) return;
        var validOutputs = current > -1 ? 
        this.block.getRecipes()[current].output.items.map(i => i.item) : 
        [];
        var queItemSeq = this.toOutputItemSet.orderedItems();
        var queItem = [];
        for (var idx = 0; idx < queItemSeq.size; idx++) {
        var item = queItemSeq.get(idx);
            if (validOutputs.includes(item)) {
                queItem.push(item);
            }
        }
        var que = this.toOutputItemSet.orderedItems(),
            len = que.size,
            itemEntry = this.dumpItemEntry;
        if(this.timer.get(this.block.dumpTime) && len > 0) {
            for(var i = 0; i < len; i++) {
                var candidate = que.get((i + itemEntry) % len);
                if(this.put(candidate)) {
                    eItems.remove(candidate, 1);
                    if(!eItems.has(candidate)) this.toOutputItemSet.remove(candidate);
                    break;
                };
            };
            if(i != len) this.dumpItemEntry = (i + itemEntry) % len;
        };
        if (current >= 0) {
            for(var l = 0 ; l < recs[current].output.liquids.length ; l++){
                var ll = l + this._Direction;
                if(ll >= 4){
                    this.dumpLiquid(recs[current].output.liquids[l].liquid, 10.0, ll - 4);
                }else{
                    this.dumpLiquid(recs[current].output.liquids[l].liquid, 10.0, ll);
                }
            }
        }//处理多液体输出
    };//每帧更新实体。包括处理配方切换、消耗输入、生产输出、转储输出物品和液体等
    this.shouldConsume = function() {
        return this._condValid && this.productionValid();
    };//是否应该消耗资源（当条件有效且生产有效时）
    this.productionValid = function() {
        return this._cond && this.enabled;
    };//生产是否有效（条件满足且启用）

    /*this.updateTableAlign = function(table) {
        var pos = Core.input.mouseScreen(this.x, this.y - this.block.size * 4 - 1).y;
        var relative = Core.input.mouseScreen(this.x, this.y + this.block.size * 4);
        table.setPosition(relative.x, Math.min(pos, relative.y - Math.ceil(this.itemHas / 3) * 48 - 4), Align.top);
        if(!this.block.getInvFrag().isShown() && Vars.control.input.frag.config.getSelectedTile() == this && this.items.total() > 0) this.block.getInvFrag().showFor(this);
    };*/
   
    this.buildConfiguration = function(table) {
        table.table(cons(buttonTable => {
            buttonTable.add("[accent]流体输出法线:").left().padRight(5);
            var switchButton = buttonTable.button(Tex.pane, Styles.clearTogglei, 40, () => {
                this._Direction += 1;
                if(this._Direction >= 4){this._Direction = 0};
            }).get();
            switchButton.update(() => {
                switchButton.clearChildren();
                var d = ["右","上","左","下"];
                switchButton.add(d[this._Direction]).color(Color.white);
            });
        })).left().row();
        table.add("[lightgray]该配方各种输出流体的输出方向").left().row();
        table.add("[lightgray]会以此方向为准逆时针排列").left().row();
        if(typeof this.block["getRecipes"] !== "function") return;
        const recs = this.block.getRecipes(),
            invFrag = this.block.getInvFrag();
        if(!invFrag.isBuilt()) invFrag.build(table.parent);
        if(invFrag.isShown()) {
            invFrag.hide();
           Vars.control.input.frag.config.hideConfig();
        return;
        };
        var group = new ButtonGroup();
        group.setMinCheckCount(0);
        group.setMaxCheckCount(1);
        for(var i = 0; i < recs.length; i++) {
            table.table(cons(recipeRow => {
                recipeRow.left();
                (function(i, that) {
                    var output = recs[i].output;
                    var button = recipeRow.button(Tex.pane,40,() => that.configure(button.isChecked() ? i : -1))
                        .group(group)
                        .get();
                    button.getStyle().up = Styles.black3;
                    button.getStyle().down = Styles.flatOver;
                    button.getStyle().checked = Styles.accentDrawable;
                    let icon = Icon.cancel;
                    if(output.items.length > 0) {
                        icon = output.items[0].item.uiIcon;
                    } else if(output.liquids.length > 0) {
                        icon = output.liquids[0].liquid.uiIcon;
                    } else if(output.power > 0) {
                        icon = Icon.power;
                    }
                    button.getStyle().imageUp = new TextureRegionDrawable(icon);
                    button.update(() => button.setChecked(i==that._toggle));
                })(i, this);
                recipeRow.table(cons(outputTable => {
                    outputTable.left();
                    for(var j = 0; j < recs[i].output.items.length; j++) {
                        outputTable.image(recs[i].output.items[j].item.uiIcon)
                            .size(24)
                            .padRight(4);
                    }
                    for(var j = 0; j < recs[i].output.liquids.length; j++) {
                    outputTable.image(recs[i].output.liquids[j].liquid.uiIcon)
                        .size(24)
                        .padRight(4);
                }
                if(recs[i].output.power > 0) {
                    outputTable.image(Icon.power)
                        .size(24)
                        .padRight(4);
                }
                })).padLeft(10);
            })).left().fillX().row();
        }
    }; // 构建配置界面

    this.configured = function(player, value) {
        if(isNaN(value) || typeof value != "number") {
            this._toggle = -1;
            this._cond = false;
            this._condValid = false;
            return;
        };
        var current = this._toggle;
        if(current >= 0) this.progressArr[current] = this.progress;
        if(value == -1) {
            this._condValid = false;
            this._cond = false;
        };
        if(this.block.doDumpToggle()) {
            this.toOutputItemSet.clear();
            this.toOutputLiquidset.clear();
            if(value > -1) {
                var oItems = this.block.getRecipes()[value].output.items;
                var oLiquids = this.block.getRecipes()[value].output.liquids;
                for(var i = 0, len = oItems.length; i < len; i++) {
                    var item = oItems[i].item;
                    if(this.items.has(item)) this.toOutputItemSet.add(item);
                };
                for(var i = 0, len = oLiquids.length; i < len; i++) {
                    var liquid = oLiquids[i].liquid;
                    if(this.liquids.get(liquid) > 0.001) this.toOutputLiquidset.add(liquid);
                };
            };
        };
        this.progress = 0;
        this._toggle = value;
    };//当玩家配置时调用，设置当前配方索引（`_toggle`），并处理进度保存和输出集合更新
    this.onConfigureTileTapped = function(other) {
        return this.items.total() > 0 ? true : this != other;
    };//当点击配置时，如果该实体有物品，则返回true（允许配置），否则返回是否不是同一个实体
    
    this.getToggle = function() {
        return this._toggle;
    };//获取当前配方的索引
    this._toggle = 0;
    this._Direction = 0;
    this.getDirection = function() {
        return this._Direction;
    };//获取当前流体输出的索引。
    this.progressArr = [];
    this.getCond = function() {
        return this._cond;
    };
    this._cond = false;
    this._condValid = false;
    this.getCondValid = function() {
        return this._condValid;
    };
    this.getPowerStat = function() {
        return this._powerStat;
    };
    //获取内部状态
    this._powerStat = 0;
    this.toOutputItemSet = new OrderedSet();
    this.toOutputLiquidset = new OrderedSet();
    this.dumpItemEntry = 0;
    this.itemHas = 0;
    this.config = function() {
        return this._toggle;
    };
    this.write = function(write) {
        this.super$write(write);
        write.s(this._toggle);
        write.i(this._Direction);
        var queItem = this.toOutputItemSet.orderedItems(),
            len = queItem.size;
        write.s(len);
        for(var i = 0; i < len; i++) write.s(queItem.get(i).id);
        var queLiquid = this.toOutputLiquidset.orderedItems(),
            len = queLiquid.size;
        write.s(len);
        for(var i = 0; i < len; i++) write.s(queLiquid.get(i).id);
    };//写入实体数据到字节流（保存游戏时），包括当前配方索引和输出集合中的物品/液体ID
    this.read = function(read, revision) {
        this.super$read(read, revision);
        this._toggle = read.s();
        this._Direction = read.i();
        this.toOutputItemSet.clear();
        this.toOutputLiquidset.clear();
        var len = read.s(),
            vc = Vars.content,
            ci = ContentType.item,
            cl = ContentType.liquid;
        for(var i = 0; i < len; i++) this.toOutputItemSet.add(vc.getByID(ci, read.s()));
        var len = read.s();
        for(var i = 0; i < len; i++) this.toOutputLiquidset.add(vc.getByID(cl, read.s()));
    };//从字节流中读取实体数据（加载游戏时），恢复当前配方索引和输出集合
};

//这个函数定义了多配方合成器的方块（Block）行为
function MultiCrafterBlock() {
    this.tmpRecs = [];
    var recs = [];
    var infoStyle = null;
    this.getRecipes = function() {
        return recs;
    };
    this._liquidSet = new ObjectSet();
    this.getLiquidSet = function() {
        return this._liquidSet;
    };
    this.hasOutputItem = false;
    this._inputItemSet = new ObjectSet();
    this.getInputItemSet = function() {
        return this._inputItemSet;
    };
    this._inputLiquidSet = new ObjectSet();
    this.getInputLiquidSet = function() {
        return this._inputLiquidSet;
    };
    this._outputItemSet = new ObjectSet();
    this.getOutputItemSet = function() {
        return this._outputItemSet;
    };
    this._outputLiquidSet = new ObjectSet();
    this.getOutputLiquidSet = function() {
        return this._outputLiquidSet;
    };
    this.dumpToggle = false;
    this.doDumpToggle = function() {
        return this.dumpToggle;
    };
    this.powerBarI = false;
    this.powerBarO = false;
    this._invFrag = extend(BlockInventoryFragment, {
        _built: false,
        isBuilt() {
            return this._built;
        },
        visible: false,
        isShown() {
            return this.visible;
        },
        showFor(t) {
            this.visible = true;
            this.super$showFor(t);
        },
        hide() {
            this.visible = false;
            this.super$hide();
        },
        build(parent) {
            this._built = true;
            this.super$build(parent);
        }
    });
    this.getInvFrag = function() {
        return this._invFrag;
    };
    this.init = function() {
        for(var i = 0; i < this.tmpRecs.length; i++) {
            var tmp = this.tmpRecs[i];
            var isInputExist = tmp.input != null,
                isOutputExist = tmp.output != null;
            var tmpInput = tmp.input;
            var tmpOutput = tmp.output;
            if(isInputExist && tmpInput.power > 0) this.powerBarI = true;
            if(isOutputExist && tmpOutput.power > 0) this.powerBarO = true;
            recs[i] = {
                input: {
                    items: [],
                    liquids: [],
                    power: isInputExist ? typeof tmpInput.power == "number" ? tmpInput.power : 0 : 0
                },
                output: {
                    items: [],
                    liquids: [],
                    power: isOutputExist ? typeof tmpOutput.power == "number" ? tmpOutput.power : 0 : 0
                },
                stages: tmp.stages || [], // 新增：阶段工艺
                craftTime: typeof tmp.craftTime == "number" ? tmp.craftTime : 80,
                group: tmp.group || "group", //新增：分组
                title: tmp.title || "配方" // 新增：配方标题
            };
            var vc = Vars.content;
            var ci = ContentType.item;
            var cl = ContentType.liquid;
            var realInput = recs[i].input;
            var realOutput = recs[i].output;
            if(isInputExist) {
                if(tmpInput.items != null) {
                    for(var j = 0, len = tmpInput.items.length; j < len; j++) {
                        if(typeof tmpInput.items[j] != "string") throw "It is not string at " + j + "th input item in " + i + "th recipe";
                        var words = tmpInput.items[j].split("/");
                        if(words.length != 2) throw "Malform at " + j + "th input item in " + i + "th recipe";
                        var item = vc.getByName(ci, words[0]);
                        if(item == null) throw "Invalid item: " + words[0] + " at " + j + "th input item in " + i + "th recipe";
                        this._inputItemSet.add(item);
                        if(isNaN(words[1])) throw "Invalid amount: " + words[1] + " at " + j + "th input item in " + i + "th recipe";
                        realInput.items[j] = new ItemStack(item, words[1] * 1);
                    };
                };
                if(tmpInput.liquids != null) {
                    for(var j = 0, len = tmpInput.liquids.length; j < len; j++) {
                        if(typeof tmpInput.liquids[j] != "string") throw "It is not string at " + j + "th input liquid in " + i + "th recipe";
                        var words = tmpInput.liquids[j].split("/");
                        if(words.length != 2) throw "Malform at " + j + "th input liquid in " + i + "th recipe";
                        var liquid = vc.getByName(cl, words[0]);
                        if(liquid == null) throw "Invalid liquid: " + words[0] + " at " + j + "th input liquid in " + i + "th recipe";
                        this._inputLiquidSet.add(liquid);
                        this._liquidSet.add(liquid);
                        if(isNaN(words[1])) throw "Invalid amount: " + words[1] + " at " + j + "th input liquid in " + i + "th recipe";
                        realInput.liquids[j] = new LiquidStack(liquid, words[1] * 1);
                    };
                };
            };
            if(isOutputExist) {
                if(tmpOutput.items != null) {
                    for(var j = 0, len = tmpOutput.items.length; j < len; j++) {
                        if(typeof tmpOutput.items[j] != "string") throw "It is not string at " + j + "th output item in " + i + "th recipe";
                        var words = tmpOutput.items[j].split("/");
                        if(words.length != 2) throw "Malform at " + j + "th output item in " + i + "th recipe"
                        var item = vc.getByName(ci, words[0]);
                        if(item == null) throw "Invalid item: " + words[0] + " at " + j + "th output item in " + i + "th recipe";
                        this.outputItemSet.add(item);
                        if(isNaN(words[1])) throw "Invalid amount: " + words[1] + " at " + j + "th output item in " + i + "th recipe";
                        realOutput.items[j] = new ItemStack(item, words[1] * 1);
                    };
                    if(j != 0) this.hasOutputItem = true;
                };
                if(tmpOutput.liquids != null) {
                    for(var j = 0, len = tmpOutput.liquids.length; j < len; j++) {
                        if(typeof tmpOutput.liquids[j] != "string") throw "It is not string at " + j + "th output liquid in " + i + "th recipe";
                        var words = tmpOutput.liquids[j].split("/");
                        if(words.length != 2) throw "Malform at " + j + "th output liquid in " + i + "th recipe";
                        var liquid = vc.getByName(cl, words[0]);
                        if(liquid == null) throw "Invalid liquid: " + words[0] + " at " + j + "th output liquid in " + i + "th recipe";
                        this._outputLiquidSet.add(liquid);
                        this._liquidSet.add(liquid);
                        if(isNaN(words[1])) throw "Invalid amount: " + words[1] + " at " + j + "th output liquid in " + i + "th recipe";
                        realOutput.liquids[j] = new LiquidStack(liquid, words[1] * 1);
                    };
                };
            };
        };
        this.hasPower = this.powerBarI || this.powerBarO;
        if(this.powerBarI) this.consumeBuilder.add(extend(ConsumePower, {
            requestedPower(entity) {
                if(typeof entity["getToggle"] !== "function") return 0;
                var i = entity.getToggle();
                if(i < 0) return 0;
                var input = entity.block.getRecipes()[i].input.power;
                if(input > 0 && entity.getCond()) return input;
                return 0;
            }
        }));
        this.consumesPower = this.powerBarI;
        this.outputsPower = this.powerBarO;
        this.super$init();
        if(!this._outputLiquidSet.isEmpty()) this.outputsLiquid = true;
        this.timers++;
        if(!Vars.headless) infoStyle = Core.scene.getStyle(Button.ButtonStyle);
    };//初始化方块，解析配方，设置输入输出集合，处理功率消耗和输出，调用父类初始化
    
    this.setStats = function() {
        this.super$setStats();
        if(this.powerBarI) this.stats.remove(Stat.powerUse);
        this.stats.remove(Stat.productionTime);
        this.stats.add(Stat.input, new JavaAdapter(StatValue, {
        display(table){
        var groupedRecs = {};
        var defaultGroupCounter = 0;
        for (var i = 0; i < recs.length; i++) {
                var rec = recs[i];
                // 处理没有分组的情况 - 创建唯一组名
                if (rec.group == "group") {
                    rec.group = "@group" + defaultGroupCounter.toString();
                    defaultGroupCounter++;
                }
                // 按分组归类
                if (!groupedRecs[rec.group]) {
                    groupedRecs[rec.group] = [];
                }
                groupedRecs[rec.group].push(rec);
            }
        table.row();
        // 按分组显示配方
        for (var groupName in groupedRecs) {
            var groupRecs = groupedRecs[groupName];
            // 创建一个表格容纳整个分组（标题+所有配方）
            table.table(Styles.grayPanel, function(groupTable) {
                if (groupName.indexOf("@group") !== 0) { // 处理不是默认组的情况
                    // 添加分组标题
                    groupTable.add("[accent]" + groupName).left().row();
                    groupTable.add().size(8).row(); // 标题与内容间距
                }
                // 显示组内所有配方
                for (var j = 0; j < groupRecs.length; j++) {
                    var rec = groupRecs[j];
                    var outputItems = rec.output.items,
                        inputItems = rec.input.items;
                    var outputLiquids = rec.output.liquids,
                        inputLiquids = rec.input.liquids;
                    var inputPower = rec.input.power,
                        outputPower = rec.output.power;
                    // 添加配方标题和内容
                    groupTable.table(Styles.none, function(part) {
                        part.defaults().pad(2);
                        part.add("[accent]  [" + rec.title + "]").left().row();
                        part.add().size(5).row();
                        // ==== 输入部分 ====
                        part.table(cons(function(row) {
                            // 输入标题
                            row.add("[lightgray]    " + Stat.input.localized() + ":[]").left().padRight(8);
                            // 合并显示输入物品和液体
                            for (var l = 0; l < inputItems.length; l++) 
                                row.add(new StatValues.displayItem(inputItems[l].item, inputItems[l].amount, true)).padRight(5);
                                row.add(" || ").padRight(5);
                            for (var l = 0; l < inputLiquids.length; l++) 
                                row.add(new StatValues.displayLiquid(inputLiquids[l].liquid, inputLiquids[l].amount, false)).padRight(5);
                        })).left().row();
                        // ==== 输出部分 ====
                        part.table(cons(function(row) {
                            // 输出标题
                            row.add("[lightgray]    " + Stat.output.localized() + ":[]").left().padRight(8);
                            // 合并显示输出物品和液体
                            for (var jj = 0; jj < outputItems.length; jj++) 
                                row.add(new StatValues.displayItem(outputItems[jj].item, outputItems[jj].amount, true)).padRight(5);
                                row.add(" || ").padRight(5);
                            for (var jj = 0; jj < outputLiquids.length; jj++) 
                                row.add(new StatValues.displayLiquid(outputLiquids[jj].liquid, outputLiquids[jj].amount, false)).padRight(5);
                        })).left().row();
                        // ==== 电力信息 ====
                        if (inputPower > 0 || outputPower > 0) {
                            part.table(cons(function(row) {
                                // 输入电力（消耗）
                                if (inputPower > 0) {
                                    row.add("[lightgray]    " + Stat.powerUse.localized() + ":[]").padRight(4);
                                    (StatValues.number(rec.input.power * 60, StatUnit.powerSecond)).display(row);
                                    row.add().size(10); // 添加间距
                                }
                                // 输出电力（生产）
                                if (outputPower > 0) {
                                    row.add("[lightgray]    " + Stat.basePowerGeneration.localized() + ":[]").padRight(4);
                                    (StatValues.number(rec.output.power * 60, StatUnit.powerSecond)).display(row);
                                }
                            })).left().row();
                        }
                        // ==== 生产时间 ====
                        part.table(cons(function(row) {
                            row.add("[lightgray]    " + Stat.productionTime.localized() + ":[]").padRight(4);
                            (StatValues.number(rec.craftTime / 60, StatUnit.seconds)).display(row);
                        })).pad(5).left().row();
                        if (typeof this["customDisplay"] === "function") this.customDisplay(part, j);
                        if (rec.stages.length > 0) {
                            part.add("[white]  阶段工艺").left().row();
                            part.table(cons(function(row) {
                                for (var s = 0; s < rec.stages.length; s++) {
                                    var stage = rec.stages[s];
                                    row.add().size(5).row();
                                    var minorIndex = stage.title.indexOf("@minor");
                                    if (minorIndex >= 0) {
                                        var beforeMinor = stage.title.substring(0, minorIndex);
                                        var afterMinor = stage.title.substring(minorIndex + 6);
                                        row.add("[lightgray]    " + beforeMinor + "[gray]" + afterMinor + "[]").left().row();
                                    } else {
                                        row.add("[lightgray]    " + stage.title + "[]").left().row();
                                    }
                                    if (stage.input && stage.input.length > 0) {
                                        row.add("[grey]      " + stage.input.join(" + ") + " ==> " + stage.output.join(" + ")).left().row();
                                    }
                                }
                            })).left().row();
                        }
                    }).pad(5).left().row();
                }
            }).pad(10).left().row(); // 整个分组表格的外边距
            // 分组之间的间距
            table.add().size(18).row();
            }},
        }));
    };//设置方块的统计信息，显示每个配方的输入输出以及生产时间

    this.setBars = function() {
        this.super$setBars();
        this.removeBar("liquid");
        this.removeBar("items");
        if(!this.powerBarI && this.hasPower) this.removeBar("power");
        if(this.powerBarO) this.addBar("poweroutput", entity => new Bar(() => Core.bundle.format("bar.poweroutput", entity.getPowerProduction() * 60 * entity.timeScale), () => Pal.powerBar, () => typeof entity["getPowerStat"] === "function" ? entity.getPowerStat() : 0));
        var i = 0;
        
        //添加一个总制造进度进度条
        this.addBar("newBar", 
            entity => new Bar(
                () => "当前配方制造进度: " + Math.floor(entity.progress * 100) + "%",
                () => Color.valueOf("ffb000"),
                () => entity.progress / 1
            )
        );
        
        //添加一个工艺进度进度条
        this.addBar("stageBar", 
            entity => new Bar(
                () => {
                   if (entity.config() >= 0) {
                       var Stages = recs [entity.config()].stages.length;
                       var stageWeights = 0;
                       if ( Stages >= 1) {
                       for (var ja = 0 ; ja < Stages ; ja++){
                           if (recs[entity.config()].stages[ja].weight != null) {var stageWeight = recs[entity.config()].stages[ja].weight}else{var stageWeight = 10}; //确保工艺有权重
                           var stageWeights = stageWeights + stageWeight;
                       } //计算总权重
                       var stageProgress = entity.progress * stageWeights; //计算权重进度
                       var sta = 0;
                       for (var jb = 0; jb < Stages; jb++){
                           if (recs[entity.config()].stages[jb].weight != null) {var stageWeight = recs[entity.config()].stages[jb].weight}else{var stageWeight = 10}; //确保工艺有权重
                           var st = sta + stageWeight; //计算当前工艺阶段的阈值
                           if (stageProgress < st){
                               if (recs[entity.config()].stages[jb].bartitle !== undefined){var stageBarView = recs[entity.config()].stages[jb].bartitle}else{var stageBarView = "处理工艺..."}; //若权重精度小于当前累积的阈值，则显示当前累计到的工艺名称，若当前工艺没定义进度条显示则返回默认值
                               break
                           }else{
                               var sta = sta + stageWeight; //若当前生产进度小于阈值，这推进到下一个工艺阶段
                           }
                       } //计算应显示工艺进度条设置
                       return stageBarView + " [" + (jb + 1) + "/" + Stages + "]";//st + "艹TMDjvav";
                       }else{
                           return "[工艺保密]";
                       }//若当前配方没工艺则返回默认值
                   } else {
                       return "空闲";
                   }//选择了配方则显示工艺进度条设置
                },
                () => Color.valueOf("ffb000"),
                () => {
                   if (entity.config() >= 0) {
                       var Stages = recs [entity.config()].stages.length;
                       var stageWeights = 0;
                       if ( Stages >= 1) {
                       for (var ja = 0 ; ja < Stages ; ja++){
                           if (recs[entity.config()].stages[ja].weight != null) {var stageWeight = recs[entity.config()].stages[ja].weight}else{var stageWeight = 10}; //确保工艺有权重
                           var stageWeights = stageWeights + stageWeight;
                       } //计算总权重
                       var stageProgress = entity.progress * stageWeights; //计算权重进度
                       var sta = 0;
                       for (var jb = 0; jb < Stages; jb++){
                           if (recs[entity.config()].stages[jb].weight != null) {var stageWeight = recs[entity.config()].stages[jb].weight}else{var stageWeight = 10}; //确保工艺有权重
                           var st = sta + stageWeight; //计算当前工艺阶段的阈值
                           if (stageProgress < st){
                               var stageBarNumber = (stageProgress - st + stageWeight) / stageWeight;
                               break
                           }else{
                               var sta = sta + stageWeight; //若当前生产进度小于阈值，这推进到下一个工艺阶段
                           }
                       } //计算工艺当前进度
                       return stageBarNumber;
                       }else{
                           return 0;
                       }//若当前配方没工艺则返回默认值
                   } else {
                       return 0;
                   }//选择了配方则开始计算工艺进度
                },
            )
        );
        
        if(!this._liquidSet.isEmpty()) {
            this._liquidSet.each(k => {
                this.addBar("liquid" + i, entity => new Bar(() => k.localizedName, () => k.barColor == null ? k.color : k.barColor, () => entity.liquids.get(k) / this.liquidCapacity));
                i++;
            });
        }
    }//绘制电力条，液体条等
    
    this.outputsItems = function() {
        return this.hasOutputItem;
    }//返回是否有物品输出
}

function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(typeof obj[i] == "object" && obj[i] != null) clone[i] = cloneObject(obj[i]);
        else clone[i] = obj[i];
    }
    return clone;
}//深拷贝对象，用于复制额外的实体定义

//模块导出
module.exports = {
    MultiCrafter(Type, EntityType, name, recipes, def, ExtraEntityDef) {
        const block = new MultiCrafterBlock();// 创建MultiCrafterBlock实例
        Object.assign(block, def);// 将传入的def属性复制到block
        const multi = extend(Type, name, block);//使用传入的Type（如Block）创建新方块
        multi.buildType = () => extend(EntityType, multi, Object.assign(new MultiCrafterBuild(), typeof ExtraEntityDef == "function" ? new ExtraEntityDef() : cloneObject(ExtraEntityDef)));// 设置方块的构建类型（即实体类型），组合了MultiCrafterBuild和额外定义
        multi.configurable = true;// 设置方块可配置
        multi.hasItems = true;// 设置方块有物品
        multi.hasLiquids = true;// 设置方块有液体
        multi.hasPower = true;// 设置方块有功率
        multi.tmpRecs = recipes;// 传入的配方数组
        multi.saveConfig = true;// 保存配置
        return multi;
    }
}


/*
const library = require("MultiCrafter-library");
const furnace = library.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild,"NewCrater", [
    {
		input: {
			items: ["FirstItem/5","SecondItem/5"],
			liquids: ["FirstLiquid/5"],
			power: 2,
		},
		output: {
			items: ["ThirdItem/5"],
			liquids: ["SecondLiquid/5"],
		},
		stages: [
		    {
		        title: "Junior skill name@minor  Minor skill name or explain",
		        input: ["A name","A other name"],
    		    output: ["A new name","A new other name"],
		    },
		    {
		        title: "The next junior skill name@minor  You can input anything you want.",
		        input: ["Maybe there is a name, too","In fact, you can input anything you want in it."],
    		    output: ["As mentioned earlier"],
		    }
		],
        craftTime: 300,
        title: "A main name about the recipe",
        group: "You can input something in it, Some recipes will in the same table if there is same",
	},
);
*/