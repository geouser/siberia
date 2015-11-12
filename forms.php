<?php
function custom_mail($to, $title, $msg, $attachments) {
	require 'PHPMailer-master/PHPMailerAutoload.php';
	$mail = new PHPMailer;
	$mail->CharSet = 'UTF-8';
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.yandex.ua';  				      // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'town.smoke@yandex.ru';             // SMTP username
	$mail->Password = '4kGeRtCkuDeDQaXd';                 // SMTP password
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                    // TCP port to connect to

	$mail->setFrom('town.smoke@yandex.ru', 'Siberian Wild Apps');
	$mail->addAddress($to);     						  // Add a recipient

	$mail->addAttachment(   $attachments['tmp_name'],
	                        $attachments['name']);     // Add attachments 

	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = $title;
	$mail->Body    = $msg;
	$result = $mail->send();

	return $result;
}


$id = substr(base_convert(md5(time()), 16, 10), 0, 5);
$to = 'serhiyhulyi93@gmail.com';
$title = 'Заявка на сайте #'.$id;
$msg =  '<p>На сайте была оформлена заявка на ознакомление с проектом</p>' .
	    '<p><b>Имя:</b> ' . $_POST['name'] . '</p>' .
	    '<p><b>Телефон:</b> ' . $_POST['tel'] . '</p>' .
	    '<p><b>E-mail:</b> ' . $_POST['email'] . '</p>' .
	    '<p><b>Текст сообщения:</b> ' . $_POST['msg'];
$attachments = $_FILES['file'];
custom_mail($to, $title, $msg, $attachments);
?>
