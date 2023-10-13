var site = {
	'int': {}
};

site.init = function(){
	alert(true)
	return 0;
}

site.int.load = setInterval(function(){
	if(document.readyState == 'complete'){
		clearInterval(site.int.load);
		site.int.load = null;
		site.init();
	}
}, 250);