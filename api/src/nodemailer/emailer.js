const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "kinema.showcase@gmail.com",
    pass: process.env.PASSWORD
  },
});

const sendMail = async (email, user) => {
  const info = await transporter.sendMail({
    from: "kinema.showcase@gmail.com",
    to: `${email}`,
    subject: "Welcome to Kinema",
    text: "Plaintext version of the message",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Nuevo mensaje</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
    .rollover div {
    font-size:0;
    }
    #outlook a {
    padding:0;
    }
    .ExternalClass {
    width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height:100%;
    }
    .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
    }
    .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
    }
    [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 20px 10px 20px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
    </style>
    </head>
    <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#ffffff"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF" width="100%" cellspacing="0" cellpadding="0">
    <tr style="border-collapse:collapse">
    <td valign="top" style="padding:0;Margin:0">
    <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#010101" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#010101" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://aedkmr.stripocdn.email/content/guids/CABINET_a4dd94d085e32658843b1dc80486eba3/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="200"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#fcfcfc" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" role="presentation">
    <tr style="border-collapse:collapse">
    <td class="es-m-txt-l" align="left" bgcolor="#fbfafa" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:26px;font-style:normal;font-weight:normal;color:#333333">Welcome to <span style="color:#00ff99">Kinema</span>!</h2></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td bgcolor="#fbfafa" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#333333;font-size:14px">Thanks for signing up to a whole new world of entertainment!<br>You can now access unlimited number of movies and TV Shows from your favourite device. Please use this information to access our site:</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:35px;background-color:#fbfafa" bgcolor="#fbfafa" align="left">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-color:#efefef;border-style:solid;border-width:1px;border-radius:3px;background-color:#ffffff" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:20px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333">Your account information:</h3></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#64434a;font-size:16px">Username: ${user} </p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#64434a;font-size:16px">Email: ${email} </p></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px"><!--[if mso]><a href="https://kinema-entertainment.vercel.app/" target="_blank" hidden>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://kinema-entertainment.vercel.app/"
    style="height:40px; v-text-anchor:middle; width:101px" arcsize="50%" stroke="f" fillcolor="#27f5fb">
    <w:anchorlock></w:anchorlock>
    <center style='color:#64434a; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; font-size:14px; font-weight:400; line-height:14px; mso-text-raise:1px'>Explore!</center>
    </v:roundrect></a>
    <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:transparent;background:#27f5fb;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="https://kinema-entertainment.vercel.app/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#64434A;font-size:17px;border-style:solid;border-color:#27f5fb;border-width:10px 20px 10px 20px;display:inline-block;background:#27f5fb;border-radius:30px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:20px;width:auto;text-align:center">Explore!</a></span><!--<![endif]--></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td style="padding:0;Margin:0;background-color:#ddbbba" bgcolor="#ddbbba" align="center">
    <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ddbbba;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ddbbba" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:10px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:23px;color:#000000;font-size:15px"><strong>© 2022 Kinema showcase.<br> All rights reserved</strong></p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    </div>
    </body>
    </html>`
  });

  console.log("Message sent: %s", info.messageId);
  return
}

const sendMailUpgrade = async (email, user) => {
  const info = await transporter.sendMail({
    from: "kinema.showcase@gmail.com",
    to: `${email}`,
    subject: "Subscription Successfully",
    text: "Plaintext version of the message",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Upgrade mail</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
    .rollover div {
    font-size:0;
    }
    #outlook a {
    padding:0;
    }
    .ExternalClass {
    width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height:100%;
    }
    .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
    }
    .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
    }
    [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 20px 10px 20px!important;
    }
    [data-ogsb] .es-button.es-button-1 {
    padding:10px 20px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
    </style>
    </head>
    <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#ffffff"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF" width="100%" cellspacing="0" cellpadding="0">
    <tr style="border-collapse:collapse">
    <td valign="top" style="padding:0;Margin:0">
    <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#010101" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#010101" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://aedkmr.stripocdn.email/content/guids/CABINET_17e471b7ac130a0f8f65509c635e8f80/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="200"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#fcfcfc" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" role="presentation">
    <tr style="border-collapse:collapse">
    <td class="es-m-txt-l" align="left" bgcolor="#fbfafa" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"><h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:22px;font-style:normal;font-weight:normal;color:#333333">Hi ${user}, you are now a <strong><span style="color:#00FCA8">PREMIUM</span>&nbsp;</strong>user!</h2></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td bgcolor="#fbfafa" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#333333;font-size:14px">Thank you for subscribing to <strong>Kinema </strong><strong>Entertainment</strong>. As a premium member you can now watch our entire library of +3000 movies and +2000 tv shows and sync your library across&nbsp; all your devices.</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:35px;background-color:#fbfafa" bgcolor="#fbfafa" align="left">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-color:#efefef;border-style:solid;border-width:1px;border-radius:3px;background-color:#ffffff" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:10px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:28px;color:#333333;font-size:14px"><strong>✔️ Watch any Movie and TV Shows</strong><br>✔️ <strong>Create your own Watchlist</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:10px;Margin:0"><!--[if mso]><a href="https://kinema-entertainment.vercel.app/" target="_blank" hidden>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://kinema-entertainment.vercel.app/"
    style="height:40px; v-text-anchor:middle; width:102px" arcsize="50%" stroke="f" fillcolor="#00fca8">
    <w:anchorlock></w:anchorlock>
    <center style='color:#64434a; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; font-size:14px; font-weight:700; line-height:14px; mso-text-raise:1px'>Explore!</center>
    </v:roundrect></a>
    <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:transparent;background:#00fca8;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="https://kinema-entertainment.vercel.app/" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#64434A;font-size:17px;border-style:solid;border-color:#00fca8;border-width:10px 20px;display:inline-block;background:#00fca8;border-radius:30px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:bold;font-style:normal;line-height:20px;width:auto;text-align:center">Explore!</a></span><!--<![endif]--></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td style="padding:0;Margin:0;background-color:#ddbbba" bgcolor="#ddbbba" align="center">
    <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ddbbba;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ddbbba" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:10px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:23px;color:#000000;font-size:15px"><strong>© 2022 Kinema Entertainment.<br>All rights reserved</strong></p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    </div>
    </body>
    </html>`
  });

  console.log("Message sent: %s", info.messageId);
  return
}

