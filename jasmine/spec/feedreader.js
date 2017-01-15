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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a url for each feed', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeTruthy();
          });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name defined for each feed', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.name).toBeTruthy();
          });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('the menu', function(){
        var menu;
        var menuLink;
        var body;
        var intiialClass;
        var initialClassDefined = false;
        var menuHiddenClass = 'menu-hidden';

        beforeEach(function() {
          body = $('body');
          menu = $('slide-menu');
          menuLink = $('.menu-icon-link');
          initialClass = initialClassDefined ? initialClass : body.attr('class');
          initialClassDefined = true;
        });

        afterEach(function() {
          body.attr('class', initialClass);
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should hide menu by default', function() {
          expect(body.hasClass(menuHiddenClass)).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
        */
        it('should change visiblity when icon is clicked', function() {
          menuLink.trigger('click');
          expect(body.hasClass(menuHiddenClass)).toBe(false);
          menuLink.trigger('click');
          expect(body.hasClass(menuHiddenClass)).toBe(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

      beforeEach(function() {
        $('.feed').empty();
      });

      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */

      it('should load initial entries', function(done) {
        loadFeed(0, function() {
          expect($('.feed .entry-link').length).not.toBe(0);
          done();
        });
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('should update content when feed loads', function() {
      var firstItem;
      var entrySelector = '.feed .entry-link:eq(0)';

      beforeEach(function(done) {
        loadFeed(0, function() {
          firstItem = $(entrySelector);
          done();
        });
      });

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it('should update content when new feed is loaded', function(done) {
        loadFeed(1, function() {
          var newFirstItem = $(entrySelector);
          expect(newFirstItem).not.toBe(firstItem);
          done();
        });
      });
    })


}());
