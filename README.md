Portfolio Project - Content Card TutorialThis guide explains how to add and configure new content cards (divs/containers) to the gallery in this portfolio project.Basic StructureAll content cards, including the header profile and project showcases, are items within a main div with the class list. This list uses CSS columns to arrange items in a masonry-style layout.To add a new item, you'll add a new div element directly inside the <div class="list">...</div> container.<div class="main-content">
    <div class="list">
        <div class="header-as-item">...</div>

        <div class="gallery-item ... other-classes ...">
            </div>

        </div>
</div>
Types of Content CardsThere are a few pre-styled types of cards you can use:1. Header Card (.header-as-item)This is the first item in the list and displays your profile information. It's generally unique and already configured.2. Image-Only Card (.gallery-item.image-only)This card is designed to display an image that fills the entire card area without any visible padding or background around the image itself. The card's shadow and rounded corners come from the base .list > div styles.How to add:<div class="gallery-item image-only">
    <a href="YOUR_PROJECT_LINK_OR_#">
        <img src="URL_TO_YOUR_IMAGE.jpg" alt="Descriptive Alt Text for Image">
    </a>
</div>
Replace URL_TO_YOUR_IMAGE.jpg with the path to your image.The image will automatically try to cover the area.If you want to set a specific height for this card (which will affect how the image is cropped or scaled by object-fit: cover), you can add an inline style:<div class="gallery-item image-only" style="height: 300px;">
    <a href="#"><img src="..." alt="..."></a>
</div>
3. Text Card (.gallery-item.text-card)This card is for displaying text content, typically formatted with Markdown. It has a dark background, padding, and a black border to fit the pixel-art style.How to add:<div class="gallery-item text-card" style="height: 250px;"> <div class="markdown-to-render">
        ### Your Card Title
        This is **Markdown** content.
        - List item 1
        - Another item
        [A Link](#)
    </div>
</div>
Place your Markdown content inside a div with the class markdown-to-render. The JavaScript in the page will automatically convert this to HTML.You can set a height using inline styles.To make the content scrollable if it exceeds the card's height, add the scrollable-content class to the main div.gallery-item.text-card:<div class="gallery-item text-card scrollable-content" style="height: 200px;">
    <div class="markdown-to-render">
        A lot of Markdown text here that will cause scrolling...
    </div>
</div>
4. Overlay Card (.gallery-item.overlay-card)This card displays an image as its background, with text (usually Markdown) overlaid on top. The text has a semi-transparent background with a blur effect for better readability.How to add:<div class="gallery-item overlay-card" style="background-image: url('URL_TO_YOUR_BACKGROUND_IMAGE.jpg'); min-height: 280px;">
    <div class="overlay-content markdown-to-render">
        #### Title Over Image
        Your Markdown content here.
        - Feature 1
        - Feature 2
    </div>
</div>
Set the background-image using an inline style on the div.gallery-item.overlay-card.Set a min-height (or height) for the card so the background image is visible.Place your Markdown content inside a div with the classes overlay-content markdown-to-render.Customizing the Overlay:Overlay Opacity: You can control the opacity of the text's background using a CSS custom property in an inline style on the .overlay-content div:style="--markdown-bg-opacity: 0.85;" (for 85% opacity, darker background)style="--markdown-bg-opacity: 0.4;" (for 40% opacity, lighter background)If not set, it defaults to 0.55 (55% opacity).Overlay Height (Full vs. Bottom):Bottom Overlay (Default): The .overlay-content will only take the height of its text and sit at the bottom of the card.Full Height Overlay: To make the text overlay cover the entire height of the card (like the "About Me" section), add the class full-height-overlay to the div.overlay-content:<div class="gallery-item overlay-card" style="background-image: url('...'); min-height: 230px;">
    <div class="overlay-content markdown-to-render full-height-overlay" style="--markdown-bg-opacity: 0.6;">
        ## Full Height Title
        Content...
    </div>
</div>
Scrollable Overlay Content: If the text within .overlay-content is too long for its container (especially for full-height overlays or fixed-height bottom overlays), add the scrollable class to the div.overlay-content:<div class="gallery-item overlay-card" style="background-image: url('...'); min-height: 280px;">
    <div class="overlay-content markdown-to-render scrollable" style="--markdown-bg-opacity: 0.7;">
        #### Scrollable Title
        Lots of text...
    </div>
</div>
Or for a full-height scrollable overlay:<div class="gallery-item overlay-card" style="background-image: url('...'); min-height: 230px;">
    <div class="overlay-content markdown-to-render scrollable full-height-overlay" style="--markdown-bg-opacity: 0.6;">
        ## Scrollable Full Height Title
        Lots of text...
    </div>
</div>
Markdown RenderingAny content placed inside a div with the class markdown-to-render will be processed by the Marked.js library and converted from Markdown syntax to formatted HTML when the page loads.Remember to write valid Markdown within these elements.This should give you the flexibility to add various types of content to your portfolio gallery!
