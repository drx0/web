site.request = {
	'run': false,
	'xhr': false,
	'data': [],
	'exec': function(){
		if(site.request.run || !site.request.data[0]){
			return 0;
		}
		site.request.run = true;

		site.request.xhr = new XMLHttprequest();
		site.request.xhr.open(site.request.data[0].method, site.request.data[0].url, true);
		if(site.request.data[0].method == 'POST'){
			site.request.xhr.setrequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		site.request.xhr.onreadystatechange = function(){
			if(site.request.xhr.readyState == 4){
				if(site.request.xhr.status == 200){
					site.request.data[0].callback(site.request.xhr.responseText);
				}else{
					console.log('Error request!');
					console.log(site.request.xhr.responseText);
				}
				site.request.data.splice(0, 1);
				site.request.run = false;
				if(site.request.data[0]){
					site.request.exec();
				}
				return 0;
			}			
		}
		if(site.request.data[0].method == 'POST'){
			site.request.xhr.send(site.serialize(site.request.data[0].params));
		}else if(site.request.data[0].method == 'GET'){
			site.request.xhr.send();
		}
		
		return 0;
	}
}