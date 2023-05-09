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

?>

<div class="contact-form title">
  <h2 class="" aria-label="Contact Us"><span style="color:white;">contact</span> us</h2>
</div>

<div class="contact-form form">
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
  </ul>
</div>