const library = require("library");
const myitems = require("特定/物品");
const myliquids = require("特定/物品");

const 多功能冶炼厂 = library.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "多功能冶炼厂", [
    {
        input: {
            items: ["原版拓展-铁矿/8"],
            power: 5
        },
        output: {
            items: ["原版拓展-钢铁/5"]
        },
        craftTime: 120
    },
    {
        input: {
            items: ["原版拓展-金刚石/8"],
            power: 5
        },
        output: {
            items: ["原版拓展-钻石/5"]
        },
        craftTime: 120
    },
    {
        input: {
            items: ["原版拓展-铁矿/8"],
            power: 5
        },
        output: {
            items: ["原版拓展-零件/5"]
        },
        craftTime: 210
    },
    {
        input: {
            power: 5
        },
        output: {
            items: ["原版拓展-机器人蓝图/5"]
        },
        craftTime: 120
    },
    {
        input: {
            items: ["原版拓展-沙子/8", "原版拓展-煤矿/8"],
            power: 5
        },
        output: {
            items: ["原版拓展-硅/5"]
        },
        craftTime: 120
    }
]);