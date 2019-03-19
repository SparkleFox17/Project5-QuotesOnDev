
(function() {
  $('#get-another-quote-button').on('click', function(e) {
    e.preventDefault();
    $.ajax( {
      url: './wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
         var post = data.shift(); // The data is an array of posts. Grab the first one.
         console.log(post);
        $('#quote-author').text(post.title.rendered);
 
        $('#quote-content').html(post.content.rendered);
        $.ajax( {
          url: './wp-json/wp/v2/categories?filter[id]='+post.content+'',
          success: function(data) {
            var post = data.shift();
            console.log(post);
            $('#quote-content').html(post.name);
          }
        });

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false
    });
  });
})();
