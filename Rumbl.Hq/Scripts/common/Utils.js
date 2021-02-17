function validateForm(formName) {
    var $form = $("#" + formName);
    $form.validate();
    return $form.valid();
};