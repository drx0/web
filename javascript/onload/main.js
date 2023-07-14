site.int.load = setInterval(function(){
	if(document.readyState == "complete"){
		clearInterval(site.int.load);
		var arr1 = Object.keys(site),
			fucn1;
		for(var i1=0;i1<arr1.length;i1++){
			func1 = site[arr1[i1]];
			if(typeof func1.init == "function"){
				func1.init();
			}
		}
		arr1, fucn1 = null;
	}
}, 250);