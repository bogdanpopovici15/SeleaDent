//@ sourceURL=toastrModule.js
var toastrModule = function () {

    //region private functions
    function init() {
    }

    function showSuccess(htmlContent) {
        $.notifyBar({ cssClass: "success", html: htmlContent, close: true, closeOnClick: false });
    };

    function showInfo(htmlContent) {
        $.notifyBar({ cssClass: "info", html: htmlContent, close: true, closeOnClick: false });
    }

    function showWarning(htmlContent) {
        $.notifyBar({ cssClass: "warning", html: htmlContent, close: true, closeOnClick: false });
    };

    function showError(htmlContent) {
        $.notifyBar({ cssClass: "error", html: htmlContent, close: true, closeOnClick: false });;
    }

    //endregion

    //public methods
    return {
        init: init,
        showSuccess: showSuccess,
        showInfo: showInfo,
        showError: showError,
        showWarning: showWarning
    };
}();