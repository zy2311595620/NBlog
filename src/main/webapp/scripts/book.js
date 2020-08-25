//封装了笔记本的操作
//加载用户笔记本列表
function locadUserBooks() {
    //获取请求参数
    var userId= getCookie("uid");
    //参数格式校验
    if (userId == null){
        window.location.href = "log_in.html";
    }else{
        //发送Ajax
        $.ajax({
            url:base_path+"/book/loadbooks.do",
            data:{"userId":userId},
            type:"post",
            dataType:"json",
            success:function (result) {
                //TODD出路回调
                var books=result.data;
        for (var i = 0;i < books.length;i++){
            var bookId = books[i].cn_notebook_id;
            var bookName = books[i].cn_notebook_name;
            createBookLi(bookId,bookName);
            }
            },
            error:function () {
                alert("查询笔记异常");
            }
        });
    }


}
//创建笔记本列表的li元素
function createBookLi(bookId,bookName) {
    <!-- 动态生成笔记li元素 -->
	    //<li class="online">
        //<a  class='checked'>
        // <i class="fa fa-book" title="online" rel="tooltip-bottom">
        //</a>
        //</i>默认笔记本</a></i>
    var sli='';
    sli+='<li class="online">';
    sli+='<a>';
    sli+='<i class="fa fa-book" title="online" rel="tooltip-bottom">';
    sli+='</i>'+bookName+'</a></i>'
    //将bookId绑定到li元素上
    //将js对象转换成jquery对象
    var $li=$(sli);
    $li.data("bookId",bookId);
    //将li元素添加到ul列表中
    $("#book_ul").append($li);
}

//创建笔记本
function addBook() {
    var userId= getCookie("uid");
    var name = $("#input_notebook").val().trim();

    var ok=true;
    if (userId == null){
        ok = false;
        window.location.href="log_in.html";

    }
    if (name == ""){
        ok = false;
        $("#notebook_span").html("笔记本名为空");
    }
    if (ok){
        $.ajax({
            url:base_path+"/book/add.do",
            type: "post",
            data: {"userId":userId,"name":name},
            dataType: "json",
            success:function (result) {
                if (result.status == 0){
                    closeAlertWindow();
                    var bookId = result.data.cn_notebook_id;
                    var bookName = result.data.cn_notebook_name;
                    createBookLi(bookId,bookName);
                    alert(result.msg);
                }
            },
            error:function () {
                alert("创建异常");
            }
        });

    }
}