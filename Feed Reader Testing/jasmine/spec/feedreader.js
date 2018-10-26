/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         for (let id of allFeeds) {
           it('URLs are defined', function() {
            expect(id.url).toBeDefined();
            expect(id.url).not.toBe('');
          });
         }

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         for (let id of allFeeds) {
           it('names to be defined', function() {
            expect(id.name).toBeDefined();
            expect(id.name).not.toBe('');
          });
         }
    });

    /* New test suite named "The menu" */
    describe('The menu', function() {

      /* This test ensures the menu element is
       * hidden by default.
       */

       it('verify menu is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
       });

       /* This test ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * has two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

        it('menu icon click activates visibility', function()
        {
          let menuClick = $('.menu-icon-link');
          menuClick.click();
          expect($('body').hasClass('menu-hidden')).toBe(false);
          menuClick.click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
      });

      /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {

      /* This test ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test requires
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */

       beforeEach(function(done) {
         loadFeed(0, done)
       });
       it ('loads at least a news feed in the feed container', function() {
         const feed = $('.feed .entry');
         expect(feed.length).not.toBe(0);
       });
    });


    /* New test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

      /* This test ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */


       // Variables used to compare the initial feed to the next one.
       let prevFeed;
       let feed;

       beforeEach(function(done) {
         loadFeed(0, function() {
           feed = $('.feed');
           loadFeed(1, done);
         });
       });

       it('is working, and content updates', function(done) {
         prevFeed = feed;

         expect($('.feed').html()).not.toBe(prevFeed);
         done();
       });
    });
});
