function piSingleParentFindObj(theObj, theDoc) {
    var p, i, foundObj;
    if (!theDoc) theDoc = document;
    if ((p = theObj.indexOf("?")) > 0 && parent.frames.length) {
        theDoc = parent.frames[theObj.substring(p + 1)].document;
        theObj = theObj.substring(0, p);
    }
    if (!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
    for (i = 0; !foundObj && i < theDoc.forms.length; i++) foundObj = theDoc.forms[i][theObj];
    for (i = 0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) foundObj = piSingleParentFindObj(theObj, theDoc.layers[i].document);
    if (!foundObj && document.getElementById) foundObj = document.getElementById(theObj);
    return foundObj;
}

function loadTableFromCookie(){
    var linesCount = getCookie("piSingleParentLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        var locus = getCookie("piSingleParentLocus_"+i);
        var AF1 = getCookie("piSingleParentAF1_"+i);
        var AF2 = getCookie("piSingleParentAF2_"+i);
        var C1 = getCookie("piSingleParentC1_"+i);
        var C2 = getCookie("piSingleParentC2_"+i);
        if(AF1 == null && AF2 == null && M1 == null && M2 == null && C1 == null && C2 == null){

        }else{
             piSingleParentLoadRow(i,locus,AF1,AF2,C1,C2);
        }
    };
}

function generateSelectCode(rowID){
    var code ="<select id='locus_" + rowID + "' onclick='saveDataIntoCookie(" + rowID + ", 1)' class='span2'>"+
    "<option value=\"D3S1358\">D3S1358</option>"+
    "<option value=\"saab\">Saab</option>"+
    "<option value=\"fiat\">Fiat</option>"+
    "<option value=\"audi\">Audi</option>"+
    "</select>";
    return(code);
}

function piSingleParentLoadRow(rowID,locus,AF1,AF2,C1,C2) {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piSingleParentTrLastIndex = piSingleParentFindObj("piSingleParentTrLastIndex", document);
    var piSingleParentCurrentCount = piSingleParentFindObj("piSingleParentCurrentCount", document);
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var newTR = piSingleParentTable.insertRow(piSingleParentTable.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML =  generateSelectCode(rowID);
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-small' id='AF1_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)'  value='" + AF1 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-small' id='AF2_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + AF2 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(3);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-small' id='C1_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + C1 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(4);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-small' id='C2_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + C2 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(5);
    newPi.innerHTML = "<span class='input-small uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(6);
    newDeleteTD.innerHTML = "<button type='button' class='btn  btn-small  btn-danger' onclick=\"piSingleParentDeleteRow('row" + rowID + "','" + rowID + "')\"><i class='icon-remove icon-white'></i> 删除</button>";
    var selectLocas = piSingleParentFindObj("locus_" + rowID);
    selectLocas.selectedIndex = locus;
    piSingleParentTrLastIndex.value = (rowID + 1).toString();
    piSingleParentCurrentCount.value = (rowID).toString();
    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);
    reloadValidate();
}

function piSingleParentAddRow() {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piSingleParentTrLastIndex = piSingleParentFindObj("piSingleParentTrLastIndex", document);
    var piSingleParentCurrentCount = piSingleParentFindObj("piSingleParentCurrentCount", document);
    var rowID = parseInt(piSingleParentTrLastIndex.value);
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var newTR = piSingleParentTable.insertRow(piSingleParentTable.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML =  generateSelectCode(rowID);
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)'  id='AF1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='AF2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(3);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='C1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(4);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='C2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(5);
    newPi.innerHTML = "<span class='input-small uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(6);
    newDeleteTD.innerHTML = "<button type='button' class='btn  btn-small  btn-danger' onclick=\"piSingleParentDeleteRow('row" + rowID + "','" + rowID + "')\"><i class='icon-remove icon-white'></i> 删除</button>";
    piSingleParentTrLastIndex.value = (rowID + 1).toString();
    piSingleParentCurrentCount.value = (rowID).toString();
    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);
    reloadValidate();
    addCookie("piSingleParentLinesCount",Number(piSingleParentCurrentCount.value),1);
}

function reloadValidate(){
    $('form').validate({
        onBlur : true,
        eachValidField : function() {
            $(this).closest('div').removeClass('error').addClass('success');
        },
        eachInvalidField : function() {
            $(this).closest('div').removeClass('success').addClass('error');
        }
    });
}

