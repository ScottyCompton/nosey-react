import { browserHistory } from 'react-router';
import config from '../config';

export default class Util {
  static isAndroid() {
    return typeof navigator !== 'undefined' ? navigator.userAgent.match(/Android/i) : false;
  }

  static isBlackBerry() {
    return typeof navigator !== 'undefined' ? navigator.userAgent.match(/BlackBerry/i) : false;
  }

  static isIOS() {
    return typeof navigator !== 'undefined' ? navigator.userAgent.match(/iPhone|iPad|iPod/i) : false;
  }

  static isOperaMini() {
    return typeof navigator !== 'undefined' ? navigator.userAgent.match(/Opera Mini/i) : false;
  }

  static isWindowsMobile() {
    return typeof navigator !== 'undefined' ? navigator.userAgent.match(/IEMobile/i) : false;
  }

  static isMobile() {
    return (Util.isAndroid() || Util.isBlackBerry() || Util.isIOS() || Util.isOperaMini() || Util.isWindowsMobile());
  }

  static redirectIfFirstTimeVisitor() {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const lockScreenShown = localStorage.getItem(config.app.lockScreenShown);
      const geoBlock = config.geoBlock;
      const redirectToSplashScreen = geoBlock && (lockScreenShown === null || lockScreenShown !== 'true');
      if (redirectToSplashScreen) {
        browserHistory.push('/welcome');
      }
      return redirectToSplashScreen;
    }

    return false;
  }
}
