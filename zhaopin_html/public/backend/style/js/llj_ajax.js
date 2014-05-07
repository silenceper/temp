$(function(){
	var s_url="http://"+window.location.host+"/index.php/Backend/Navigation";
	var selfurl = "http://"+window.location.host+"/index.php/Backend/Navigation/ajax";
	
	$(".nav_find").live('click',function(){
		var i=$(this).attr('dir');
		var t=$(this);
		var state=t.attr("title");
		var c=t.parent("tr").attr("class");
		var s=c+"_1";
		if(i==1){
			
			if(state=='0'){return false};
			var have=t.attr("lang");//have=1表示已传数据
			var p_id=t.prev("td").find("input").val();
			var par=t.parent("tr");
			
			t.find("img").attr("src","/Public/backend/style/img/tv-collapsable.gif");
			if(have!=1){
				$.ajax({
			        type:"post",
			        url:selfurl,
			        data:"p_id="+p_id,
			        success:function(msg){   
			            var dank=eval('('+msg+')');
			            var x,newp='',str;
			           var k=dank[0].nav_ceng*10;
			           
			            for(x in dank){
			            	if(dank[x].nav_son!=0){
			            		str="<tr class="+s+">\n\
			    					<td  align='center'><input type='checkbox' name='id[]' value="+dank[x].nav_id+"></td>\n\
			    					<td  class='nav_find' title='1' dir='1'><span style='float:left;width:"+k+"px;height:1px;'></span><img src='/Public/backend/style/img/tv-expandable.gif'>"+dank[x].nav_title+"</td>\n\
			    					<td align='center'>"+dank[x].nav_place+"</td>\n\
			    					<td align='center'>"+dank[x].nav_url+"</td>\n\
			    					<td align='center'>"+dank[x].nav_list+"</td>\n\
			    					<td align='center'>"+dank[x].nav_ctime+"</td>\n\
			    					<td align='center'><a href="+s_url+"/edit/id/"+dank[x].nav_id+">编辑</a>&nbsp;&nbsp;&nbsp;\n\
			    					    <a href="+s_url+"/delete/id/"+dank[x].nav_id+" style='color: red;' class='dele'>删除</a></td>\n\
			    				</tr>";
			            	}else{
			            		str="<tr class="+s+">\n\
			    					<td  align='center'><input type='checkbox' name='id[]' value="+dank[x].nav_id+"></td>\n\
			    					<td   class='nav_find' title='0' dir='1'><span style='float:left;width:"+k+"px;height:1px;'></span><img src='/Public/backend/style/img/tv-item.gif'>"+dank[x].nav_title+"</td>\n\
			    					<td  align='center'>"+dank[x].nav_place+"</td>\n\
			    					<td  align='center'>"+dank[x].nav_url+"</td>\n\
			    					<td  align='center'>"+dank[x].nav_list+"</td>\n\
			    					<td  align='center'>"+dank[x].nav_ctime+"</td>\n\
			    					<td  align='center'><a href="+s_url+"/edit/id/"+dank[x].nav_id+">编辑</a>&nbsp;&nbsp;&nbsp;\n\
			    					    <a href="+s_url+"/delete/id/"+dank[x].nav_id+" style='color: red;' class='dele')'>删除</a></td>\n\
			    				</tr>";
			            	}
			            	newp+=str;
			            }
			            
			            	        par.after(newp);
			            	        t.attr("lang",1);
			          }   
			        });
			}else{
				$(this).find("img").attr("src","/Public/backend/style/img/tv-collapsable.gif");
				$(this).parent("tr").nextAll("."+s).show();
			}
			t.attr("dir",2);
		}else{
			$(this).find("img").attr("src","/Public/backend/style/img/tv-expandable.gif");
			$(this).parent("tr").nextUntil(".b_par").hide();
			//所有子集恢复原状
			var f=t.parent("tr").nextUntil(".b_par");
			var i=f.length;
			for(var q=0;q<i;q++){
				var check_f=f.eq(q).find(".nav_find").attr("title");
				if(check_f==1){
					f.eq(q).find("img").attr("src","/Public/backend/style/img/tv-expandable.gif");
					f.eq(q).find(".nav_find").attr("dir",1);
				}
			}
			t.attr("dir",1);
		}
		
		
	});
});


$(function(){
	var s_url="http://"+window.location.host+"/index.php/Backend/Member";
	var selfurl = "http://"+window.location.host+"/index.php/Backend/Member/ajax";
	
	$("#province").change(function(){
		var p_id=$(this).val();
		var pro=$(this);
		$.ajax({
	        type:"post",
	        url:selfurl,
	        data:"p_id="+p_id,
	        success:function(msg){
	        	$("#second").remove();
	        	$("#third").remove();
	            var stra="<select name='second' id='second'>";
	            var strb="<option value=0>请选择</option>";
	            for(x in msg){
	            	strb+="<option value='"+x+"'>"+msg[x]+"</option>";
	            }
	            var strc="</select>";
	            pro.after(stra+strb+strc);
	            
	            }

	           
	        });
	});
	$("#second").live("change",function(){
		var p_id=$(this).val();
		var pro=$(this);
		$.ajax({
	        type:"post",
	        url:selfurl,
	        data:"p_id="+p_id,
	        success:function(msg){
	        	$("#third").remove();
	        	if(msg==null){return false;}
	            var stra="<select name='third' id='third'>";
	            var strb="<option value=0>请选择</option>";
	            for(x in msg){
	            	strb+="<option value='"+x+"'>"+msg[x]+"</option>";
	            }
	            var strc="</select>";
	            pro.after(stra+strb+strc);
	            
	            }

	           
	        });
	});
});

