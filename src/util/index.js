
// 换肤加class函数
import {Permission} from "./Permission";

export function toggleClass(element, className) {
	if (!element || !className) {
		return;
	}
	element.className = className;
}

//递归实现
//@leafId  查找的id，
//@nodes   原始Json数据
//@path    供递归使用
export function findPathByLeafId(leafId, nodes, path) {
	if (path === undefined) {
		path = [];
	}
	for (var i = 0; i < nodes.length; i++) {
		var tmpPath = path.concat();
		tmpPath.push(nodes[i].id);
		if (leafId == nodes[i].id) {
			return tmpPath;
		}
		if (nodes[i].children) {
			var findResult = findPathByLeafId(leafId, nodes[i].children, tmpPath);
			if (findResult) {
				return findResult;
			}
		}
	}
}

//递归遍历
//@addAttr  添加属性，
//@addAttrVal  赋值属性
//@nodes   原始Json数据
//@path    供递归使用
export function eachAttributeAdd(addAttr,addAttrVal, nodes) {
	for (var i = 0; i < nodes.length; i++) {
		nodes[i][addAttr] = nodes[i][addAttrVal]
		if (nodes[i].children) {
			eachAttributeAdd(addAttr, addAttrVal, nodes[i].children)
		}
	}
}

//递归树转数组
//@nodes   原始Json数据
//@arr   存储数组
export function treeToArray(arr,nodes,initObj) {
	for (var i = 0; i < nodes.length; i++) {
		let obj = {}
		for(let b in initObj){
			obj[b] = nodes[i][b]
		}
		arr.push(obj)
		if (nodes[i].children&&nodes[i].children.length>0) {
			treeToArray(arr,nodes[i].children,initObj)
		}
	}
}
//是否为JSON字符串
export function isJSON(str) {
	if (typeof str == 'string') {
		try {
			var obj=JSON.parse(str);
			if(typeof obj == 'object' && obj ){
				return true;
			}else{
				return false;
			}

		} catch(e) {
			return false;
		}
	}
	console.log('It is not a string!')
}

export const PermissionInitObj = {
	"resourceName":'',
	"resourceCode":'',
	"resourceType":'',
	"id":'',
	"parentId":'',
	"isLeaf":'',
}

