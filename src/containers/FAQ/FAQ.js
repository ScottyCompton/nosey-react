import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { updateProgressBar } from 'redux/modules/progress';
import Util from '../../helpers/Util';
import Scrollchor from 'react-scrollchor';

@connect(state => ({
  progress: state.progress
}), { updateProgressBar })

export default class FAQ extends Component {
  static propTypes = {
    updateProgressBar: PropTypes.func.isRequired,
    progress: PropTypes.object
  };

  componentDidMount() {
    this.props.updateProgressBar(100);

    // Offset all anchors by -60 to account for a fixed header
    // and scroll more quickly than the default 400ms
    configureAnchors({offset: -80, keepLastAnchorHash: false});
  }

  render() {
    const style = require('./FAQ.less');
    // Util.redirectIfFirstTimeVisitor();

    return (
      <div className="container faq">
        <Helmet
          title="Frequently Asked Questions"
          meta={[
            { name: 'title', content: 'Frequently Asked Questions | Nosey - TV Shows Online' },
            { property: 'og:title', content: 'Frequently Asked Questions | Nosey - TV Shows Online' },
          ]}
          link={[{rel: 'canonical', content: 'https://www.nosey.com/faq'}]}
        />

        <h1>FREQUENTLY-ASKED QUESTIONS</h1>

        {/* Table of contents */}
        <div className="row contentsTable">
          <ul>
            <li><h2>GENERAL</h2></li>
            <li><Scrollchor to="#question1" animate={{offset: -80}}>What is Nosey?</Scrollchor></li>
            <li><Scrollchor to="#question2" animate={{offset: -80}}>What platforms is Nosey available on?</Scrollchor></li>
            <li><Scrollchor to="#question3" animate={{offset: -80}}>Is Nosey free to download?</Scrollchor></li>
            <li><Scrollchor to="#question4" animate={{offset: -80}}>Where can I download Nosey from?</Scrollchor></li>
            <li><Scrollchor to="#question5" animate={{offset: -80}}>I’ve downloaded Nosey to my device. How do I watch episodes?</Scrollchor></li>
            <li><Scrollchor to="#question6" animate={{offset: -80}}>Which software versions are compatible with Nosey?</Scrollchor></li>
            <li><h2>YOUR NOSEY ACCOUNT</h2></li>
            <li><Scrollchor to="#question7" animate={{offset: -80}}>Do I need an account to access the content?</Scrollchor></li>
            <li><Scrollchor to="#question8" animate={{offset: -80}}>Where do I sign in on the Nosey app or website?</Scrollchor></li>
            <li><Scrollchor to="#question9" animate={{offset: -80}}>Oh no! I can’t remember my Nosey account password!</Scrollchor></li>
            <li><h2>OUR SHOWS</h2></li>
            <li><Scrollchor to="#question10" animate={{offset: -80}}>What’s the selection like?</Scrollchor></li>
            <li><Scrollchor to="#question11" animate={{offset: -80}}>I’m looking for a specific episode of a series on Nosey, but it’s not there…</Scrollchor></li>
            <li><Scrollchor to="#question12" animate={{offset: -80}}>How often do you change up your content on Nosey?</Scrollchor></li>
            <li><Scrollchor to="#question13" animate={{offset: -80}}>There are so many ads on Nosey! How can I turn them off?</Scrollchor></li>
            <li><Scrollchor to="#question14" animate={{offset: -80}}>I’m trying to get in touch with one of the shows that is on Nosey. Can you help me?</Scrollchor></li>
            <li><h2>RESTRICTION</h2></li>
            <li><Scrollchor to="#question15" animate={{offset: -80}}>I keep getting a geoblocking message when I try to watch episodes.</Scrollchor></li>
            <li><Scrollchor to="#question16" animate={{offset: -80}}>Is Nosey available outside of the United States?</Scrollchor></li>
            <li><Scrollchor to="#question17" animate={{offset: -80}}>Nosey isn’t available in my region. When will it be available in my region?</Scrollchor></li>
            <li><h2>COMMON TECHNICAL INQUIRIES</h2></li>
            <li><Scrollchor to="#question18" animate={{offset: -80}}>How do I search for content?</Scrollchor></li>
            <li><Scrollchor to="#question19" animate={{offset: -80}}>How fast does my Internet need to be?</Scrollchor></li>
            <li><Scrollchor to="#question20" animate={{offset: -80}}>What happens if my video isn’t loading?</Scrollchor></li>
            <li><Scrollchor to="#question21" animate={{offset: -80}}>What does “Buffering” mean?</Scrollchor></li>
            <li><Scrollchor to="#question22" animate={{offset: -80}}>What do I do if closed captioning is not loading?</Scrollchor></li>
            <li><Scrollchor to="#question23" animate={{offset: -80}}>How do I comment on a video that I am watching?</Scrollchor></li>
            <li><Scrollchor to="#question24" animate={{offset: -80}}>How can I watch Nosey on my TV?</Scrollchor></li>
            <li><Scrollchor to="#question25" animate={{offset: -80}}>I just started to watch an episode, but it is not appearing in the “Continue Watching” section. What's going on?</Scrollchor></li>
            <li><Scrollchor to="#question26" animate={{offset: -80}}>Can I see a full list of every episode I’ve ever watched on Nosey?</Scrollchor></li>
            <li><Scrollchor to="#question27" animate={{offset: -80}}>How can I learn more about Nosey?</Scrollchor></li>
            <li><Scrollchor to="#question28" animate={{offset: -80}}>I received an e-newsletter from Nosey, but I don’t remember subscribing to this…</Scrollchor></li>
            <li><h2>LEARN MORE ABOUT NOSEY / GET NOSEY-ER</h2></li>
            <li><Scrollchor to="#question29" animate={{offset: -80}}>How do I contact Nosey?</Scrollchor></li>
          </ul>
        </div>
        <div className="row col-xs-12"><p style={{paddingTop: "5%"}}>&nbsp;</p></div>
        {/* Contents */}
        <div className="row col-xs-12" id={'question1'}><h4>What is Nosey?</h4></div>
        <div className="row col-xs-12">
          Instantly watch free TV shows and movies from your desktop, mobile device, or Roku platform! <br/><br/>
          Nosey is the FREE TV app with full episodes of Maury Povich, Jerry Springer, Steve Wilkos, Paternity Court, Cheaters, Match Game, Family Feud and much more!<br/><br/>
          Get Nosey and get 24/7 free streaming TV. Always free, all the time.
        </div>

        <div className="row col-xs-12" id={'question2'}><h4>What platforms is Nosey available on?</h4></div>
        <div className="row col-xs-12">
            Nosey is available on the Web, Android, iOS, and Roku.
        </div>

        <div className="row col-xs-12" id={'question3'}><h4>Is Nosey free to download and use?</h4></div>
        <div className="row col-xs-12">
          Yes. Nosey is 100% free to download and use. Nosey is ad-supported to provide a premium experience to you for free. Enjoy all the content you love without paying for it!<br/><br/>
          iOS Users: On the iOS App Store, you might be prompted to “Buy” Nosey before downloading, but your Apple ID account will not be billed for the download.
        </div>

        <div className="row col-xs-12" id={'question4'}><h4>Where can I download Nosey from?</h4></div>
        <div className="row col-xs-12">
          You can download Nosey for the following platforms here:<br/><br/>

          <a href="https://www.nosey.com">Web</a><br/>
          <a href="https://play.google.com/store/apps/details?id=com.dotstudioz.dotstudioPRO.nosey&hl=en">Google Play Store</a><br/>
          <a href="https://itunes.apple.com/us/app/nosey-watch-full-tv-episodes-tv-shows/id1190636061?mt=8">iOS Store</a><br/>
          <a href="https://channelstore.roku.com/details/143535/nosey">Roku</a>
        </div>

        <div className="row col-xs-12" id={'question5'}><h4>I’ve downloaded Nosey to my device. How do I watch episodes?</h4></div>
        <div className="row col-xs-12">
          After downloading Nosey to your device, navigate back to your Home Screen. Select the Nosey icon and wait for the app to open. Select episodes to watch based on your favorite series, search results, or genre.
        </div>

        <div className="row col-xs-12" id={'question6'}><h4>Which software versions are compatible with Nosey?</h4></div>
        <div className="row col-xs-12">
          Nosey is supported on: <br/><br/>
          	iOS - Requires iOS 9.0 or later.<br/>
          	Android - Requires Android 4.2 and later.<br/>
          	Roku - Latest version of the Roku OS.<br/>
          	Google Chrome - At least 50.0*<br/>
          	Safari - Safari 10.0 and later.*<br/>
          	Mozilla Firefox - At least 48.0.*<br/>
          	Internet Explorer - IE 10 and later.*<br/><br/>
          *These are all for the optimal user experience.

        </div>

        <div className="row col-xs-12" id={'question7'}><h4>Do I need an account to access the content?</h4></div>
        <div className="row col-xs-12">
          No account is needed to access Nosey. You may sign up for a FREE account for an enhanced user experience with the ability to Continue Watching episodes. Enjoy Nosey from any computer through a web browser by going to www.nosey.com or by downloading the app on a iOS, Android, Apple TV or Roku device.
        </div>

        <div className="row col-xs-12" id={'question8'}><h4>Where do I sign in on the Nosey app or website?</h4></div>
        <div className="row col-xs-12">
          If you are using a tablet or mobile device, open the app and navigate inside the “Settings” tab. Click on the “Log In” button and enter in your login credentials.<br/><br/>
          If you are on a web browser, click on “Log In” located on the top left corner. Click on the “Sign Up” tab and enter a valid email address and select a password.<br/><br/>
          If you are using Roku TV, then you do not need to log in. Roku will automatically track your watched history.
        </div>

        <div className="row col-xs-12" id={'question9'}><h4>Oh no! I can’t remember my Nosey account password!</h4></div>
        <div className="row col-xs-12">
          Select “Log In” and click on “Reset Password.” You should receive a reset password email shortly after. (Check your Spam folder in case your reset password does not arrive in your inbox.)
        </div>

        <div className="row col-xs-12" id={'question10'}><h4>What’s the selection like?</h4></div>
        <div className="row col-xs-12">
          Nosey content ranges from Talk shows to Court shows. We are constantly sourcing and adding new material to better cater to our user’s interests. If you have any tips or suggestions, email them to Support@nosey.com
        </div>

        <div className="row col-xs-12" id={'question11'}><h4>I’m looking for a specific episode of a series on Nosey, but it’s not there…</h4></div>
        <div className="row col-xs-12">
          Email us at Support@nosey.com - we are happy to look for the episode(s) of interest. If we do not have it in our library yet, then we will gladly add it to our content suggestions!
        </div>

        <div className="row col-xs-12" id={'question12'}><h4>How often do you change up your content on Nosey?</h4></div>
        <div className="row col-xs-12">
          We add new episodes every week and refresh hand-picked Weekend Top 10 and Watch at Work Countdown playlists! On top of that, we also roll out themed holiday playlists!
        </div>

        <div className="row col-xs-12" id={'question13'}><h4>How do I turn off the ads on Nosey?</h4></div>
        <div className="row col-xs-12">
          Nosey is ad-supported to provide a premium experience to you - for free!
        </div>

        <div className="row col-xs-12" id={'question14'}><h4>I’m trying to get in touch with one of the shows that is on Nosey. Can you help me?</h4></div>
        <div className="row col-xs-12">
          Please reach out to the specific show through their main website or social media pages.
        </div>

        <div className="row col-xs-12" id={'question15'}><h4>I keep getting a geoblocking message when I try to watch episodes.</h4></div>
        <div className="row col-xs-12">
          If you are in the United States and receive this message, please send an email to support@nosey.com with “Geoblocking” in the subject line. If you’d like to help us troubleshoot, go to http://whatismyipaddress.com/ and include your IP address in your email to Support!  Also, be careful you’re not using a VPN that obscures your device’s geographical location with the server’s location.
        </div>

        <div className="row col-xs-12" id={'question16'}><h4>Is Nosey available outside of the United States?</h4></div>
        <div className="row col-xs-12">
          No. It is currently available only in the United States
        </div>

        <div className="row col-xs-12" id={'question17'}><h4>Nosey isn’t available in my region. When will it be available in my region?</h4></div>
        <div className="row col-xs-12">
          We’re only available in the United States, but we love hearing from our fans within and beyond the States - it’ll give us a better idea about where you’d like to see Nosey next! Send us an email at Support@Nosey.com to let us know!
        </div>

        <div className="row col-xs-12" id={'question18'}><h4>How do I search for content?</h4></div>
        <div className="row col-xs-12">
          <b>Website:</b> The top left side is a hamburger menu icon that breaks down the content by genre. The top right side of the homepage you will see a white search bar icon. Type in the show title, episode name or description of what type of content you’re looking for and you will be taken to a results page.<br/>
          <b>Phone App + Tablets:</b> Tap on the search icon in the upper right-hand corner within the browse view to browse the different genres and sections of the site.<br/>
          <b>Roku:</b> Navigate to the top of the Nosey Roku app to find the different genres on the site. There you will also find a search feature.
        </div>

        <div className="row col-xs-12" id={'question19'}><h4>How fast does my Internet need to be?</h4></div>
        <div className="row col-xs-12">
          The minimum recommended internet speed for a smooth playback experience is 1.5 Mbps.
        </div>

        <div className="row col-xs-12" id={'question20'}><h4>What happens if my video isn’t loading?</h4></div>
        <div className="row col-xs-12">
          We recommend refreshing the page and disconnecting then reconnecting your Internet connection.  If that still does not work, consider connecting your computer directly to your modem or restarting your home network.
        </div>

        <div className="row col-xs-12" id={'question21'}><h4>What does “Buffering” mean?</h4></div>
        <div className="row col-xs-12">
          Buffering is when the video player is attempting to connect with the server to continue to play a video. This typically happens due to having a poor internet connection (slow or spotty). Generally plugging your device directly into a wired internet or obtaining a faster internet connection will help reduce buffering.
        </div>

        <div className="row col-xs-12" id={'question22'}><h4>What do I do if closed captioning is not loading?</h4></div>
        <div className="row col-xs-12">
          Make sure that the correct selection in Closed Captioning (CC) is selected (English). If everything is correct and you still don’t see closed captioning, please contact Support@Nosey.com and mention which episode and on what device you are having this closed captioning problem with.
        </div>

        <div className="row col-xs-12" id={'question23'}><h4>How do I comment on a video that I am watching?</h4></div>
        <div className="row col-xs-12">
          This feature is only available on our website. Please log in to your Facebook account in order to comment on videos
        </div>

        <div className="row col-xs-12" id={'question24'}><h4>How can I watch Nosey on my TV?</h4></div>
        <div className="row col-xs-12">
          The Nosey app is currently available on Roku TV. Click on their icons at the bottom of this page to download them.<br/>
          If you do not have Roku, you are able to cast Nosey to a smart TV using either AirPlay (iOS with an AppleTV) or enabling the Casting feature on Android. Select an episode and click on the casting button and select your smart TV from the Device List.<br/>
          Nosey is currently not supported on ChromeCast, but stay tuned for its release announcement!
        </div>

        <div className="row col-xs-12" id={'question25'}><h4>I just started to watch an episode, but it is not appearing in the “Continue Watching” section. What’s going on?</h4></div>
        <div className="row col-xs-12">
          First, double check to see if you are logged in to your Nosey account. If you are, then close and re-open Nosey. (Android users can pull down the Browse page to refresh.) The episode should be in the “Continue Watching” section. Videos will save to your “Continue Watching” section after you watch the first 6 seconds.
        </div>

        <div className="row col-xs-12" id={'question26'}><h4>Can I see a full list of every episode I’ve ever watched on Nosey?</h4></div>
        <div className="row col-xs-12">
          No, you currently cannot see a full list of every episode you’ve ever watched or started to watch, but head over to the “Continue Watching” section after you log in to your Nosey account.
        </div>

        <div className="row col-xs-12" id={'question27'}><h4>How can I learn more about Nosey?</h4></div>
        <div className="row col-xs-12">
          Follow us on social media to join the community and to get up to date information on the hottest shows.<br/>
          <a href="https://www.facebook.com/GetNosey/">Facebook</a>
          <a href="https://twitter.com/getnosey">Twitter</a>
        </div>

        <div className="row col-xs-12" id={'question28'}><h4>I received an e-newsletter from Nosey, but I don’t remember subscribing to this…</h4></div>
        <div className="row col-xs-12">
          You might have signed up for a Nosey account for our enhanced features or submitted your email address when our website was still in the making. If you do not want to receive email updates from us, you can always hit “Unsubscribe” at the bottom of the email message.
        </div>

        <div className="row col-xs-12" id={'question29'}><h4>How do I contact Nosey?</h4></div>
        <div className="row col-xs-12">
          You can click the Contact Us option in Settings (On mobile) or you can directly send an email to: support@nosey.com. Feel free to email us any questions, comments, or general feedback. We will try to respond as soon as possible. We’d love to hear from you!
        </div>
      </div>
    );
  }
}
