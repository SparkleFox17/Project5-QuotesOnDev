(function($) {
  // Save current url
  const currentUrl = window.location.href;

  // Update Content on random quote
  const updateContent = (data) => {
    const $post = $('.post');
    $post.empty();

    let quoteBuilder = '';

    // Add quote content
    if (data.content.rendered) {
      quoteBuilder += `<div class="entry-content">${data.content.rendered}</div>`;
    }

    // Add quote author and quote source
    if (data.title.rendered) {
      quoteBuilder += `<header class="entry-header">
      <h2 class="entry-title">
      <a href="${data.link}">${data.title.rendered}</a>`;

      // Add quote source if available
      if (data._qod_quote_source) {
        quoteBuilder += `<span class="quote-source">${data._qod_quote_source}</span>`;
      }
      quoteBuilder += '</h2></header>';
    } else {
      // If no quote author entered, show as anonymous
      quoteBuilder += `<header class="entry-header">
      <h2 class="entry-title">
      <a href="${data.link}">Anonymous</a></h2></header>`;
    }
    
    // append quote
    $post.append(quoteBuilder);
  }

  // Function to fetch a random quote
  const randomQuoteFunction = () => {
    $.ajax({
      method: 'GET',
      url: random_quote.rest_url + 'wp/v2/posts?' + 'per_page=100',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', random_quote.wpapi_nonce)
      }
    }).done(response => {

      // randomize quote
      const randomPost = response[Math.floor(Math.random() * response.length)];
      
      const randomPostUrl = currentUrl + randomPost.slug

      // update content and inject new state
      updateContent(randomPost);
      history.pushState(randomPost, randomPost.content.rendered, randomPostUrl);

    }).fail(() => {
    }).always(() => {

    });
  };

  // Event handler to recieve random quote on corresponding button click
  $('#another-quote').on('click', event => {
    event.preventDefault();
    randomQuoteFunction();
  });

  // If it home page, api call for a random quote
  let firstPageLoad = 0;
  if (firstPageLoad === 0 && $('.fa-spinner').length) {
    firstPageLoad++;
    randomQuoteFunction();
  }

  // Revert to a previously saved state
  window.addEventListener('popstate', function(event) {
    if (event.state === null) {
      history.go(0);
      return;
    }
    updateContent(event.state);
  });

  const failToSubmit = response => {
    // Hide form
    $form.addClass('hidden');

    // Default error message
    let errorMessage = `<div class="error-message">
    <p>There has been an error processing your quote submission, please try again.</p>
    <button>try again</button>
    </div>`;

    // Specialized error messages
    if (response === 'missingcontent') {
      errorMessage = `<div class="error-message">
      <p>There has been an error processing your quote submission.</p>
      <p>Your quote field is empty. Please try again.</p>
      <button>try again</button>
      </div>`;
    } else if (response.statusText) {
      const responseType = response.statusText.toLowerCase();
      if (responseType === 'unauthorized') {

        // Create login url
        let urlArray = currentUrl.split('/');
        let baseUrl = currentUrl;
        
        for (let i = 1; i < urlArray.length; i++) {
          if (urlArray.slice(0, -i).includes('submit')) {
            baseUrl = urlArray.slice(0, -i - 1);
          }
        }

        baseUrl = baseUrl.join('/');
        baseUrl = baseUrl + '/';

        errorMessage = `<div class="error-message">
        <p>Sorry, you must be logged in to submit a quote!</p>
        <p><a href="${baseUrl}wp-login.php">Click here to login.</a></p>
        </div>`;
      }
    }
    $form.after(errorMessage);
  };

  // submit new quote
  const $form = $('#submit-new-quote');
  $form.on('submit', event => {
    event.preventDefault();

    // save form content to be submitted
    let formData = {}
    $form.find('[name]').each( (index, value) => {
      formData[value.name] = value.value;
    });
    
    // If missing a quote, output error
    if (formData.content.trim() === '' || !formData.content) {
      failToSubmit('missingcontent');
      return;
    }

    // If missing a quote author, fill it as anonymous
    if (formData.title.trim() === '' || !formData.content) {
      formData.title = 'Anonymous';
    }

    // Add additional properties to submission data
    formData.status = 'publish';
    formData.category = 'User Submitted'

    $.ajax({
      method: 'POST',
      url: submit_quote.rest_url + 'wp/v2/posts',
      data: formData,
      dataType: 'json',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', submit_quote.wpapi_nonce);
      }
    }).done(() => {
      // Successful quote submission stuff
      $form.addClass('hidden');
      const afterSubmit = '<div class="submit-another"><p>Your quote has been submitted!</p><button type="button">Submit Another Quote</button></div>'
      $form.after(afterSubmit);
    }).fail(response => {
      failToSubmit(response);
    }).always(() => {
    });
  });
})(jQuery);