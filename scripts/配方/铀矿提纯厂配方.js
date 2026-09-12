const library = require("library");
const myitems = require("特定/物品");
const myliquids = require("特定/物品");

const 铀矿提纯厂 = library.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "铀矿提纯厂", [
    {
        input: {
            items: ["原版拓展-铀原矿/4"],
            power: 6
        },
        output: {
            items: ["原版拓展-铀矿III/2"]
        },
        craftTime: 120,
        stages: [
            {
                title: "合成浓度最低的加工产物@minor利用少量的铀原矿进行提纯 ",
                bartitle: "提纯中",
                input: ["铀原矿"],
                output: ["铀矿III"]
            }
        ],      
    },
    {
        input: {
            items: ["原版拓展-铀原矿/8"],
            power: 6
        },
        output: {
            items: ["原版拓展-铀矿II/2"]
        },
        craftTime: 120,
stages: [
            {
                title: "合成浓度适中的加工产物@minor利用中量的铀原矿进行提纯 ",
                bartitle: "提纯中",
                input: ["铀原矿"],
                output: ["铀矿II"]
            }
        ],      
    },
    {
        input: {
            items: ["原版拓展-铀原矿/15"],
            power: 6
        },
        output: {
            items: ["原版拓展-铀矿I/2"]
        },
        craftTime: 120,
        stages: [
            {
                title: "合成浓度最高的加工产物@minor利用大量的铀原矿进行提纯 ",
                bartitle: "提纯中",
                input: ["铀原矿"],
                output: ["铀矿I"]
            }
        ],      
    }
]);