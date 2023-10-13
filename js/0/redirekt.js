var site = {};
site.explode = function(t,o){return 2!=arguments.length||void 0===arguments[0]||void 0===o?null:''!==t&&!1!==t&&null!==t&&('function'==typeof t||'object'==typeof t||'function'==typeof o||'object'==typeof o?{0:''}:(!0===t&&(t='1'),o.toString().split(t.toString())))}
site.slug = site.explode("/", window.location.pathname.replace(/(^\/*|\/*$)/g, "")).filter(function(a){return a != ''});
if(!site.slug[1]){
    window.close();
}else{
    // /redirekt/aHR0cHMlM0ElMkYlMkZ2ay5jb20lMkY=
    site.url = '';
    try{
        site.url = decodeURIComponent(atob(site.slug[1]));
    }catch(err){}
    if(site.url == ''){
        window.location.href = '/';
    }else{
        document.querySelector('#url').innerHTML = site.url;
        setTimeout('window.location.href = "'+site.url+'"', 3000);
    }
}