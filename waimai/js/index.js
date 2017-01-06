
var Corresponding = {

	'address':addressObj,
	'rlist':rlistObj,
	'detail':detailObj,
	'citylist':citylistObj
}

var preModule = null;
var nowModule = null;
var cacheMap = {}; //对应关系

var firsthash = location.hash.slice(1) || 'address';

change(firsthash);

window.onhashchange = function (){

	var hash = location.hash.slice(1);

	change(hash);
}

function change(hash){

	var khash = hash;

	var module = Corresponding[hash] || Corresponding['address'];

	// 当城市页通过url向传递搜索页值时，判断一下是不是跳向搜索页
	if(hash.indexOf('address') != -1){

		module = Corresponding['address'];

		khash = 'address';

		module.changeCity(hash);

	}

	if(hash.indexOf('rlist') != -1){

		module = Corresponding['rlist'];

		khash = 'rlist';

	}

	preModule = nowModule;

	nowModule = module;

	if(preModule){

		preModule.leave();
	}

	nowModule.enter();

	// 因为 nowModule.init 事件为绑定事件，只要hash值改变都会出发 nowModule.init ，就会积累多次 init，当点击搜索的时候，就会出发多次，发生多次ajax请求。
	if(!cacheMap[khash]){

		nowModule.init();

		cacheMap[khash] = true;

	}

	
	
}