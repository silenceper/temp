//var selfurl = window.location.host+"/index.php/Backend/ShippingArea/ajaxCate";
function change_background()
{
    $("tbody tr").hover(
    function()
    {
        $(this).css({background:"#EAF8DB"});
    },
    function()
    {
        $(this).css({background:"#fff"});
    });
}
$(function()
{
    change_background();
    var selfurl = "http://"+window.location.host+"/index.php/Backend/ShippingArea/ajaxCate";
    //给图标的加减号添加展开收缩行为
    $('img[ectype="flex"]').click(function(){
        var status = $(this).attr("status");
        var id = $(this).attr("fieldid");
        //状态是加号的事件
        if(status == 'open')
        {
            var src = $(this).attr('src');
            var pr = $(this).parent('td').parent('tr');
            //如果已经请求过的数据再次请求时只显示改变状态，不再去请求
            /*if($("."+id).length > 0)
            {
                $("."+id).show();
                $(this).attr('src',src.replace("tv-expandable","tv-collapsable"));
                $(this).attr('status','close');
                return;
            }*/
            $.get(selfurl, {id: id}, function(data){
                if(data)
                {
                    var str = "";
                    var res = eval('('+data+')');
                    for(var i = 0; i < res.length; i++)
                    {
                        var src = "";
                        var is_shipping = "";
                        //给每一个异步取出的数据添加伸缩图标后者无状态图标
                        if(res[i].switchs)
                        {
                           src =  "<img src='/Public/backend/style/img/tv-expandable.gif' ectype='flex' status='open' fieldid="+res[i].region_id+
                                  " onclick='secajax($(this))'>";
                        }
                        else
                        {
                           src =  "<img src='/Public/backend/style/img/tv-item.gif' fieldid='"+res[i].region_id+"'>";
                        }
                        //给每一个取出的数据添加是否显示标志
                        if(res[i].is_shipping == '1')
                        {
                            is_shipping = "<img src='/Public/backend/style/img/positive_enabled.gif' ectype='inline_edit' fieldname='is_shipping' fieldid='"+res[i].region_id+"' fieldvalue='1'/>";
                        }
                        else
                        {
                            is_shipping = "<img src='/Public/backend/style/img/positive_disabled.gif' ectype='inline_edit' fieldname='is_shipping' fieldid='"+res[i].region_id+"' fieldvalue='0'/>";
                        }
                        //构造每一个tr组成的字符串，标语添加
                        str+="<tr class='row"+id+"'>"+
                        "<td class='node' width='50%'><img class='preimg' src='/Public/backend/style/img/vertline.gif'/>"+src+"<span class='node_name editable' ectype='inline_edit' fieldname='cate_name' fieldid='"+res[i].region_id+"' required='1'>"+res[i].region_name+"</span></td>"+
			            "<td class='align_center'>"+is_shipping+"</td>"+
			            "<td class='handler'><span><a href='/index.php/Backend/ShippingArea/edit/id/"+res[i].region_id+"'>编辑</a>  | <a href='javascript:if(confirm(\"您确认要删除吗？这将删除该区域以及下属区域\"))window.location=\"/index.php/Backend/ShippingArea/delete/id/"+res[i].region_id+"\";'>删除</a> | <a href='/index.php/Backend/ShippingArea/add/pid/"+res[i].region_id+"'>添加子分类</a></span></td></tr>";
                    }
                    //将组成的字符串添加到点击对象后面
                    pr.after(str);
                    change_background();
                    //解除行间编辑的绑定事件
                    $('span[ectype="inline_edit"]').unbind('click');
                    //重现初始化页面
                    //$.getScript(SITE_URL+"/includes/libraries/javascript/inline_edit.js");
                }
            });
            $(this).attr('src',src.replace("tv-expandable","tv-collapsable"));
            $(this).attr('status','close');
        }
        //状态是减号的事件
        if(status == "close")
        {
            var src = $(this).attr('src');
            $('.row'+id).hide();
            $(this).attr('src',src.replace("tv-collapsable","tv-expandable"));
            $(this).attr('status','open');
        }
    });
});
//异步请求回来的数据的再次添加异步伸缩行为
function secajax(ob)
{
	var selfurl = "http://"+window.location.host+"/index.php/Backend/ShippingArea/ajaxCate";
    var status = $(ob).attr("status");
    var id = $(ob).attr("fieldid");
    var src = $(ob).attr('src');
        if(status == 'open')
        {
            var src = $(ob).attr('src');
            var pr  = $(ob).parent('td').parent('tr');
            var pid = pr.attr('class');
            var sr  = pr.clone();
            var td2 = sr.find("td:eq(1)");
            td2.prepend("<img class='preimg' src='/Public/backend/style/img/vertline.gif'/>")
                            .children('span')
                            .remove().end()
                            .find("img[ectype=flex]").remove();
            var td2html = td2.html();

            $.get(selfurl, {id: id}, function(data){
                if(data)
                {
                    var str = '';
                    var res = eval('('+data+')');
                    for(var i = 0; i < res.length; i++)
                    {
                        var src = "";
                        var is_shipping = "";
                        //给每一个异步取出的数据添加伸缩图标后者无状态图标
                        if(res[i].switchs)
                        {
                           src =  "<img src='/Public/backend/style/img/tv-expandable.gif' ectype='flex' status='open' fieldid="+res[i].region_id+
                                  " onclick='secajax($(this))'>";
                        }
                        else
                        {
                           src =  "<img src='/Public/backend/style/img/tv-item.gif' fieldid='"+res[i].region_id+"'>";
                        }
                        //给每一个取出的数据添加是否显示标志
                        if(res[i].is_shipping == '1')
                        {
                            is_shipping = "<img src='/Public/backend/style/img/positive_enabled.gif' ectype='inline_edit' fieldname='is_shipping' fieldid='"+res[i].region_id+"' fieldvalue='1'/>";
                        }
                        else
                        {
                            is_shipping = "<img src='/Public/backend/style/img/positive_disabled.gif' ectype='inline_edit' fieldname='is_shipping' fieldid='"+res[i].region_id+"' fieldvalue='0'/>";
                        }
                        //构造每一个tr组成的字符串，标语添加
                        str+="<tr class='row"+id+"'>"+
                        "<td class='node' width='50%'><img class='preimg' src='/Public/backend/style/img/vertline.gif'/><img class='preimg' src='/Public/backend/style/img/vertline.gif'/>"+src+"<span class='node_name editable' ectype='inline_edit' fieldname='cate_name' fieldid='"+res[i].region_id+"' required='1'>"+res[i].region_name+"</span></td>"+
			            "<td class='align_center'>"+is_shipping+"</td>"+
			            "<td class='handler'><span><a href='/index.php/Backend/ShippingArea/edit/id/"+res[i].region_id+"'>编辑</a>  | <a href='javascript:if(confirm(\"您确认要删除吗？这将删除该区域以及下属所有区域\"))window.location=\"/index.php/Backend/ShippingArea/delete/id/"+res[i].region_id+"\";'>删除</a> | <a href='/index.php/Backend/ShippingArea/add/pid/"+res[i].region_id+"'>添加子分类</a></span></td></tr>";
                    }
                    pr.after(str);
                    change_background();
                    $('span[ectype="inline_edit"]').unbind('click');
                    //$.getScript(SITE_URL+"/includes/libraries/javascript/inline_edit.js");
                }
            });
            $(ob).attr('src',src.replace("tv-expandable","tv-collapsable"));
            $(ob).attr('status','close');
        }
        if(status == "close")
        {
            $('.row' + id).hide();
            $(ob).attr('src',src.replace("tv-collapsable","tv-expandable"));
            $(ob).attr('status','open');
        }
}