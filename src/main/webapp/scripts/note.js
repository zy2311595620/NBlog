//封装note操作
function loadBookNote() {
    $("#pc_part_2").show();
    $("#pc_part_4").hide();
    $("#pc_part_6").hide();
    $("#pc_part_7").hide();
    $("#pc_part_8").hide();
    //清空原有的noteli列表
    $("#note_ul li").remove();
    //清除选中效果
    $("#book_ul a").removeClass("checked");
    //获取请求参数
    var bookId=$(this).data("bookId");
    $(this).find("a").addClass("checked");

    //参数格式校验
    //发送Ajax
    $.ajax({
        url:base_path+"/note/loadnotes.do",
        data: {"bookId":bookId},
        dataType:"json",
        type:"post",
        success:function (result) {
        var note = result.data;
        for (var i = 0;i<note.length;i++){
            var noteId=note[i].cn_note_id;
            var noteTitle=note[i].cn_note_title;
            createNoteLi(noteId,noteTitle);
            //将新添加的元素判断是否该加分享图标
            //note 是笔记
            var typeId = note[i].cn_note_type_id;
            if (typeId == '2'){
                var img='<i class="fa fa-sitemap"></i>';
               //获取添加li
                var $li = $("#note_ul li:last");
                $li.find(".btn_slide_down").before(img);
            }
        }
        },

        error:function () {
            alert("笔记加载异常");
        }
    });
}
//创建笔记li元素

function createNoteLi(noteId,noteTitle) {
    <!-- 动态生成笔记li元素 -->
	/*<li class="online">
        <a  class='checked'>
        <i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> 使用Java操作符<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>
        </a>
        <div class="note_menu" tabindex='-1'>
        <dl>
        <dt><button type="button" class="btn btn-default btn-xs btn_move" title='移动至...'><i class="fa fa-random"></i></button></dt>
    <dt><button type="button" class="btn btn-default btn-xs btn_share" title='分享'><i class="fa fa-sitemap"></i></button></dt>
    <dt><button type="button" class="btn btn-default btn-xs btn_delete" title='删除'><i class="fa fa-times"></i></button></dt>
    </dl>
    </div>
    </li> */
    var sli='';
    sli+='<li class="online">';
    sli+='<a>';
    sli+='<i class="fa fa-file-text-o" title="online" ' +
        'rel="tooltip-bottom"></i> '+noteTitle+'<button type="button" class="btn btn-default btn-xs' +
        ' btn_position btn_slide_down"><i class="fa fa-chevron-down">' +
        '</i></button>';
    sli+='</a>';
    sli+=' <div class="note_menu" tabindex=\'-1\'>';
    sli+='<dl>';
    sli+=' <dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>\n' + ' ';
    sli+='<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>\n' + '    ';
    sli+='<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>\n' + '    ';
    sli+='</dl>';
    sli+='</div>';
    sli+='</li>';
    //将noteId绑定对应的li上
    var $li=$(sli);
    $li.data("noteId",noteId);
    //将li袁元素添加到笔记列表中
    $("#note_ul").append($li);

}
//根据笔记id加载笔记信息
function loadNote() {
//获取请求参数
// 设计笔记选中效果
    $("#note_ul a").removeClass("checked");
    $(this).find("a").addClass("checked");
    var noteId=$(this).data("noteId");

// 参数格式校验

// 发送ajax
    $.ajax({
        url: base_path+"/note/load.do",
        data: {"noteId":noteId},
        type: "post",
        dataType: "json",
        success:function (result) {
            if (result.status == 0){
                //获取标题
                var title = result.data.cn_note_title;
                //获取内容
                var body = result.data.cn_note_body;
                //设置带编辑区
                $("#input_note_title").val(title);
                um.setContent(body);
                $("#pc_part_5").hide();
                $("#pc_part_3").show();
            }
        },
        error:function () {
            alert("加载异常");
        }
    });
}
//保存笔记
function updateNote() {
   var title=  $("#input_note_title").val();
   var body=um.getContent();
   var $li = $("#note_ul a.checked").parent();
   var noteId = $li.data("noteId");

    // 清空
    $("#note_title_span").html();
   if (title == ""){
       $("#note_title_span").html("<font color='red'>标题不能为空</font>");
   }else if ($li.length == 0){
       alert("请选择要保存笔记");
   }else{
       $.ajax({
           url:base_path+"/note/update.do",
            data:{"noteId":noteId,"title":title,"body":body},
           dataType:"json",
           type:"post",
           success:function (result) {
                if (result.status == 0){
                    var sli="";
                    sli+='<i class="fa fa-file-text-o" title="online" ' +
                        'rel="tooltip-bottom"></i> '+title+'<button type="button" class="btn btn-default btn-xs' +
                        ' btn_position btn_slide_down"><i class="fa fa-chevron-down">' +
                        '</i></button>';
                    //将选中li元素a内容替换
                    $li.find("a").html(sli);
                    alert(result.msg);


                }
           },
           error:function () {
               alert("修改异常");
           }
       });
   }

}
//创建笔记
function addNote() {
    var userId=getCookie("uid");
    var $li = $("#book_ul a.checked").parent();
    //这是bookId
    var bookId = $li.data("bookId");
    var title = $("#input_note").val().trim();
    var ok=true;
    if (userId == null){
        ok = false;
        window.location.href="log_in.html";
    }
    if (title == ""){
        ok = false;
        $("#note_span").html("标题为空");
    }
    if (ok){
        $.ajax({
            url:base_path+"/note/addnote.do",
            dataType: "json",
            data:{"userId":userId,"title":title,"bookId":bookId},
            type:"post",
            success:function (result) {
                if (result.status == 0){
                    closeAlertWindow();
                    var noteId = result.data.cn_note_id;
                    createNoteLi(noteId,title);
                    alert(result.msg);
                }
            },
            error:function () {
                alert("创建异常");
            }
        });
    }
}
//显示笔记菜单
function popNoteMenue() {
    //隐藏菜单
    $("#note_ul div").hide();
    //获取笔记菜单
    var $menus = $(this).parent().next();
    $menus.slideDown(1000);
    $("#note_ul a").removeClass();
    $("#this").parent().addClass("checked");
    return false;
}
//隐藏菜单
function hideBoteMenu() {
    $("#note_ul div").hide();

}
//删除笔记
function delNote() {

    var $li = $("#note_ul a.checked").parent();
    //这是bookId
    var noteId = $li.data("noteId");


        $.ajax({
            url:base_path+"/note/delete.do",
            dataType: "json",
            data:{"noteId":noteId},
            type:"post",
            success:function (result) {

                    closeAlertWindow();
                    $li.remove();
                    alert(result.msg);

            },
            error:function () {
                alert("删除异常");
            }
        });

}
//移动笔记
function moveNote() {
    var $li = $("#note_ul a.checked").parent();
    var noteId = $li.data("noteId");
    var bookId = $("#moveSelect").val();

    $.ajax({
       url:base_path+"/note/move.do",
       data:{"noteId":noteId,"bookId":bookId},
       dataType:"json",
       type:"post",
        success:function (result) {
           closeAlertWindow();
            $li.remove();
            alert(result.msg);

        },
        error:function () {
            alert("移动异常")
        }
    });



}

