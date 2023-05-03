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
<script type="text/javascript">
  window.addEventListener('load', function (){
    function animateValue(obj, start, end, duration){
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    function isInViewportChart(element){
      var viewportHeight = window.innerHeight;
      var rect = element.getBoundingClientRect();
      var position = rect.top/viewportHeight;
      if (position >= 0 && position <= 1) {
        return true;
      } else {
        return false;
      }
    }
  });
</script>
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
              <canvas id="donut<?php echo $cnt; ?>"></canvas>
              <canvas id="donut<?php echo $cnt; ?>bg"></canvas>
              <div class="percent-symbol" style="color:<?php the_sub_field('font_color') ?>">%</div>
              <div id="donut_<?php echo $cnt; ?>" class="percent-num" style="color:<?php the_sub_field('font_color') ?>"><?php echo $a_nut['donut_percent'] ?></div>
              <div class="blurb" style="color:<?php the_sub_field('font_color') ?>"><?php echo $a_nut['blurb']; ?></div>
            </div>
            <script type="text/javascript">
              window.addEventListener('load', function() {
                var behindpie<?php echo $cnt; ?> = {
                    animation : false,
                    percentageInnerCutout: 95,
                    segmentShowStroke : false
                }
                var databg<?php echo $cnt; ?> = [
                  {
                    value: 100,
                    color: 'rgb(<?php echo implode(',',$a_nut['donut_bar_color']) ?>)',
                    backgroundColor: 'rgb(126,179,72, 0)'
                  }
                ]; 
                var options<?php echo $cnt; ?> = {
                    animation : true,
                    animationEasing : "easeOutSine",
                    percentageInnerCutout: 90,
                    segmentShowStroke : false
                }
                var data<?php echo $cnt; ?> = [
                  {
                    value: <?php echo $a_nut['donut_percent'] ?>,
                    color: 'rgb(<?php echo implode(',',$a_nut['donut_color']) ?>)',
                    backgroundColor: 'rgb(126,179,72, 0)'
                  },
                  {
                    value: <?php $leftover = 100 - $a_nut['donut_percent']; echo $leftover; ?>,
                    color:"transparent",
                    backgroundColor: "rgb(126,179,72, 0)"
                  }
                ];
                
                const viewportCheck = document.querySelector('.acf-donut_chart');
                if(isInViewportChart(viewportCheck)){
                  const obj<?php echo $cnt; ?> = document.getElementById("donut_<?php echo $cnt; ?>");
                  animateValue(obj<?php echo $cnt; ?>, 0, <?php echo $a_nut['donut_percent'] ?>, 5000);
                  new Chart($("#donut<?php echo $cnt; ?>bg").get(0).getContext("2d")).Doughnut(data<?php echo $cnt; ?>,options<?php echo $cnt; ?>);
                  new Chart($("#donut<?php echo $cnt; ?>").get(0).getContext("2d")).Doughnut(databg<?php echo $cnt; ?>,behindpie<?php echo $cnt; ?>);
                }
              })
            </script>
          <?php $cnt++; endforeach; ?>
      <?php endif; ?>
  </div>
</section>