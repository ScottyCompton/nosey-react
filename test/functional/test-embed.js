const NOSEY_URL = '/';
const SHORT_PAUSE_PERIOD = 500;
const MEDIUM_PAUSE_PERIOD = 1000;
const DEFAULT_PAUSE_PERIOD = 5000;
const LONG_PAUSE_PERIOD = 8000;
const LONGER_PAUSE_PERIOD = 12000;
const LONGEST_PAUSE_PERIOD = 16000;

module.exports = {
  'The homepage can be loaded': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);
    browser.end();
  },

  'The BROWSE link can be hovered over': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const browseSelector = '#content > div > div.app > div:nth-child(2) > div.nav > div:nth-child(1) > div > button:nth-child(2) > div > span > span';
    browser.waitForElementVisible(browseSelector, MEDIUM_PAUSE_PERIOD, () => {
      if (browser.options.desiredCapabilities.browserName !== 'firefox') {
        browser.moveToElement(browseSelector, 10, 10, () => {
          const browseMenuSelector = '#content > div > div.app > div:nth-child(2) > div.nav > div:nth-child(1) > div > div > div > div > div:nth-child(1) > a > div > span > div > div > div';
          browser.waitForElementVisible(browseMenuSelector, SHORT_PAUSE_PERIOD, () => {
            browser.click(browseMenuSelector)
              .pause(DEFAULT_PAUSE_PERIOD);
            browser.assert.urlEquals(browser.launchUrl + '/watch-at-work-countdown-may-1');
            browser.end();
          }, 'Click New on Nosey.');
        });
      } else {
        browser.end();
      }
    }, 'Show BROWSE menu.');
  },

  'A BROWSE menu item can be clicked': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const browseSelector = '#content > div > div.app > div:nth-child(2) > div.nav > div:nth-child(1) > div > button:nth-child(2) > div > span > span';
    browser.waitForElementVisible(browseSelector, MEDIUM_PAUSE_PERIOD, () => {
      if (browser.options.desiredCapabilities.browserName !== 'firefox') {
        browser.moveToElement(browseSelector, 10, 10, () => {
          const browseMenuSelector = '#content > div > div.app > div:nth-child(2) > div.nav > div:nth-child(1) > div > div > div > div > div:nth-child(2) > a > div > span > div > div > div';
          browser.waitForElementVisible(browseMenuSelector, SHORT_PAUSE_PERIOD, () => {
            browser.click(browseMenuSelector)
              .pause(DEFAULT_PAUSE_PERIOD);
            browser.assert.urlEquals(browser.launchUrl + '/new-on-nosey');
            browser.end();
          }, 'Click feature in menu.');
        });
      } else {
        browser.end();
      }
    }, 'Show BROWSE menu.');
  },

  'The LOGIN link can be clicked': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const loginSelector = '#content > div > div.app > div:nth-child(2) > div.nav > div:nth-child(1) > div > button:nth-child(4) > div > span > span';
    browser.waitForElementVisible(loginSelector, MEDIUM_PAUSE_PERIOD, () => {
      browser.click(loginSelector);

      if (browser.options.desiredCapabilities.browserName !== 'safari') {
        const loginModalSelector = '.auth0-lock-widget-container';
        browser.waitForElementVisible(loginModalSelector, LONGER_PAUSE_PERIOD, () => {
          browser.click('.auth0-lock-close-button');
          browser.end();
        });
      } else {
        browser.end();
      }
    }, 'The Login modal appears.');
  },

  // 'The menu button can be clicked': (browser) => {
  //   browser
  //     .url(browser.launchUrl + NOSEY_URL)
  //     .pause(DEFAULT_PAUSE_PERIOD);
  //
  //   browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);
  //   browser.expect.element('.navMenu').to.not.be.visible;
  //
  //   const menuButtonSelector = '#content > div > div.app > div:nth-child(2) > div.nav > div:nth-child(3) > div > button';
  //   browser.click(menuButtonSelector);
  //   browser.isVisible('.navMenu');
  //   browser.end();
  // },

  'The hero video can be played': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      browser.click(videoMiniButtonSelector);

      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {
          const playerContainerSelector = '#player > div';
          browser.expect.element(playerContainerSelector).to.have.attribute('class').which.contains('vjs-paused');

          const playerSelector = '#player video';
          browser.click(playerSelector)
            .pause(LONGEST_PAUSE_PERIOD);
          browser.expect.element(playerContainerSelector).to.have.attribute('class').which.contains('vjs-paused');

          const playButtonSelector = (browser.options.desiredCapabilities.browserName === 'firefox') ? '#player video' : '.vjs-play-control';
          browser.click(playButtonSelector);

          browser.pause(LONGEST_PAUSE_PERIOD);
          browser.pause(LONGEST_PAUSE_PERIOD);

          browser.expect.element(playerContainerSelector).to.have.attribute('class').which.contains('vjs-playing');

          if (browser.options.desiredCapabilities.browserName !== 'safari') {
            browser.expect.element(playerContainerSelector).to.have.attribute('class').which.contains('vjs-has-started');
          }
          browser.end();
        });
      }, 'The hero video appears.');
    });
  },

  'The player has a more button': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      browser.click(videoMiniButtonSelector);

      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {
          const moreSelector = '#content > div > div.app > div.big-ol-container > div > div.player-area > div.top-controls.row > div:nth-child(1) > div.col-xs-10 > div > div.col-xs-7.col-sm-5 > ul > li:nth-child(3) > button > div';
          browser.expect.element(moreSelector).to.be.present;
          browser.end();
        });
      }, 'The player appears.');
    });
  },

  'The player has a share button': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      browser.click(videoMiniButtonSelector);

      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {
          const shareSelector = '#content > div > div.app > div.big-ol-container > div > div.player-area > div.top-controls.row > div:nth-child(1) > div.col-xs-10 > div > div.col-xs-7.col-sm-5 > ul > li:nth-child(2) > div > div > button > div';
          browser.expect.element(shareSelector).to.be.present;

          browser.click(shareSelector);

          const shareContainer = 'body > div:nth-child(8) > div > div > div > div > div > div:nth-child(1) > span > div';
          browser.waitForElementVisible(shareContainer, DEFAULT_PAUSE_PERIOD, () => {
            browser.end();
          });
        });
      }, 'The player appears.');
    });
  },

  'The player has a comment button': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      browser.click(videoMiniButtonSelector);

      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {
          const commentSelector = '#content > div > div.app > div.big-ol-container > div > div.player-area > div.top-controls.row > div:nth-child(1) > div.col-xs-10 > div > div.col-xs-7.col-sm-5 > ul > li:nth-child(1) > a > div';
          browser.expect.element(commentSelector).to.be.present;
          browser.end();
        });
      }, 'The player appears.');
    });
  },

  'The player has a next button': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      browser.click(videoMiniButtonSelector);

      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {
          const nextSelector = '#content > div > div.app > div.big-ol-container > div > div.player-area > div.top-controls.row > div:nth-child(1) > div:nth-child(3)';
          browser.expect.element(nextSelector).to.be.present;
          browser.end();
        });
      }, 'The player appears.');
    });
  },

  'The first rail is visible': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const firstRailSelector = '#content > div > div.app > div.big-ol-container > div > div';
    browser.waitForElementVisible(firstRailSelector, DEFAULT_PAUSE_PERIOD, () => {
      const railSliderSelector = '#content > div > div.app > div.big-ol-container > div > div > div.rails-container.row > div .slick-track';
      browser.expect(railSliderSelector).to.have.length.gte(10);
      browser.end();
    });
  },

  'There are multiple rails': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const railSlidersSelector = '#content > div > div.app > div.big-ol-container > div > div > div.rails-container.row > div > .rail-slider';
    browser.expect(railSlidersSelector).to.have.length.above(5);
    browser.end();
  },

  'The About Us link can be clicked': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    const aboutUsSelector = '#content > div > div.app > footer > div.row.footer-lower > div:nth-child(1) > a:nth-child(1)';
    browser.expect.element(aboutUsSelector).to.be.present.before(LONG_PAUSE_PERIOD);
    browser.click(aboutUsSelector);
    browser.click(aboutUsSelector);
    browser.pause(LONGEST_PAUSE_PERIOD);
    browser.assert.urlEquals(browser.launchUrl + '/about');
    browser.end();
  },

  'The Terms of Service link can be clicked': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    const tosSelector = '#content > div > div.app > footer > div.row.footer-lower > div:nth-child(1) > a:nth-child(2)';
    browser.expect.element(tosSelector).to.be.present.before(LONG_PAUSE_PERIOD);
    browser.click(tosSelector);
    browser.click(tosSelector);
    browser.pause(LONGEST_PAUSE_PERIOD);
    browser.assert.urlEquals(browser.launchUrl + '/terms-of-service');
    browser.end();
  },

  'The Privacy link can be clicked': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    const privacySelector = '#content > div > div.app > footer > div.row.footer-lower > div:nth-child(1) > a:nth-child(3)';
    browser.expect.element(privacySelector).to.be.present.before(LONG_PAUSE_PERIOD);
    browser.click(privacySelector);
    browser.click(privacySelector);
    browser.pause(LONGEST_PAUSE_PERIOD);
    browser.assert.urlEquals(browser.launchUrl + '/privacy-policy');
    browser.end();
  },

  'The FAQ link can be clicked': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    const faqSelector = '#content > div > div.app > footer > div.row.footer-lower > div:nth-child(1) > a:nth-child(4)';
    browser.expect.element(faqSelector).to.be.present.before(LONG_PAUSE_PERIOD);
    browser.click(faqSelector);
    browser.click(faqSelector);
    browser.pause(LONGEST_PAUSE_PERIOD);
    browser.assert.urlEquals(browser.launchUrl + '/faq');
    browser.end();
  },

  'A feature video page has rails': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {
          const playerContainerSelector = '#player > div';
          browser.expect.element(playerContainerSelector).to.have.attribute('class').which.contains('vjs-paused');

          const leftButtonSelector = '#content > div > div.app > div.big-ol-container > div > div.rails-container.row > div > div:nth-child(1) > div > button.slick-arrow.slick-left-arrow > div > svg';
          browser.expect.element(leftButtonSelector).to.be.present;

          const rightButtonSelector = '#content > div > div.app > div.big-ol-container > div > div.rails-container.row > div > div:nth-child(1) > div > button.slick-arrow.slick-right-arrow > div > svg';
          browser.expect.element(rightButtonSelector).to.be.present;

          const railSlidersSelector = '#content > div > div.app > div.big-ol-container > div > div > div.rails-container.row > div > .rail-slider';
          browser.expect(railSlidersSelector).to.have.length.above(5);
          browser.end();
        });
      }, 'The rails exist.');
    });
  },

  'A feature video page has Facebook comments': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {
          const playerContainerSelector = '#player > div';
          browser.expect.element(playerContainerSelector).to.have.attribute('class').which.contains('vjs-paused');

          browser.expect.element('.fb-comments').to.be.present;
          browser.end();
        });
      }, 'The comments section exist.');
    });
  },

  'The logo can be clicked': (browser) => {
    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element('body').to.be.present.before(MEDIUM_PAUSE_PERIOD);

    const videoMiniButtonSelector = '.heroDots > li:nth-child(1) > button';
    browser.waitForElementVisible(videoMiniButtonSelector, DEFAULT_PAUSE_PERIOD, () => {
      const videoSelector = '#content > div > div.app > div.big-ol-container > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > span > div > div:nth-child(2) > div > div > div > div.watch-now-button > a > div > div > span';
      browser.waitForElementVisible(videoSelector, DEFAULT_PAUSE_PERIOD, () => {
        browser.click(videoSelector);
        browser.waitForElementVisible('#player', LONG_PAUSE_PERIOD, () => {

          const logoSelector = '#content > div > div.app > div:nth-child(2) > div.nav > div:nth-child(1) > div > a';
          browser.click(logoSelector)
            .pause(DEFAULT_PAUSE_PERIOD);
          browser.assert.urlEquals(browser.launchUrl + '/');
          browser.end();
        });
      });
    });
  },

  'The Facebook link is present': (browser) => {
    const facebookLinkSelector = '#content > div > div.app > footer > div.row.footer-lower > div:nth-child(2) > a:nth-child(3)';

    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element(facebookLinkSelector).to.be.present.before(MEDIUM_PAUSE_PERIOD);
  },

  'The Twitter link is present': (browser) => {
    const twitterLinkSelector = '#content > div > div.app > footer > div.row.footer-lower > div:nth-child(2) > a:nth-child(2)';

    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element(twitterLinkSelector).to.be.present.before(MEDIUM_PAUSE_PERIOD);
  },

  'The Instagram link is present': (browser) => {
    const instagramLinkSelector = '#content > div > div.app > footer > div.row.footer-lower > div:nth-child(2) > a:nth-child(1)';

    browser
      .url(browser.launchUrl + NOSEY_URL)
      .pause(DEFAULT_PAUSE_PERIOD);

    browser.expect.element(instagramLinkSelector).to.be.present.before(MEDIUM_PAUSE_PERIOD);
  }
};
