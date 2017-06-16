
$('#save').click(function(e) {
    var href = window.location.href ;
    var file_server_port = 57576;
    var domain = href.split(":")[0] + ":" + href.split(":")[1] + ":"+ file_server_port + "/";
    var text = window.term.editor.getValue();
    var parent = $('#tree').jstree();
    $.post(domain, {'operation_post':'save_content', 'parent' : '/', 'filename' : $("#filename").val(), 'content': text },
        function(data){
            $('#tree').jstree().refresh();
        });

});
$('#refresh').click(function(e) {
    $('#tree').jstree().refresh();
});

function initWidthResizer(targetId, partnerId){
    var target = null;
    var width;

    //指定した要素外にマウスをドラッグした場合の処理
    $(window).mousemove(function(e){
        if (target != null) {
            windowWidth = window.innerWidth;
            width = e.clientX - parseInt ($('#' + targetId).offset().left);
            $('#' + targetId).css ({ width: width + 'px' });
            $('#' + partnerId).css ({ width: windowWidth - width + 'px' });
            window.term.editor.resize();

            return false;
        }
        return false
    });

    //指定した要素内にマウスをドラッグした場合の処理
    $('#' + targetId).mousemove (function (e) {
        var right = parseInt ($(this).offset().left) + parseInt($(this).css("width"));
        if ((right - 10) < e.clientX) {
            if (e.clientX < (right + 10)) {
                $(this).css ({ cursor: 'col-resize' });
                return false;
            }
        }
        $(this).css ({ cursor: 'default' });
        return true;
    });

    //マウスを押した時cusorがcol-resizeになっていた場合bodyの何処にマウスを動かしてもcol-resizeになる処理
    $('#' + targetId).mousedown (function (e) {
        if ($(this).css('cursor') == 'col-resize') {
            target = $(this);
            $(document.body).css ({ cursor: 'col-resize' });
            return false;
        }
        return true;
    });

    //マウスを放したときクッキーに放したときのサイズを保存しcursorを元に戻す処理
    $(window).mouseup (function (e) {

        target = null;
        $(document.body).css ({ cursor: '' });
    });
}

function initHeightResizer(targetId, partnerId){
    var target = null;
    var height;

    //指定した要素外にマウスをドラッグした場合の処理
    $(window).mousemove(function(e){
        if (target != null) {
            windowHeight = window.innerHeight;
            height = e.clientY - parseInt ($('#' + partnerId).offset().top);
            console.log(e.clientY , parseInt ($('#' + partnerId).offset().top));
            $('#' + partnerId).css ({ height: height + 'px' });
            $('#' + targetId).css ({ height: windowHeight - parseInt ($('#' + partnerId).offset().top) - height + 'px' });
            window.term.editor.resize();
            return false;
        }
        return false
    });

    //指定した要素内にマウスをドラッグした場合の処理
    $('#' + targetId).mousemove (function (e) {
        var bottom = parseInt ($("#" + partnerId).offset().top) + parseInt($("#" + partnerId).css("height"));

        if ((bottom - 20) < e.clientY) {
            if (e.clientY < (bottom + 20)) {
                $(this).css ({ cursor: 'row-resize' });
                return false;
            }
        }
        $(this).css ({ cursor: 'default' });
        return true;
    });

    //マウスを押した時cusorがcol-resizeになっていた場合bodyの何処にマウスを動かしてもcol-resizeになる処理
    $('#' + targetId).mousedown (function (e) {
        if ($(this).css('cursor') == 'row-resize') {
            target = $(this);
            $(document.body).css ({ cursor: 'row-resize' });
            return false;
        }
        return true;
    });

    //マウスを放したときクッキーに放したときのサイズを保存しcursorを元に戻す処理
    $(window).mouseup (function (e) {

        target = null;
        $(document.body).css ({ cursor: '' });
    });
}
initWidthResizer("treediv" ,"editor_and_terminal");
initHeightResizer("term", "edirotdiv");
