const {一阶核心} = require('blocks/一阶核心');
const lib = require("base/lib");
const {护卫} = require('planets/卫星');
护卫.techTree = TechTree.nodeRoot( "护卫", 一阶核心, true, run(() => {}));