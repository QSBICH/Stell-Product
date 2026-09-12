const library = require("library");
const myitems = require("特定/物品");
const myliquids = require("特定/物品");

const 硬盘拷贝中心 = library.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "硬盘拷贝中心", [
    {
        input: {
            items: ["原版拓展-硬盘/1"],
            power: 6
        },
        output: {
            items: ["原版拓展-存储了激光技术的硬盘/1"]
        },
        stages: [
            {
                title: "尘封的科拉人数据晶片正在被复制……@minor 激光在暗室中跳动，一份来自被遗忘纪元的能量密码正在拷贝,留下后代...",
                bartitle: "读取...复制中",
                input: ["硬盘"],
                output: ["存储了激光技术的硬盘"]
            }
        ],
        craftTime: 1800
    }
]);

exports.硬盘拷贝中心 = 硬盘拷贝中心;