function calculatePi(rowID){
    var locus = piSingleParentFindObj("locus_" + (rowID),document).value;
    var AF1 = piSingleParentFindObj("AF1_" + (rowID),document).value;
    var AF2 = piSingleParentFindObj("AF2_" + (rowID),document).value;
    var C1 = piSingleParentFindObj("C1_" + (rowID),document).value;
    var C2 = piSingleParentFindObj("C2_" + (rowID),document).value;
    var AF1value = getAllete("http://localhost:8080/relations/xml/" + locus + ".xml","a" + AF1);
    var AF2value = getAllete("http://localhost:8080/relations/xml/" + locus + ".xml","a" + AF2);
    var C1value = getAllete("http://localhost:8080/relations/xml/" + locus + ".xml","a" + C1);
    var C2value = getAllete("http://localhost:8080/relations/xml/" + locus + ".xml","a" + C2);
    var pi = 0;
    if(AF1==AF2&&C1==C2&&AF1==C1){
        pi = 1/Number(C1);
    }else if(C1!=C2&&AF1==AF2&&(AF1==C1||AF1==C2)){
        pi = 1/(Number(AF1)*2);
    }else if(AF1!=AF2&&C1==C2&&(C1==AF1||C1==AF2)){
        pi = 1/(Number(C1)*2);
    }else if(C1!=C2&&AF1!=AF2&&(C1==AF1||C1==AF2)&&(C2==AF1||C2==AF2)){
        pi = (Number(C1)+Number(C2))/(4*Number(C1)*Number(C2));
    }else if(C1!=C2&&AF1!=AF2&&((C1==AF1&&C1!=AF2)||(C2==AF1&&C2!=AF2))){
        if(C1==AF1&&C1!=AF2){
            pi = 1/(4*Number(C1));
        }else if(C2==AF1&&C2!=AF2){
            pi = 1/(4*Number(C2));
        }
    }
    var PI = piSingleParentFindObj("PI_" + rowID,document);
    PI.innerHTML = pi.toFixed(3);
    addCookie("piSingleParentPI_"+rowID , pi.toFixed(3) , 1);
    return(pi);
}

function calculate(){
    var cpi = 1;
    var rcp = 0;
    var linesCount = getCookie("piSingleParentLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        var locus = getCookie("piSingleParentLocus_"+i);
        var AF1 = getCookie("piSingleParentAF1_"+i);
        var AF2 = getCookie("piSingleParentAF2_"+i);
        var C1 = getCookie("piSingleParentC1_"+i);
        var C2 = getCookie("piSingleParentC2_"+i);
        if(AF1 == null && AF2 == null && C1 == null && C2 == null){

        }else{
             cpi = cpi * Number(calculatePi(i));
        }
    };
    rcp = cpi/(1+cpi);
    var CPI = document.getElementById("CPI");
    CPI.innerHTML = cpi;
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = rcp;
    addCookie("piSingleParentCPI",cpi,1);
    addCookie("piSingleParentRCP",rcp,1);
    var piSingleParentRowCount = document.getElementById("piSingleParentRowCount");
    addCookie("piSingleParentRowCount",piSingleParentRowCount.innerHTML,1);
    alert("计算完毕");
}

function saveDataIntoCookie(rowID,hours){
    var locus = piSingleParentFindObj("locus_" + rowID,document).selectedIndex;
    var locusValue = piSingleParentFindObj("locus_" + rowID,document).value;
    var AF1 = piSingleParentFindObj("AF1_" + rowID,document).value;
    var AF2 = piSingleParentFindObj("AF2_" + rowID,document).value;
    var C1 = piSingleParentFindObj("C1_" + rowID,document).value;
    var C2 = piSingleParentFindObj("C2_" + rowID,document).value;
    addCookie("piSingleParentLocus_" + rowID,locus,hours);
    addCookie("piSingleParentlocusValue_" + rowID,locusValue,hours);
    addCookie("piSingleParentAF1_" + rowID,AF1,hours);
    addCookie("piSingleParentAF2_" + rowID,AF2,hours);
    addCookie("piSingleParentC1_" + rowID,C1,hours);
    addCookie("piSingleParentC2_" + rowID,C2,hours);
}

function piSingleParentDeleteRow(rowID,id) {
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var row = piSingleParentFindObj(rowID, document);
    var rowIndex = row.rowIndex;
    piSingleParentTable.deleteRow(rowIndex);
    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);
    deleteRowCookie(Number(id));
}

function deleteRowCookie(rowID){
    delCookie("piSingleParentLocus_"+rowID);
    delCookie("piSingleParentAF1_"+rowID);
    delCookie("piSingleParentAF2_"+rowID);
    delCookie("piSingleParentC1_"+rowID);
    delCookie("piSingleParentC2_"+rowID);
    delCookie("piSingleParentCPI");
    delCookie("piSingleParentRCP");
    delCookie("piSingleParentRowCount");
}

function piSingleParentClearAllRows() {
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var piSingleParentRowCount = piSingleParentTable.rows.length;
    for (i = piSingleParentRowCount - 1; i > 0; i--) {
        piSingleParentTable.deleteRow(i);
    }
    var piSingleParentTrLastIndex = piSingleParentFindObj("piSingleParentTrLastIndex", document);
    piSingleParentTrLastIndex.value = "1";
    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);
    clearAllCookies();
    var CPI = document.getElementById("CPI");
    CPI.innerHTML = 0;
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = 0
}

function clearAllCookies(){
    var linesCount = getCookie("piSingleParentLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        deleteRowCookie(i);
    };
    delCookie("piSingleParentLinesCount");
}

function getAllete(xmlfile,allete){
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET",xmlfile,false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    return(xmlDoc.getElementsByTagName(allete)[0].childNodes[0].nodeValue);
} 

function cookie(name){    
   var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对    
   var cookie=new Object();    
   for (var i=0;i<cookieArray.length;i++){    
      var arr=cookieArray[i].split("=");       //将名和值分开    
      if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值    
   } 
   return ""; 
} 

function getCookie(objName){//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
   } 
}

function addCookie(objName,objValue,objHours){      //添加cookie
    var str = objName + "=" + escape(objValue);
    if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours*3600*1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
   }
   document.cookie = str;
}

function SetCookie(name,value){
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}

function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
