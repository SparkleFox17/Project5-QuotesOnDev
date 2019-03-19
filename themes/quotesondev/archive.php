<?php
/**
 * The template for displaying archive pages.
 * Template Name: Archive
 * 
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'template-parts/content', 'page' ); ?>

		<?php endwhile; wp_reset_postdata(); // End of the loop. ?>

			


		<h3>Quote Authors</h3>
		<?php
			$args = array(
				'orderby'=>'ASC', 
				'posts_per_page'=>'-1'
			);

			$quote=new WP_Query($args);
		?>

		<?php while ($quote->have_posts()) : $quote->the_post(); ?>

			<a id="quote-category" href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a>

		<?php endwhile; // End of the loop. ?>


		<h3>Categories</h3>
		
		<?php
			$categories = get_categories();
			foreach ($categories as $category) : ?>
				<a href="<?php echo get_category_link($category->term_id) ?>"><?php echo $category->name ?></a>
			<?php endforeach; wp_reset_postdata(); 
		?>
			

		<h3>Categories</h3>
			<?php
			$categories = get_tags();
			foreach ($categories as $category) : ?>
				<a href="<?php echo get_category_link($category->term_id) ?>"><?php echo $category->name ?></a>
			<?php endforeach; wp_reset_postdata(); ?>
	

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
