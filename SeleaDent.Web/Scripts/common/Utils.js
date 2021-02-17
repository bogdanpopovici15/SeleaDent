function validateForm(formName) {
    var $form = $("#" + formName);
    $form.validate();
    return $form.valid();
};

function getUrlParam(name) {
    var decodedUrl = decodeURIComponent(window.location.href);
    if (decodedUrl === undefined || decodedUrl === null)
        return null;
    try {
        if (decodedUrl.indexOf('ReturnUrl') < 0) {
            return null;
        }
        return decodedUrl.substring(decodedUrl.indexOf('ReturnUrl') + "ReturnUrl=".length)
    } catch (e) {
        return null;
    }
};
