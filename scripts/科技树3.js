const {岛屿核心} = require('blocks/岛屿核心');
const lib = require("base/lib");
const {潮星} = require('planets/卫星2');
潮星.techTree = TechTree.nodeRoot( "潮星", 岛屿核心, true, run(() => {}));