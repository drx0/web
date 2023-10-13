// SLUG
site.slug = {
	'data': [],
	'init': function(){
		site.slug.data = window.location.pathname.split('?')[0].replace(/^\//, '').replace(/\/$/, '').split('/').filter(function(el){
	        return el != '';
	    });
	}
};


site.cookie = {
	'delete': function(name){
		document.cookie = name + "=0;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
		return 1;
	}
};


site.lk = {
	'init': function(){

		// logout
		document.querySelector('#lk_exit').onclick = function(){
			site.cookie.delete('frontend_user');
			window.location.href = '/';
			return 0;
		}

		return 0;
	}
};