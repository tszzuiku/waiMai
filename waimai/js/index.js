
var Corresponding = {

	'address':addressObj,
	'rlist':rlistObj,
	'detail':detailObj,
	'citylist':citylistObj
}

var preModule = null;
var nowModule = null;

var firsthash = location.hash.slice(1) || 'address';

change(Corresponding[firsthash]);

window.onhashchange = function (){

	var hash = location.hash.slice(1);

	change(Corresponding[hash]);

}

function change(obj){

	var module = obj;

	preModule = nowModule;

	nowModule = module;

	if(preModule){

		preModule.leave();
	}

	nowModule.enter();

	nowModule.init();
	
}