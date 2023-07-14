site.serialize = function(obj){
	let str = [], p;
	for(p in obj){
		if(obj.hasOwnProperty(p)){
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
	}
	p = null; obj = null;
	return str.join('&');
}