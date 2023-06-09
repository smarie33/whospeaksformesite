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
$tooltips = get_sub_field('large_tooltip');
$tothelast = count($tooltips);
$cnt = 1;
$color = get_sub_field('word_color') ? get_sub_field('word_color') : '#000';
$dot = '<div class="dot" style="color:'.$color.'">&middot;</div>';
?>

<section class="acf-large_tooltip alignfull<?php if(get_sub_field('word_border')): ?> word-border<?php endif; ?>" style="background-color:<?php the_sub_field('background_color') ?>">

  <?php if(get_sub_field('word_border')): ?>
  <div class="top"><div class="words"><?php the_sub_field('word_border_words'); ?></div></div>
  <div class="centered">
    <div class="left"><div class="words"><?php the_sub_field('word_border_words'); ?></div></div>
  <?php endif; ?>
  <div class="big-words">
  <?php foreach($tooltips as $tooltip): ?>
    <?php if($cnt == $tothelast){$dot = '';} ?>
      <div class="tooltip-hover" style="color:<?php echo $color ?>;">
       <?php echo $tooltip['rollover_text']; ?>
        <div class="tooltip" id="tooltip_<?php echo $cnt ?>">
          <?php echo $tooltip['tooltip_Info']; ?>
          <?php if($tooltip['add_button']): ?>
            <?php $open_new = $tooltip['button_link']['target'] ? $tooltip['button_link']['target'] : '_self'; ?>
            <a class="button <?php echo $tooltip['button_type'] ?>" href="<?php echo $tooltip['button_link']['url'] ?>" target="<?php echo $open_new; ?>"><?php echo $tooltip['button_link']['title'] ?></a>
          <?php endif; ?>
        </div>
      </div>
      <?php echo $dot; ?>
      <?php $cnt++; ?>
  <?php endforeach; ?>
  </div>
  <?php if(get_sub_field('word_border')): ?>
      <div class="right"><div class="words"><?php the_sub_field('word_border_words'); ?></div></div>
    </div>
  <?php endif; ?>

</section>

