var ajax = function () {

    function getWithoutData(url, successCallback, failureCallBack) {
        $.ajax({
            url: url,
            dataType: "html",
            success: successCallback,
            error: failureCallBack
        });
    }

    function get(url, postData, successCallback, failureCallBack, context, asyncCall) {
        $.ajax({
            url: url,
            dataType: "json",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: asyncCall === undefined ? true : asyncCall,
            cache: false,
            data: postData,
            success: successCallback,
            error: failureCallBack,
            context: context
        });
    }

    function getViewWithoutData(url, successCallback, failureCallBack, context, asyncCall) {
        $.ajax({
            context: context,
            url: url,
            dataType: "html",
            type: "GET",
            async: asyncCall === undefined ? true : asyncCall,
            cache: false,
            success: successCallback,
            error: failureCallBack
        });
    }

    function post(url, postData, successCallback, failureCallBack, context) {
        var options = {
            context: context,
            type: "POST",
            url: url,
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            failure: failureCallBack
        };
        $.ajax(options);
    }

    function postWithoutData(url, successCallback, failureCallBack) {
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            failure: failureCallBack
        });
    }

    function postFile(url, formData, successCallback, failureCallBack) {
        $.ajax({
            type: "POST",
            method: 'POST',
            url: url,
            data: formData,
            cache: false,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: successCallback,
            failure: failureCallBack
        });
    }

    return {
        get: get,
        getWithoutData: getWithoutData,
        getViewWithoutData: getViewWithoutData,
        post: post,
        postWithoutData: postWithoutData,
        postFile: postFile
    };
}();

