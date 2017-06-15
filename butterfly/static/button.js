$('#save').click(function(e) {
    var href = window.location.href ;
    var file_server_port = 57576;
    var domain = href.split(":")[0] + ":" + href.split(":")[1] + ":"+ file_server_port + "/";
    var text = window.term.editor.getValue();

    $.post(domain, {'operation_post':'save_content', 'parent' : '/', 'filename' : $("#filename").val(), 'content': text },
        function(data){
            $('#tree').jstree().refresh();
        });
    // $.post(domain, {"operation_post":"save_content","filename":$("#filename").val(),"content":text })
    //     .done(function (d) {
    //         //data.instance.load_node(data.parent);
    //         // data.instance.refresh();
    //     })
    //     .fail(function () {
    //         // data.instance.refresh();
    // });


});
