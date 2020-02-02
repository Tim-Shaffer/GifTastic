# GifTastic
Using the GIPHY API to make a dynamic web page that populates with GIFs

## Tech Used
* HTML - minimal
* CSS
* Bootstrap
* JavaScript
* jQuery

## Default Page - index.html
* Link directly to the page here:  https://tim-shaffer.github.io/GifTastic/

## Instructions
1. There is an array populated to contain an initial group of topics as a starting point for the functionality.
    1. Looney Tunes Cartoon Characters are used for the topic.
1. Opening the default page will take the topics in the array and create buttons.
1. When the user clicks on a button, the page will grab 10 static, non-animated GIF images from the GIPHY API and place them on the page.
1. When the user clicks one of the still GIPHY images, the GIF will animate and if the user clicks the GIF again, it will stop playing.
1. Under every GIF, the rating that is returned from the GIPHY API is displayed.
1. A form is available on the page to allow the user to add more Cartoon Characters.
    1. When the user clicks the **"Add New"** button or hits enter, the new topic is added to the initial array and the page is updated with a new button to correspond to the new topic.

### Bonus Items:
* As the GIFs are loaded to the page, a button is also added to allow the user to **"Add More GIFs"** to the page.
    * Clicking this button will add different GIFs to the page in increments of 10.  The existing GIFs will remain on the page.
* With the initial load of the first 10 GIFs, a section is added to the page that will hold **"User Favorites"**.  The section will identify to the user that *double-clicking* on an image will move that image to the Favorites Section.
    * The Favorites will remain on the page even when the user clicks a different character to load 10 images of that character.
    * The animate feature will still work on the images in the favorites section as described above.
     

