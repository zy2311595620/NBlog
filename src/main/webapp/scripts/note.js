//封装note操作
function loadBookNote() {
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
        var note=result.data;
        for (var i = 0;i<note.length;i++){
            var noteId=note[i].cn_note_id;
            var noteTitle=note[i].cn_note_title;
            createNoteLi(noteId,noteTitle);

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
    $("#note_ul a").removeClass("checked")
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
