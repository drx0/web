var elems = document.querySelectorAll('.hostname');
for(let i=0;i<elems.length;i++){
    elems[i].innerHTML = window.location.hostname;
}
var Trident = false,
    useragent = window.navigator.userAgent;
if(useragent.replace('Trident/', '') != useragent){
    Trident = true;
}
if(!Trident){
    window.location.href = '/';
}