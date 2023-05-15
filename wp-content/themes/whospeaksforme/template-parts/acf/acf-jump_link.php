<?php
/**
 * Template part for displaying an advanced custom field
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Who Speaks For Me
 * @since Twenty Twenty-One 1.0
 */


?>

<section class="acf-jump_link alignfull">
  <?php if(get_sub_field('show_rule_line')): ?><hr><?php endif; ?>
  <a id="<?php echo $args['jumplink']; ?>"></a>
</section>