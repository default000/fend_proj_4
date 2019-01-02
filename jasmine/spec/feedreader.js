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

        /* Loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL are defined', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Name are defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    describe('The menu', function() {
        let body, button;

        /* Define variables for our tests */
        beforeAll(function() {
            body = document.querySelector('body');
            button = document.querySelector('a.menu-icon-link');
        });

        /* Make sure our variables containing the
         * body and button elements are defined
         */
        it('body & button are defined', function() {
            expect(body).toBeDefined();
            expect(button).toBeDefined();
        });

        /* Ensure the menu element is
         * hidden by default. 
         */
         it('Hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* Ensure the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu changes visibility when clicked', function() {
            button.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            button.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });

    });

    describe('Initial Entries', function() {

        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         /* Make sure there is an .entry within our .feed */
         it('.feed contains .entry',function() {
            expect(document.querySelector('.feed').firstElementChild.firstElementChild.classList.contains('entry')).toBe(true);
         });

     });

    describe('New Feed Selection', function() {
        /* Variable to hold the textcontent from our first feed read */
        let feed;

        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         beforeAll(function(done) {
            loadFeed(0);
            feed = document.querySelector('.feed').firstElementChild.textContent;
            loadFeed(1, function() {
                done();
            });
         });

        /* Defines another variable to hold the textcontent from
         * our second read from a new feed source. Compare feed
         * and feed2's content to a determine successful feed read
         */
         it('loadFeed content changes', function() {
            let feed2 = document.querySelector('.feed').firstElementChild.textContent;
            expect(feed).toBeDefined();
            expect(feed2).toBeDefined();
            expect(feed != feed2).toBe(true);
         });
     });
}());
