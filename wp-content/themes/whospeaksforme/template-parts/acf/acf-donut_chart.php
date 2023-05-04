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

<section class="acf-donut_chart alignfull" style="background-color:<?php the_sub_field('banner_color') ?>">
  <div class="content">
    <?php 
      $donuts = get_sub_field('donut');
        if($donuts):
          $the_width = 0;
          $cnt = 1;
          if(count(get_sub_field('donut')) == 1){$the_width = 100;};
          if(count(get_sub_field('donut')) == 2){$the_width = 50;};
          if(count(get_sub_field('donut')) == 3){$the_width = 33.25;};
          foreach( $donuts as $a_nut ):
    ?>
            <div class="donut-column" style="width:<?php echo $the_width ?>%">
              <div class="container">
                  <canvas id="donutGraph<?php echo $cnt; ?>" class="donut-graph" width="250" height="250"></canvas>
                  <div class="words">
                    <div id="percentage<?php echo $cnt; ?>" class="percentage" style="color:<?php the_sub_field('font_color') ?>"></div>
                    <div class="blurb" style="color:<?php the_sub_field('font_color') ?>"><?php echo $a_nut['blurb']; ?></div>
                  </div>
              </div>
            </div>
            <script type="text/javascript">
              window.addEventListener('load', function() {
                const canvas<?php echo $cnt; ?> = document.getElementById('donutGraph<?php echo $cnt; ?>');
                const percentageElement<?php echo $cnt; ?> = document.getElementById('percentage<?php echo $cnt; ?>');
                const targetPercentage<?php echo $cnt; ?> = <?php echo $a_nut['donut_percent']; ?>;

                resizeCanvas(canvas<?php echo $cnt; ?>);
                
                window.addEventListener('resize', function() {
                    resizeCanvas(canvas<?php echo $cnt; ?>);
                });

                const donutGraph<?php echo $cnt; ?> = new DonutGraph(canvas<?php echo $cnt; ?>, percentageElement<?php echo $cnt; ?>, targetPercentage<?php echo $cnt; ?>, "<?php echo $a_nut['donut_color'] ?>", "<?php echo $a_nut['donut_bar_color'] ?>");
                donutGraph<?php echo $cnt; ?>.observe();
              })
            </script>
          <?php $cnt++; endforeach; ?>
      <?php endif; ?>
  </div>
</section>