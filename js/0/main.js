var site = {
	'int': {}
};

site.modal = {
	'init': function(){
		// open
		let elems1 = document.querySelectorAll('.modal_open'), i2;
		for(i2=0;i2<elems1.length;i2++){
			elems1[i2].onclick = function(){
				site.modal.open(this.getAttribute('data-name'));
				return 0;
			}
		}
		elems1 = null; i2 = null;
		// close
		let elems3 = document.querySelectorAll('.modal_close'), i4;
		for(i4=0;i4<elems3.length;i4++){
			elems3[i4].onclick = function(){
				site.modal.close();
				return 0;
			}
		}
		elems3 = null; i4 = null;
		return 0;
	},
	'close': function(){
		let elems2 = document.querySelectorAll('.modal'), i3;
		for(i3=0;i3<elems2.length;i3++){
			elems2[i3].classList.remove('active');
		}
		elems2 = null; i3 = null;
		return 0;
	},
	'open': function(name1){
		site.modal.close();
		let el1 = document.querySelector('.modal[data-name="'+name1+'"]');
		if(!el1){
			return 0;
		}
		el1.classList.add('active');
		el1 = null; name1 = null;
		return 0;
	}
};


// Serialize
site.serialize = function(obj){
	var str = [];
	for(var p in obj){
		if(obj.hasOwnProperty(p)){
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	}
	return str.join("&");
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
		site.Request.xhr.open("POST", '/post.php', true);
		site.Request.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

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
		site.Request.xhr.send(site.serialize(site.Request.data[0].params));
		return 0;
	}
};


// FForm
site.FForm = {
	'names': {
		'login': 'Логин',
		'password': 'Пароль',
		'qu_number': 'Уникальный номер покупателя',
		'email': 'E-mail',
	},
	'init': function(){
		let elems4 = document.querySelectorAll('.FForm'), i5;
		for(i5=0;i5<elems4.length;i5++){
			elems4[i5].onsubmit = function(event){
				event.preventDefault();
				let name_form = this.getAttribute('data-form'),
					func_form = site['form_' + name_form],
					btn_ = this.querySelector('[type="submit"]');
				if(typeof func_form != 'function'){
					return 0;
				}
				btn_.disabled = true;
				let fields = this.querySelectorAll('input, textarea, select'), i6, tg, tp, object = {}, add1, nm, dl;
				for(i6=0;i6<fields.length;i6++){
					add1 = false;
					tg = fields[i6].tagName;
					nm = fields[i6].getAttribute('name');
					dl = parseInt(fields[i6].getAttribute('data-length'));
					if(isNaN(dl)){
						object = null;
						return 0;
					}
					if(tg == 'input'){
						tp = fields[i6].getAttribute('type');
						if(tp == 'file'){
							object[nm] = fields[i6].files;
							add1 = true;
						}
					}
					if(!add1){
						object[nm] = fields[i6].value;
						if(object[nm].length > dl){
							object = null;
							alert('Превышен максимальный размер поля: ' + site.FForm.names[nm]);
							return 0;
						}
					}
				}
				i6 = null; tg = null; tp = null; add1 = null; nm = null; dl = null;
				func_form(object, btn_);
				object = null; btn_ = null;
				return 0;
			}
		}
		return 0;
	}
};



// FORM [login]
site.form_login = function(object, btn_){
	object['method'] = 'frontend/login';
	site.Request.data.push({
		'params': object,
		'callback': function(result){
			if(result == 'success'){
				window.location.href = '/lk/main';
			}else{
				alert('Ошибка авторизации!');
				setTimeout(function(){
					btn_.disabled = false;
				}, 3000);
				return 0;
			}
			return 0;
		}
	});
	site.Request.exec();

	return 0;
}


// FORM [request_register]
site.form_request_register = function(object, btn_){
	object['method'] = 'frontend/request_register';
	site.Request.data.push({
		'params': object,
		'callback': function(result){

			return 0;
		}
	});
	site.Request.exec();

	return 0;
}




// onload
site.int.load = setInterval(function(){
	if(document.readyState == 'complete'){
		clearInterval(site.int.load);
		site.int.load = null;
		// onload all
		let obj1 = Object.keys(site), func1, i1;
		for(i1=0;i1<obj1.length;i1++){
			func1 = site[obj1[i1]].init;
			if(typeof func1 == 'function'){
				func1();
			}
		}
		obj1 = null; func1 = null; i1 = null;
	}
}, 250);