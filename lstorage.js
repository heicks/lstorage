if(typeof (Storage) == "undefined"){
    alert("ERROR:\n not support Storage feature");
}




// ls localStorage
const ls = {
    get : function( key ){
        var _key = localStorage.getItem(key);
        if(_key){
            try{
                var value_json = JSON.parse(_key);
                if(typeof value_json === 'object'){
                    return value_json;
                }
                else if(typeof value_json === 'number'){
                    return value_json;
                }
            }
            catch(e){
                return _key;
            }
        }
        else {
            return false;
        }
    }
    , set : function( key, value ){
        if(typeof value == "object"){
            var a = JSON.stringify(value);
            localStorage.setItem(key, a);
        }
        else {
            localStorage.setItem(key, value);
        }
    }
    , push : function( key, value ){
        var _key = JSON.parse(localStorage.getItem(key));
        if(_key != null){
            try{
                if(typeof value == "object"){
                    _key.push(value);
                    localStorage.setItem(key, JSON.stringify(_key));
                }
                else {
                    return false;
                }
            }
            catch(e){
            }
        }
        else {
            return false;
        }
    }
    , del : function( key, delIndex ){
        var _key = JSON.parse(localStorage.getItem(key));
        if(_key != null){
            try{
                if(delIndex != undefined || delIndex != null){
                    let nkey = [];
                    for(let i = 0; i < _key.length; i++){
                        if(i != delIndex){
                            nkey.push(_key[i]);
                        }
                        else if(i = delIndex){
                            continue;
                        }
                    }
                    localStorage.setItem(key, JSON.stringify(nkey));
                }
                else {
                    return false;
                }
            }
            catch(e){
            }
        }

        else {
            return false;
        }
    }
    , up : function( key, index, value ){
        var _key = localStorage.getItem(key);
        if(_key){
            try{
                if(typeof value == "object"){

                    var a = JSON.stringify(value);
                    localStorage.setItem(key, a);
                }
                else {
                    localStorage.setItem(key, value);
                }
            }
            catch(e){
                return _key;
            }
        }
        else {
            return false;
        }
    }
    , remove : function( moreKey ){
        for(var i = 0; i < arguments.length; i++){
            localStorage.removeItem(arguments[i]);
        }
    }
    , cls : function( isTrue ){
        if(isTrue === true){
            localStorage.clear();
        }
    }
    , whoami : function(){
        return "ls <==> localStorage";
    }
    , list : function(){
        return localStorage;
    }

};
// ss sessionStorage
// bug: 同一个域名下的不同页面(open方式打开的新窗口以及Ctrl+C-V创建的新窗口)
//      无法共享数据.
// FixBug: 使用ls创建 flags 判断以及更新, 关键词: addEventListen
const ss = {
    //获取sS, 无 则返回false
    get : function( key ){
        var _key = sessionStorage.getItem(key);
        if(_key){
            try{
                var value_json = JSON.parse(_key);
                if(typeof value_json === 'object'){
                    return value_json;
                }
                else if(typeof value_json === 'number'){
                    return value_json;
                }
            }
            catch(e){
                return _key;
            }
        }
        else {
            return false;
        }
    },
    set : function( key, value ){
        if(typeof value == "object"){
            var a = JSON.stringify(value);
            sessionStorage.setItem(key, a);
        }
        else {
            sessionStorage.setItem(key, value);
        }
    }
    , push : function( key, value ){
        var _key = JSON.parse(sessionStorage.getItem(key));
        if(_key != null){
            try{
                if(typeof value == "object"){
                    _key.push(value);
                    sessionStorage.setItem(key, JSON.stringify(_key));
                }
                else {
                    return false;
                }
            }
            catch(e){
            }
        }
        else {
            return false;
        }
    }
    , del : function( key, delIndex ){
        var _key = JSON.parse(sessionStorage.getItem(key));
        if(_key != null){
            try{
                if(delIndex != undefined || delIndex != null){
                    let nkey = [];
                    for(let i = 0; i < _key.length; i++){
                        if(i != delIndex){
                            nkey.push(_key[i]);
                        }
                        else if(i = delIndex){
                            continue;
                        }
                    }
                    sessionStorage.setItem(key, JSON.stringify(nkey));
                }
                else {
                    return false;
                }
            }
            catch(e){
            }
        }
        else {
            return false;
        }
    }
    , up : function( item, key, newValue ){
        var _item = sessionStorage.getItem(item);
        _item[key] = newValue;
        sessionStorage.setItem(item, _item);
    },
    remove : function( moreKey ){
        for(var i = 0; i < arguments.length; i++){
            sessionStorage.removeItem(arguments[i]);
        }
    },
    cls : function( isTrue ){
        if(isTrue === true){
            sessionStorage.clear();
        }
    },
    whoami : function(){
        return "ss <==> sessionStorage";
    },
    list : function(){
        return sessionStorage;
    }

};


// cs cookieStorage
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//
const cs = {
    //获取cS, 无 则返回false
    get : function getCookie( name ){
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }
        else {
            return false;
        }
    },
    set : function( name, value, timeOfSHD ){

        function getsec( time ){
            var str1 = time.substring(1, time.length) * 1;
            var str2 = time.substring(0, 1);
            if(str2 == "s"){
                return str1 * 1000;
            }
            else if(str2 == "h"){
                return str1 * 60 * 60 * 1000;
            }
            else if(str2 == "d"){
                return str1 * 24 * 60 * 60 * 1000;
            }
            else {
                return str1;
            }
        }

        var strsec = getsec(timeOfSHD);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

    },
    setHelp : function(){
        return `cs.set(key,value,time)\n@name: String, set name \n@value: String, set value of name \n@time: String, set time-over time: \n    @time: S : second\n    @time: H : Hour\n    @time: D : Day\n    @time: other : ms\n`;
    },
    remove : function( moreKey ){
        for(var i = 0; i < arguments.length; i++){
            sessionStorage.removeItem(arguments[i]);
        }
    },
    cls : function( isTrue ){
        if(isTrue === true){
            sessionStorage.clear();
        }
    },
    whoami : function(){
        return "cs <==> cookieStorage";
    },
    list : function(){
        return document.cookie;
    },
    lista : function(){
        // list array type
        return document.cookie.split(";")
    }

};


// ms: mem storage
// 变量存储赋值等
const ms = {
    //返回修改后的json的数据
    setJSON : function( json, key, value ){
        return json[key] = value;
    }
};

// 新增原型, 用于判断 object {} 是否为空
function checkObjEmpty( obj ){
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
};

// console.log(`lStorage.js load over`);