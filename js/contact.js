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
        SecureToken: '0efabb16-d234-4219-ad02-ec40dbb146d3',
        Host: "smtp.elasticemail.com",
        Username: "ashiksaith007@gmail.com",
        Password: "6369E968B981515800DD070DEA8EDB22BBA5",
        To: 'ashiksaith007@gmail.com',
        From: "ashiksaith007@gmail.com",
        Subject: "New contact from Portfolio",
        Body: messageBody
    }).then(
        message => {
            if (message == 'OK') {
                swal("Successfull", "You clicked the button!", "success");
            } else {
                swal("Error", "You clicked the button!", "error");
            }
        }
    );
}