const sendMailRent = async (email, title, img, date, user) => {
  const info = await transporter.sendMail({
    from: "kinema.showcase@gmail.com",
    to: `${email}`,
    subject: "Rent Successfully",
    text: "Plaintext version of the message",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Nuevo mensaje</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
    #outlook a {
    padding:0;
    }
    .ExternalClass {
    width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height:100%;
    }
    .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
    }
    .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
    }
    [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 20px 10px 20px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
    </style>
    </head>
    <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#ffffff"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF" width="100%" cellspacing="0" cellpadding="0">
    <tr style="border-collapse:collapse">
    <td valign="top" style="padding:0;Margin:0">
    <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#000000" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#000000" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:25px;font-size:0px"><a href="https://viewstripo.email" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#F6A1B4;font-size:14px"><img src="https://yemzoh.stripocdn.email/content/guids/CABINET_201b1fc7f8a4beed2a84063b26057f21/images/logo2.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="154"></a></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#fcfcfc" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" role="presentation">
    <tr style="border-collapse:collapse">
    <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"><h2 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333"><strong>Hey ${user}, your purchase was successful.</strong></h2></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td bgcolor="#fcfcfc" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#333333;font-size:14px">The content has been added to your rent list.</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td style="Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:30px;background-color:#fcfcfc" bgcolor="#fcfcfc" align="left">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-color:#efefef;border-style:solid;border-width:1px;border-radius:3px;background-color:#ffffff" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:20px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333"><strong>Your purchase information:</strong></h3></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://image.tmdb.org/t/p/original${img}" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="218"></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#64434a;font-size:16px">Title: ${title} </p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#64434a;font-size:16px">Price: $1.99<br>Expiration date: ${date} </p></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px"><!--[if mso]><a href="https://kinema-entertainment.vercel.app/" target="_blank" hidden>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://kinema-entertainment.vercel.app/"
    style="height:40px; v-text-anchor:middle; width:149px" arcsize="50%" stroke="f" fillcolor="#1cdaff">
    <w:anchorlock></w:anchorlock>
    <center style='color:#ffffff; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; font-size:14px; font-weight:700; line-height:14px; mso-text-raise:1px'>Watch!</center>
    </v:roundrect></a>
    <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:transparent;background:#1cdaff;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="https://kinema-entertainment.vercel.app/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#ffffff;font-size:17px;border-style:solid;border-color:#1cdaff;border-width:10px 20px 10px 20px;display:inline-block;background:#1cdaff;border-radius:30px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:bold;font-style:normal;line-height:20px;width:auto;text-align:center">Enjoy Kinema!</a></span><!--<![endif]--></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td style="padding:0;Margin:0;background-color:#666666" bgcolor="#666666" align="center">
    <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#666666;width:600px" cellspacing="0" cellpadding="0" bgcolor="#666666" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td esdev-links-color="#999999" align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#ffffff;font-size:14px"><strong>© 2022 Kinema Entertainment.<br>All rights reserved</strong></p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    </div>
    </body>
    </html>`
  });

  console.log("Message sent: %s", info.messageId);
  return
}

const sendMailContact = async (email, user, message) => {
  const info = await transporter.sendMail({
    from: "kinema.showcase@gmail.com",
    to: `kinema.showcase@gmail.com`,
    subject: `New message from ${user}`,
    text: "Plaintext version of the message",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Nuevo mensaje</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
    #outlook a {
    padding:0;
    }
    .ExternalClass {
    width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height:100%;
    }
    .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
    }
    .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
    }
    [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 20px 10px 20px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
    </style>
    </head>
    <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#FDFCFC"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#fdfcfc" origin="0.5, 0" position="0.5, 0"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FDFCFC" width="100%" cellspacing="0" cellpadding="0">
    <tr style="border-collapse:collapse">
    <td valign="top" style="padding:0;Margin:0">
    <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#000000" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#000000" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:30px;font-size:0px"><a href="https://viewstripo.email" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#F6A1B4;font-size:14px"><img src="https://zexuif.stripocdn.email/content/guids/CABINET_dfce74baf6b261e72ea6577fd78d6eb2/images/logo2.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="154"></a></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#fcfcfc" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" role="presentation">
    <tr style="border-collapse:collapse">
    <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:26px;font-style:normal;font-weight:normal;color:#333333">Hello, Admin</h2></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td bgcolor="#fcfcfc" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#333333;font-size:14px">You got a new message from<strong> ${user} :</strong></p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:20px;padding-right:20px;background-color:#fcfcfc" bgcolor="#fcfcfc" align="left">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-color:#efefef;border-style:solid;border-width:1px;border-radius:3px;background-color:#ffffff" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:20px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#333333;font-size:14px">${message}</p></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:20px;Margin:0;font-size:0">
    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td>
    </tr>
    </table></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#333333;font-size:14px;text-align:center">Sent from ${email}</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td style="padding:0;Margin:0;background-color:#666666" bgcolor="#666666" align="center">
    <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#666666;width:600px" cellspacing="0" cellpadding="0" bgcolor="#666666" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td esdev-links-color="#999999" align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#ffffff;font-size:14px">© 2022 Kinema Entertainment.<br>All rights reserved</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    </div>
    </body>
    </html>`
  });

  console.log("Message sent: %s", info.messageId);
  return
}

exports.sendMail = (email, user) => sendMail(email, user)
exports.sendMailUpgrade = (email, user) => sendMailUpgrade(email, user)
exports.sendMailRent = (email, title, img, date, user) => sendMailRent(email, title, img, date, user)
exports.sendMailContact = (email, user, message) => sendMailContact(email, user, message)
