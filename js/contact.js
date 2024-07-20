function emailSend() {

    var userName = document.getElementById('first_name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;


    var messageBody = "Name :" + userName +
        "<br/> Email :" + email +
        "<br/> Subject :" + subject +
        "<br/> Message :" + message;
    Email.send({
        SecureToken: '790ca9b9-7c86-4d56-adf4-9a341c53422b',
        Host: "smtp.elasticemail.com",
        Username: "athnanabubacker007@gmail.com",
        Password: "91209B10BDBF4B5968EA85F66E1D8B593382",
        To: 'athnanabubacker007@gmail.com',
        From: "athnanabubacker007@gmail.com",
        Subject: "This is the subject",
        Body: messageBody
    }).then(
        message => {
            if (message == 'OK') {
                swal("Secussful", "You clicked the button!", "success");
            } else {
                swal("Error", "You clicked the button!", "error");
            }
        }
    );
}