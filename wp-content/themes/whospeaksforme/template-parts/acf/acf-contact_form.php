<?php
/**
 * Template part for displaying a contact form
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Who Speaks For Me
 * @since Twenty Twenty-One 1.0
 */

if(!empty($_POST)){
  if($_POST['where'] == 'contact form'){
    $errors = [];
    $errorMessage = '';

    if (!empty($_POST)) {
       $name = htmlspecialchars($_POST['first_name']);
       $email = htmlspecialchars($_POST['email']);
       $org = htmlspecialchars($_POST['organization']);
       $message = htmlspecialchars($_POST['message']);

       if (empty($name)) {
           $errors[] = 'Name is empty';
       }
       if (empty($org)) {
           $errors[] = 'Organization is empty';
       }

       if (empty($email)) {
           $errors[] = 'Email is empty';
       } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
           $errors[] = 'Email is invalid';
       }

       if (empty($message)) {
           $errors[] = 'Message is empty';
       }

       if (empty($errors)) {
        $to = 'info@whospeaks4me.org';
        $subject = "From the Who Speaks For Me Contact Form";
        $headers = 'From: The Who Speaks For Me Website <info@whospeaks4me.org>' . "\r\n";
        $name = htmlspecialchars($_POST['first_name']).' '.htmlspecialchars($_POST['last_name']);
        $bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Organization: {$org}" ,"Message:", $message];
        $body = join(PHP_EOL, $bodyParagraphs);

       if(wp_mail($to, $subject, $body, $headers)){
        echo '<div class="contact-success">Thank you for contacting us. Someone will review your message shortly</div>';
           //header('Location: '.get_site_url().'/success');
       }else{
        echo '<div class="contact-error">There was an error. Please try again!</div>';
       }
     }else{
        $allErrors = join('<br/>', $errors);
        echo '<div class="contact-error">'.$allErrors.'</div>';
     }
    }
  }
}

?>

<div class="contact-form title">
  <h2 class="" aria-label="Contact Us"><span style="color:white;">contact</span> us</h2>
</div>

<div class="contact-form form">
  <form method="POST">
    <ul>
        <li>
          <label>Full Name <span class="required">*</span>
          </label>
          <input type="text" name="first_name" size="25" value="" placeholder="First"> 
          <input type="text" name="last_name" size="25" value="" placeholder="Last">
        </li>
        <li>
            <label>Email <span class="required">*</span></label>
            <input type="email" autocapitalize="off" autocorrect="off" name="email" size="25" value="" placeholder="Email">
        </li>
        <li>
          <label>Organization <span class="required">*</span></label>
          <input type="text" name="organization" size="25" value="" placeholder="Organization">
      </li>
      <li>
          <label>Your Message <span class="required">*</span>
          </label>
          <input type="text" name="message" size="25" value="" placeholder="Your Message">
      </li>
      <li>
          <input type="submit" value="Submit">
      </li>
      <input type="hidden" name="where" value="contact form">
    </ul>
  </form>
</div>