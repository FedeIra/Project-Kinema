import emailjs from '@emailjs/browser';

const YOUR_SERVICE_ID = "service_1bulzc5";
const YOUR_TEMPLATE_ID = "template_5z1zo5j";
const YOUR_PUBLIC_KEY = "sz809Sptds_qM-l4v"

export default function welcomeEmail (email, username) {

  const templateParams = {
    to_name: username,
    from_name: "Kinema",
    to_email: email
  }

    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
};
