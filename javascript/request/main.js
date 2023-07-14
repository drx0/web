import { getResponse } from './helpers'

export async function getProducts() {
	let products = {}

	try {
		products = await getResponse('/api/products')
	} catch(e) {
		console.error(e)
	}
	return products
}
let site = {
	"int": {}
}


// Serialize
site.serialize = function(obj){
	let str = [], p;
	for(p in obj){
		if(obj.hasOwnProperty(p)){
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
	}
	return str.join('&');
}


// Request
site.Request = {
	'run': false,
	'xhr': false,
	'data': [],
	'exec': function(){
		if(site.Request.run || !site.Request.data[0]){
			return 0;
		}
		site.Request.run = true;

		site.Request.xhr = new XMLHttpRequest();
		site.Request.xhr.open(site.Request.data[0].method, site.Request.data[0].url, true);
		if(site.Request.data[0].method == 'POST'){
			site.Request.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		site.Request.xhr.onreadystatechange = function(){
			if(site.Request.xhr.readyState == 4){
				if(site.Request.xhr.status == 200){
					site.Request.data[0].callback(site.Request.xhr.responseText);
				}else{
					console.log('Error request!');
					console.log(site.Request.xhr.responseText);
				}
				site.Request.data.splice(0, 1);
				site.Request.run = false;
				if(site.Request.data[0]){
					site.Request.exec();
				}
				return 0;
			}			
		}
		if(site.Request.data[0].method == 'POST'){
			site.Request.xhr.send(site.serialize(site.Request.data[0].params));
		}else if(site.Request.data[0].method == 'GET'){
			site.Request.xhr.send();
		}
		
		return 0;
	}
}




site.shop = {
	'init': function(){
		if(site.shop.el.pr){
			site.shop.products.get();
		}else if(site.shop.el.c){
			site.shop.categories.get();
		}
		return 0;
	},
	'el': {
		'pr': document.querySelector('main#products_out'),
		'c': document.querySelector('main#categories_out'),
	},
	'categories': {
		'get': function(category_id = false){

		}
	},
	'products': {
		'tmpl': '<li>\
			<div><img alt="{{title}}" src="{{image}}" /></div>\
			<h3>{{title}}</h3>\
			<div class="flex">\
				<p>Старая цена: <span>{{old_price}}</span></p>\
				<p>Новая цена: <span>{{this_price}}</span></p>\
			</div>\
		</li>',

		'get': function(category_id = false){
			// добавить запрос в очередь
			site.Request.data.push({
				'url': '/api/get/shop/products',
				'method': 'POST',
				'params': {
					'category_id': category_id
				},
				'callback': function(result){
					// парсинг json
					try{
						site.shop.products.data = JSON.parse(result);
						result = null;
					}catch(err){
						console.log(err);
						result = null;
						return 0;
					}
					site.shop.products.out();
					return 0;
				}
			})
			// выполнить (обязательно)
			site.Request.exec();
			return 0;
		},

		'out': function(){
			let pr1, key1, val1, tmpl1, re;

			for(i=0;i<site.shop.products.data.length;i++){

				pr1 = site.shop.products.data[i];
				tmpl1 = site.shop.products.tmpl;

				for([key1, val1] of Object.entries(pr1)){
					re = new RegExp("\{\{"+key1+"\}\}", "ig");
					tmpl1 = tmpl1.replace(re, val1);
				}
				key1 = null; val1 = null; pr1 = null; re = null;
				
				site.shop.el.pr.insertAdjacentHTML('beforeend', tmpl1);
				tmpl1 = null;
			}
			
			return 0;
		}
		
	}
};



// onload
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