$(function(){
	$(window).bind('beforeunload',function(){ 
		return '您输入的内容尚未保存，确定离开此页面吗？'; 
	}); 
});