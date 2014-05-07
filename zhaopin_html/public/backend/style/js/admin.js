//菜单切换  tab切换
function menu_change(n,num,tab,content){
	for(var i=1;i<=n;i++){
		var objA=document.getElementById(tab+i);
		var objB=document.getElementById(content+i);
		
		if(num==i){
			objA.className="on";
			objB.style.display="block";
		}else{
			objA.className="";
			objB.style.display="none";
		}
		//去除
		$('.left_menu li').removeClass('current');
		var first_li=$('#left_menu'+num).find('li:first');
		first_li.addClass('current');
		var link=first_li.find('a').attr('href');
		$("#rightMain").attr('src',link);
	}
}

//全选
function sel(obj){
    var ido=document.getElementsByName("id[]");
    for(var i=0;i<ido.length;i++){
    	ido[i].checked=obj.checked;
    }
}

//打印出货单
function batch_print_send(a){
	$this=$(a);
	//获取选择的id
	var ids=[];
	$('input[name="id[]"]:checked').each(function(){
		ids.push($(this).val());
	});
	if(ids.length==0){
		alert('未选择订单');
		return false;
	}
	url=$this.attr('uri')+ids.join(',');
	ScreenLocker.style.opacity=0.2;
    ajax_form(1, '打印出货单', url, 400);
}

//打印物流单
function batch_print_shipping(a){
	$this=$(a);
	//获取选择的id
	var ids=[];
	$('input[name="id[]"]:checked').each(function(){
		ids.push($(this).val());
	});
	if(ids.length==0){
		alert('未选择订单');
		return false;
	}
	url=$this.attr('uri')+ids.join(',');
	ScreenLocker.style.opacity=0.2;
    ajax_form(1, '打印物流单', url, 400);
}

//订单发货完成
function batch_send(a){
	$this=$(a);
	//获取选择的id
	var ids=[];
	$('input[name="id[]"]:checked').each(function(){
		ids.push($(this).val());
	});
	if(ids.length==0){
		alert('未选择订单');
		return false;
	}
	window.location.href="/index.php/Backend/Order/sendComplete/id/"+ids.join(',');
}