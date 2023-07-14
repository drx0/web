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
			site.request.data.push({
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
			site.request.exec();
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