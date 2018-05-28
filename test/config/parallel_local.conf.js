const browserstack = require('browserstack-local');

nightwatch_config = {
  "src_folders": ["test/functional"],
  "output_folder": "test/reports",

  selenium: {
    "start_process": false,
    "host": "hub-cloud.browserstack.com",
    "port": 80
  },

  common_capabilities: {
    'build': 'nightwatch-browserstack',
    'javascriptEnabled': true,
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    'browserstack.debug': true,
    'browserstack.local': true
  },

  test_settings: {
    default: {
      "launch_url": "http://localhost:3000"
    },
    chrome: {
      desiredCapabilities: {
        browser: "chrome"
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: "firefox"
      }
    },
    safari9: {
      desiredCapabilities: {
        os: "OS X",
        os_version: "El Capitan",
        browser: "safari",
        browser_version: "9.1"
      }
    },
    safari: {
      desiredCapabilities: {
        browser: "safari"
      }
    },
    iPhone5: {
      desiredCapabilities: {
        'browserName': 'iPhone',
        'platform': 'MAC',
        'device': 'iPhone 5'
      }
    },
    iPad: {
      desiredCapabilities: {
        'browserName': 'iPad',
        'platform': 'MAC',
        'device': 'iPad Air'
      }
    },
    iPadMini: {
      desiredCapabilities: {
        'browserName': 'iPad',
        'platform': 'MAC',
        'device': 'iPad Mini 4'
      }
    },
    samsungGalaxyS5: {
      desiredCapabilities: {
        'browserName': 'android',
        'platform': 'ANDROID',
        'device': 'Samsung Galaxy S5'
      }
    },
    nexux7: {
      desiredCapabilities: {
        'browserName': 'android',
        'platform': 'ANDROID',
        'device': 'Google Nexus 7'
      }
    },
    kindleFire2: {
      desiredCapabilities: {
        'browserName': 'android',
        'platform': 'ANDROID',
        'device': 'Amazon Kindle Fire 2'
      }
    },
    kindleFireHdx7: {
      desiredCapabilities: {
        'browserName': 'android',
        'platform': 'ANDROID',
        'device': 'Amazon Kindle Fire HDX 7'
      }
    },
    ie8OnWindows7: {
      desiredCapabilities: {
        'os': 'Windows',
        'os_version': '7',
        'browser': 'IE',
        'browser_version': '8.0',
        'resolution': '1024x768'
      }
    },
    ie9OnWindows7: {
      desiredCapabilities: {
        'os': 'Windows',
        'os_version': '7',
        'browser': 'IE',
        'browser_version': '9.0',
        'resolution': '1024x768'
      }
    },
    ie10OnWindows7: {
      desiredCapabilities: {
        'os': 'Windows',
        'os_version': '7',
        'browser': 'IE',
        'browser_version': '10.0',
        'resolution': '1024x768'
      }
    },
    ie11OnWindows7: {
      desiredCapabilities: {
        'os': 'Windows',
        'os_version': '7',
        'browser': 'IE',
        'browser_version': '11.0',
        'resolution': '1024x768'
      }
    }
  }
};

// Code to support common capabilites
for (let i in nightwatch_config.test_settings) {
  const config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for (let j in nightwatch_config.common_capabilities) {
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}
module.exports = nightwatch_config;
