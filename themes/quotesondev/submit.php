<?php
/**
 * The template for displaying all pages.
 * Template Name: Submit
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<form action="" method="post">
			<div>
				<label for="field1">Author of Quote</label><br/>
				<input type="text" name="title" id="field1">
			</div>

			<div><br/>
				<label for="field2">Quote</label><br/>
				<textarea name="content" id="field2" cols="10" rows="10"></textarea>
			</div>

			<div><br/>
				<label for="field3">Where did you find this quote? (e.g. book name)</label><br/>
				<input type= "text" name="_qod_quote_source" id="field3">
			</div>

			<div><br/>
				<label for="field4">Provide the URL of the quote source, if available</label><br/>
				<input type="text" name="_qod_quote_url" id="field4">
			</div>

			<div><br/>
				

			</div>

		</form>
		<button type="submit" id="submit" >Submit Quote</button>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>

