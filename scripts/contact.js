

document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("abVKoi0bEuczVq0rT");

    function sendEmail() {
        var parms = {
            sendername: document.querySelector("#contactname").value,
            to: document.querySelector("#contactemail").value,
            subject: document.querySelector("#contactsubject").value,
            replyto: document.querySelector("#contactreceiveemail").value, 
            message: document.querySelector("#contactmessage").value, 


        };
    
        var serviceID = "service_qwjy3wv";
        var templeteId = "template_8tl0jw9";
    
        emailjs.send(serviceID, templeteId, parms)
            .then(res => {
                alert("Your Opinion Sent Successfully");
            })
            .catch(error => {
                console.error('EmailJS Error:', error);
            });
    }
    

    var sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        sendEmail(); 
    });



});