function shareNote() {
    var $li = $("#note_ul a.checked").parent();
    var noteId = $li.data("noteId");

    $.ajax({
        url:base_path+"/share/share.do",
        dataType:"json",
        data:{"noteId":noteId},
        type:"post",
        success:function (result) {
            if (result.status == 0){
                closeAlertWindow();
                var img='<i class="fa fa-sitemap"></i>';
                $li.find(".btn_slide_down").before(img);


            }
            alert(result.msg);
        },
        error:function () {
            alert("分享异常")
        }
    });
}

function searchSharePage(keyword,page) {
    $.ajax({
        url:base_path+"/note/searchShare.do",
        type:"post",
        data:{"keyword":keyword,"page":page},
        dataType:"json",
        success:function (result) {
        if (result.status == 0){
            var shares = result.data;

            for (var i =0; i < shares.length; i++){
                var shareId = shares[i].cn_share_id;
                var shareTitle = shares[i].cn_share_title;

                var sli='';
                sli+='<li class="online">';
                sli+='<a>';
                sli+='<i class="fa fa-file-text-o" title="online" ' +
                    'rel="tooltip-bottom"></i> '+shareTitle+'<button type="button" class="btn btn-default btn-xs' +
                    ' btn_position btn_slide_down"><i class="fa fa-star">' +
                    '</i></button>';
                sli+='</a>';
                sli+=' <div class="note_menu" tabindex=\'-1\'>';
                sli+='</div>';
                sli+='</li>';
                //将shareId绑定对应的li上
                var $li=$(sli);
                $li.data("shareId",shareId);
                //将li袁元素添加到笔记列表中
                $("#pc_part_6 ul").append($li);
            }

        }

        },
        error:function () {
            alert("搜索异常");
        }
    });
}

function shareNotes() {
    $("li a").removeClass("checked");
    $(this).find("a").addClass("checked");
    var shareId = $(this).data("shareId");

    $.ajax({
        url:base_path+"/share/showNote.do",
        data:{"shareId":shareId},
        dataType:"json",
        type:"post",
        success:function (result) {
                //获取分享标题
            var title =  result.data.cn_share_title;
            var body =  result.data.cn_share_body;

            $("#noput_note_title").html(title);
            $("#noput_note_title").next().html(body);
            //切换显示
            $("#pc_part_5").show();
            $("#pc_part_3").hide();

        },
        error:function () {
            alert("加载异常")
        }
    });
}

