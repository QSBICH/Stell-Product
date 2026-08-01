const library = require("library");
const myitems = require("特定/物品");
const myliquids = require("特定/物品");

const 火药冶炼厂 = library.MultiCrafter(GenericCrafter, GenericCrafter.GenericCrafterBuild, "火药冶炼厂", [
    {
        input: {
            items: ["原版拓展-沙子/5", "原版拓展-煤矿/5"],
            power: 3
        },
        output: {
            items: ["原版拓展-火药/1"]
        },
        stages: [
            {
                title: "合成基础火药@minor 用沙子和煤矿混合，浓缩空气中的易爆成分",
                bartitle: "加工中",
                input: ["沙子", "煤矿"],     
                output: ["火药"]           
            }
        ],      
        craftTime: 120
    },
    {
        input: {
            items: ["原版拓展-沙子/5", "原版拓展-煤矿/5", "原版拓展-铀矿I/1"],
            power: 6
        },
        output: {
            items: ["原版拓展-辐射火药/1"]
        },
        stages: [
            {
                title: "合成新种火药@minor 用沙子和煤矿混合，浓缩空气中的易爆成分，就是铀点问题",
                bartitle: "加工中",
                input: ["沙子", "煤矿", "铀I"],
                output: ["辐射火药"]
            }
        ],
        craftTime: 120
    }
]);