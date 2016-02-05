if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
        
        $(document).scrollTop(0);
        $("#orderValue").focus();
        
    }, false);
}




function changeTab(value){
  $(".bsq-tab").hide();
  $(".bsq-tab[bsq-id="+value+"]").fadeIn(200);
}

function resetCal(){
  $(document).scrollTop(0);
  changeTab(1);
  
  setTimeout(function(){ $("#orderValue").focus(); },300);	  
}	

function selectAllReport(){	  
  if(bPhoneGap)
  {
    navigator.share(result_text,"","");
  }
  //window.plugins.copy(result_text);
}

var formatMoney=function(a,t,s,e){var r=a,t=isNaN(t=Math.abs(t))?2:t,s=void 0==s?".":s,e=void 0==e?",":e,i=0>r?"-":"",o=parseInt(r=Math.abs(+r||0).toFixed(t))+"",d=(d=o.length)>3?d%3:0;return i+(d?o.substr(0,d)+e:"")+o.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+e)+(t?s+Math.abs(r-o).toFixed(t).slice(2):"")};

function bsqStringToNumber(content){
  var temp = content;    
  temp = '{"a":'+temp+'}';    
  temp = JSON.parse(temp);    
  return temp.a;
}

function bsqConvertDateTime(){
  
  var timezone = jstz.determine();  
  
  var testDate = new Date();
  var getTime =  testDate.getTime();

  var newYork    = moment.tz(getTime, timezone.name());
  var losAngeles = newYork.clone().tz("America/Los_Angeles");
  
  return (losAngeles.format('MMMM Do YYYY, h:mm:ss A Z z') + " America/Los_Angeles" );  
  
}

var result_text = '';
function cal() {
  
    var orderValue = document.getElementById("orderValue").value;
    var weightValue = document.getElementById("weightValue").value;
    var shippingCost = document.getElementById("shippingCost").value;
    var taxValue = document.getElementById("tax").value;
    
    if (orderValue == '') orderValue = 0;
    if (weightValue == '') weightValue = 0;
    if (shippingCost == '') shippingCost = 0;
    
    orderValue = bsqStringToNumber(orderValue);
    weightValue = bsqStringToNumber(weightValue);
    shippingCost = bsqStringToNumber(shippingCost);
    
    var rate = document.getElementById("rate").value;
    if (rate == '') rate = 0;
    
    rate = bsqStringToNumber(rate);
    
    var total = document.getElementById("total");
    var tax = 1 + (taxValue / 100);
    var donhangsauthuevaship = (orderValue * tax) + shippingCost;

    var overload = weightValue - (orderValue / 50) * 3;    
    var overloadMoney = overload * 3;
    
    var cal = 0;
    if (overload >= 0) {
        cal = orderValue * tax + overload * 3 + shippingCost;
    }else{
        cal = orderValue * tax + shippingCost;
    }
    

    var viewText = "Giá trị đơn hàng: " + formatMoney(orderValue, 2, '.', ',')  + " USD\n";
    viewText += "Khối lượng đơn hàng: " + formatMoney(weightValue, 2, '.', ',')  + " lbs\n";    
    viewText += "\nĐơn hàng sau thuế và ship: " + formatMoney(donhangsauthuevaship, 4, '.', ',') + " USD";
    viewText += "(" + formatMoney(orderValue, 2, '.', ',')  + " USD + "+taxValue+"% tax + " + shippingCost + " USD ship nội địa USA)";    
    
    if (overload > 0) viewText += "\nĐơn hàng bị phụ thu: " + overload + " lbs ~" + overloadMoney + " USD (quy đổi ~ " + formatMoney(overloadMoney * rate, 2, '.', ',')  + " VND)";
    else viewText += "\nĐơn hàng không bị phụ thu.";    
    viewText += "\nGhi chú: Freeship 3 lbs cho mỗi 50 USD giá trị order.\n";
    viewText += "\nTổng cộng: " + formatMoney(cal, 2, '.', ',') + " USD (quy đổi ~ " + formatMoney(Math.ceil(cal * rate / 5000) * 5000, 2, '.', ',')  + " VND)";
    
    viewText += "\nNgày tạo hóa đơn: " + bsqConvertDateTime();
    
    total.innerText = viewText;
    
    result_text = viewText;
    
    $(document).scrollTop(0);
    setTimeout(function(){ document.activeElement.blur(); }, 100);
    
    changeTab(2);
    
}