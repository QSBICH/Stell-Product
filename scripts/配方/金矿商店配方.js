const library = require("library");
const myitems = require("特定/物品");
const myliquids = require("特定/物品");

const 金矿商店 = library.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "金矿商店", [
    {
        input: {
            items: ["原版拓展-金矿/8"],
        },
        output: {
            items: ["原版拓展-钢铁/10"]
        },
        craftTime: 180
    },
    {
        input: {
            items: ["原版拓展-金矿/20"],
            power: 5
        },
        output: {
            items: ["原版拓展-钻石/10"]
        },
        craftTime: 180
    },
    {
        input: {
            items: ["原版拓展-金矿/15"],
            power: 5
        },
        output: {
            items: ["原版拓展-零件/10"]
        },
        craftTime: 180
    },
    {
        input: {
        items: ["原版拓展-金矿/8"],
        },
        output: {
            items: ["原版拓展-机器人蓝图/10"]
        },
        craftTime: 180
    },
    {
        input: {
        items: ["原版拓展-金矿/5"],
        },
        output: {
            items: ["原版拓展-煤矿/10"]
        },
        craftTime: 180
    },
    {
        input: {
        items: ["原版拓展-金矿/80"],
        },
        output: {
            items: ["原版拓展-铀原矿/10"]
        },
        craftTime: 180
    },
    {
        input: {
            items: ["原版拓展-金矿/12"],
        },
        output: {
            items: ["原版拓展-硅/10"]
        },
        craftTime: 180
    }
]);