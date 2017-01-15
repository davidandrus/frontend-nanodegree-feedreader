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

    it('should have a url for each feed', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeTruthy();
      });
    });

    it('should have a name defined for each feed', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeTruthy();
      });
    });
  });


  describe('the menu', function() {
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

    it('should hide menu by default', function() {
      expect(body.hasClass(menuHiddenClass)).toBe(true);
    });

    it('should change visiblity when icon is clicked', function() {
      menuLink.trigger('click');
      expect(body.hasClass(menuHiddenClass)).toBe(false);
      menuLink.trigger('click');
      expect(body.hasClass(menuHiddenClass)).toBe(true);
    });
  });

  describe('Initial Entries', function() {

    beforeEach(function() {
      $('.feed').empty();
    });

    it('should load initial entries', function(done) {
      loadFeed(0, function() {
        expect($('.feed .entry-link').length).not.toBe(0);
        done();
      });
    });
  });

  describe('should update content when feed loads', function() {
    var firstItem;
    var entrySelector = '.feed .entry-link:eq(0)';

    beforeEach(function(done) {
      loadFeed(0, function() {
        firstItem = $(entrySelector);
        done();
      });
    });

    it('should update content when new feed is loaded', function(done) {
      loadFeed(1, function() {
        var newFirstItem = $(entrySelector);
        expect(newFirstItem).not.toBe(firstItem);
        done();
      });
    });
  });

}());
