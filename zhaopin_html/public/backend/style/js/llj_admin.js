$(function(){
	$(".dele").live("click",function(){
		return confirm('你确认删除吗，删除之后无法恢复！');
	});
});

//全选
function checkall(){
     var i;	  
     var ass=document.getElementsByName('id[]');
     
     for(i=1;i<ass.length;i++){
         if(ass[0].checked==true){
             ass[i].checked=true;
         }else{
             ass[i].checked=false;  
         }
     }
}
//手机号验证
function checkphone(phone){
	var reg=/1[3|5|8|4]+\d{9}/;
	var find=reg.test(phone);
	return find;
}