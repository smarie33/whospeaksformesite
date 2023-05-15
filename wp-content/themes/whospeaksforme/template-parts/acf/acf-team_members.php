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

<section class="acf-team_members alignfull">
  <?php $direction = 'row-reverse'; ?>
  <?php $team_members = get_sub_field('team'); ?>
  <?php if( $team_members ): ?>
    <?php $double_up = 1; ?>
    <?php foreach( $team_members as $post ): ?>
      <?php setup_postdata($post); ?>
      <?php if(get_field('double_up') && $double_up == 1): ?>
         <div class="member" style="flex-direction: row">
          <div class="column">
            <h2><?php the_title(); ?></h2>
            <div class="member-info">
              <div><b><?php the_field('type'); ?>: </b><?php the_field('position') ?></div>
              <div><b>Location: </b><?php the_field('location') ?></div>
              <?php the_content(); ?>
            </div>
          </div>
        <?php $double_up++; ?>
      <?php elseif(get_field('double_up') && $double_up == 2): ?>
          <div class="column">
            <h2><?php the_title(); ?></h2>
            <div class="member-info">
              <div><b><?php the_field('type'); ?>: </b><?php the_field('position') ?></div>
              <div><b>Location: </b><?php the_field('location') ?></div>
              <?php the_content(); ?>
            </div>
          </div>
        </div>
        <?php $double_up = 1; ?>
      <?php else: ?>
        <div class="member" style="flex-direction:<?php echo $direction ?>">
          <div class="column">
            <?php echo get_the_post_thumbnail( get_the_ID(), 'large' ); ?>
          </div>
          <div class="column">
            <h2><?php the_title(); ?></h2>
            <div class="member-info">
              <div><b><?php the_field('type'); ?>: </b><?php the_field('position') ?></div>
              <div><b>Location: </b><?php the_field('location') ?></div>
              <?php the_content(); ?>
            </div>
          </div>
        </div>
      <?php endif; ?>
      <?php if(!get_field('double_up') || $double_up == 1): ?>
       <hr>
      <?php endif; ?>
      <?php //$direction = ($direction == 'row') ? 'row-reverse' : 'row'; ?>
    <?php endforeach; ?>
    <?php wp_reset_postdata(); ?>
  <?php endif; ?>
</section>