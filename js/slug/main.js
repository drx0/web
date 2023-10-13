site.slug = {
	'data': [],
	'init': function(){
		site.slug.data = window.location.pathname.split('?')[0].replace(/^\//, '').replace(/\/$/, '').split('/').filter(function(el){
	        return el != '';
	    });
	}
};