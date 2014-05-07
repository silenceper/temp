/*ajax 请求 表单*/
function ajax_form(id, title, url, width){
    if (!width)
    {
        width = 400;
    }
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('ajax', url);
    d.setWidth(width);
    d.show('center');

    return d;
}
$(document).ready(function(){
	//弹出层
	$('*[ectype="dialog"]').click(function(){
	    var id = $(this).attr('dialog_id');
	    var title = $(this).attr('dialog_title') ? $(this).attr('dialog_title') : '';
	    var url = $(this).attr('uri');
	    var width = $(this).attr('dialog_width');
	    //不使用opacity
	    ScreenLocker.style.opacity=0.2;
	    ajax_form(id, title, url, width);
	    return false;
	});	

});

