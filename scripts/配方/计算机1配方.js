const library = require("library");
const myitems = require("特定/物品");
const myliquids = require("特定/物品");

const 计算机1 = library.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "计算机1", [
    {
        input: {
            items: ["原版拓展-存储了激光技术的硬盘/1"],
            power: 100
        },
        output: {
            items: ["原版拓展-激光技术/1"]
        },
        stages: [
            {
                title: "尘封的科拉人数据晶片正在被唤醒……@minor 激光在暗室中跳动，一份来自被遗忘纪元的能量密码正在重组",
                bartitle: "读取...破译....导出ing",
                input: ["存储了激光技术的硬盘"],
                output: ["激光技术"]
            }
        ],
        craftTime: 18000
    }
]);

exports.计算机1 = 计算机1;