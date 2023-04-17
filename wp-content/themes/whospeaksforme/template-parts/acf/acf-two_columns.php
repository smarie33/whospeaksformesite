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

<section class="acf-two_columns alignfull">
  <div class="column">
    <?php $left_column = get_sub_field('left_column'); ?>
    <?php echo $left_column['content'] ?>
    <?php if($left_column['add_banner']): ?>
          <?php get_template_part( 'template-parts/acf/acf', 'column_banner', array('column' => $left_column['banner']); ?>
    <?php endif; ?>
  </div>
  <div class="column">
    <?php $right_column = get_sub_field('right_column'); ?>
    <?php echo $right_column['content'] ?>
    <?php if($right_column['add_banner']): ?>
          <?php get_template_part( 'template-parts/acf/acf', 'column_banner', array('column' => $right_column['banner']); ?>
    <?php endif; ?>
  </div>
</section>