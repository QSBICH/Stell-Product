const {前线基地} = require('blocks/核心');
const lib = require("base/lib");
const {科格拉斯} = require('planets/星球');
const {沃格克尔} = require('planets/卫星3');
科格拉斯.techTree = TechTree.nodeRoot( "科格拉斯", 前线基地, true, run(() => {}));
沃格克尔.techTree = 科格拉斯.techTree
科格拉斯.techTree.addPlanet(沃格克尔);