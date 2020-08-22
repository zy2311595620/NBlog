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
