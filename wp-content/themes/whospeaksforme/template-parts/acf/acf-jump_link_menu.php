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


$jump_nav = get_sub_field('jump_link_navigation');
$modified_titles = [];
$title_index = 0;
?>

<nav class="acf-jump-link-nav alignfull">
    <ul style="grid-template-columns: repeat(<?php echo count($jump_nav) ?>, 1fr);">
    <?php foreach($jump_nav as $nav_item):
        $collapsed_title = str_replace(" ", "-", strtolower($nav_item['jump_title']));
        $modified_titles[] = $collapsed_title;
    ?>
        <li><a class="jump-link" href="#<?php echo $collapsed_title; ?>"><span data-target="#<?php echo $collapsed_title; ?>"><?php echo $nav_item['jump_title']; ?></span></a></li>
    <?php endforeach; ?>
    </ul>
    <hr class="double-border">
</nav>