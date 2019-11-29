$txtEmail = $('#email');
$txtPassword = $('#password');
$btnEnter = $('#enter');

$btnEnter.click(function(e){
    e.preventDefault();

    let obj = {
        body: {
            email: $txtEmail.val(),
            password: $txtPassword.val()
        }
    }
    console.log(obj);

    if (!validate(obj)){
        alert('Campos obrigatórios em branco!');
        return;
    }

    window.location.href = "./project.html";

    // $.ajax({
    //     url: '127.0.0.1/login',
    //     type: 'POST',
    //     data: obj,
    //     success: function (result) {
    //         //Do something;
    //         window.location.href = "./project.html";
    //     },
    //     error: function (error) {
    //         alert(error);
    //     }
    // });
});


function validate(obj){
    if (!obj.body.email){
        return false;
    } else if (!obj.body.password){
        return false;
    }
    return true;
}