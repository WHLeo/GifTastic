
$(document).ready(function() {

  var topics = ["American Beauty", "Shakespeare in Love", "Titanic", "The English Patient", "Braveheart", "Forrest Gump", "Schindler’s List", "Casablanca", "Gone with the Wind", "Spotlight", "No Country for Old Men", "Gladiator", "A Beautiful Mind"];	

 
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            
            var a = $('<button>');
            a.addClass('best');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();


$(document).on('click', '.best', function() {

    
    var martialArts = $(this).html(); 
    

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + martialArts + "&api_key=dc6zaTOxFJmzC&limit=10";
   

   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        
        $('#movies-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                       
        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#movies-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        
        var rating = results[j].rating;
            
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#movies-view').prepend(displayRated);
  } 

}); 

       
        function playGif() { 
                    var state = $(this).attr('data-state');
                    
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 

      }); 

          
        $(document).on('click', '#add-movie', function(){
            if ($('#movie-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var movies = $('#movie-input').val().trim();
            topics.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); 

