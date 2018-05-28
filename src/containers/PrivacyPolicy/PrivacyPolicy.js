import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { load as loadHomeChannels } from 'redux/modules/home';
import { updateProgressBar } from 'redux/modules/progress';
import Util from '../../helpers/Util';

@connect(state => ({
  progress: state.progress
}), { loadHomeChannels, updateProgressBar })

export default class PrivacyPolicy extends Component {
  static propTypes = {
    updateProgressBar: PropTypes.func.isRequired,
    progress: PropTypes.object
  };

  componentDidMount() {
    this.props.updateProgressBar(100);
  }

  render() {
    // Util.redirectIfFirstTimeVisitor();

    return (
      <div>
        <Helmet
          title="Privacy Policy"
          meta={[
            { name: 'title', content: 'Privacy Policy | Nosey - TV Shows Online' },
            { property: 'og:title', content: 'Privacy Policy | Nosey - TV Shows Online' },
          ]}
          link={[{rel: 'canonical', content: 'https://www.nosey.com/privacy-policy'}]}
        />
        <div className="container basic-text">
          <div className="row">
            <div className="col-xs-1"></div>
            <div className="col-xs-10">
              <div className="row">
                <div className="col-xs-12"><h1>PRIVACY POLICY FOR BETA VERSION OF NOSEY</h1></div>
              </div>
              <div className="row">
                <div className="col-xs-12"><strong>Effective as of February 2017</strong></div>
              </div>
              <div className="row">
                <div className="col-xs-12">We at Nosey Baxter, LLC ("<u>Nosey</u>," "<u>we</u>," "<u>us</u>," or "
                  <u>our</u>") have created this privacy policy (this "<u>Privacy Policy</u>") because we know that you care
                  about how information you provide to us is used and shared. This Privacy Policy relates to the information
                  collection and use practices of Nosey in connection with our online services(currently in beta form),
                  which are made available to you through a variety of platforms, including, but not limited to,
                  https://nosey.com (the " <u>Website</u>") and our app, which is accessible through a variety of connected
                  devices, such as gaming systems, smart TVs, mobile devices, and set top boxes (the "<u>App</u>"). The
                  Website and the App are collectively referred to as the "<u>Platform.</u>"
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>Acceptance of Terms</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">By visiting our Platform, you are agreeing to the terms of this Privacy Policy
                  and the accompanying Terms of Use. Capitalized terms not defined in this Privacy Policy shall have the
                  meaning set forth in the Terms of Use.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>The Information We Collect and/or Receive</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">In the course of operating the Platform and/or interacting with you, Nosey will
                  collect (and/or receive) the following types of information. You authorize us to collect and/or receive
                  such information.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>1. <u>Personal Information</u></h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">If you elect to register with us, you will be required to provide us with
                  personal information about yourself, such as your name and e-mail address. If you would prefer, you may
                  elect to log in to the Platform using Facebook Connect or similar logins. You may also choose to provide
                  us additional personal information voluntarily, such as by sending us an e-mail or interacting with us via
                  our social media pages, such as through Facebook. Any such social media platforms are operated by the
                  social networks themselves and are subject to their terms of use and privacy policies. If you use such
                  third-party social media platforms or log in using any third-party access credentials, you are authorizing
                  Nosey to collect, store, and use, in accordance with this Privacy Policy, any and all information that you
                  agreed that Facebook or such other third parties could provide to us through their application programming
                  interface ("<u>API</u> "). Such information may include, without limitation, your first and last name,
                  Facebook username, Facebook profile picture, unique Facebook identifier and access token, and e-mail
                  address. All information we collect and/or receive under this section is collectively called " <u>Personal
                    Information</u>."
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>2. <u>Geolocational Information</u></h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Certain features and functionalities of the Platform are based on your location.
                  In order to provide these features and functionalities while you are using a mobile device, we may, with
                  your consent, automatically collect geolocational information from your mobile device or wireless carrier
                  and/or certain third-party service providers. Such information is collectively called the "<u>Geolocational
                    Information.</u>" Collection of such Geolocational Information occurs only when the Platform is running
                  on your mobile device. You may decline to allow us to collect such Geolocational Information, in which
                  case Nosey will not be able to provide certain features or functionalities to you.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>3. <u>Other Information.</u></h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">In addition to the Personal Information and the Geolocational Information, we may
                  automatically collect or receive additional information regarding you and your use of our Platform, your
                  interactions with us and our advertising, as well as information regarding your computer or other devices
                  used to access our Platform (collectively, the " <u>Other Information</u>"). Such Other Information may
                  include:
                </div>
              </div>
              <div className="row">
                <div className="col-xs-1"></div>
                <div className="col-xs-11">

                  <div className="row">
                    <div className="col-xs-12">a. <u>From Your Activity</u></div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <ul>
                        <li>IP address, which may consist of a static or dynamic IP address and will sometimes point to a specific
                          identifiable computer or device;
                        </li>
                        <li>Browser type and language;</li>
                        <li>Referring and exit pages and URLs;</li>
                        <li>Date and time;</li>
                        <li>Details regarding your activity on the Platform, such as title selections, watch history, search
                          queries, amount of time spent watching particular titles, and other performance and usage data.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">b. <u>About Your Device</u></div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <ul>
                        <li>Type of device;</li>
                        <li>Advertising Identifier ("<u>IDFA</u>" or "<u>AdID</u>");</li>
                        <li>Operating system and version (e.g., iOS, Android or Windows);</li>
                        <li>Carrier;</li>
                        <li>Geo-location; and</li>
                        <li>Network type (WiFi, 3G, 4G, LTE).</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                  <div className="row">
                    <div className="col-xs-12">c. <u>From Cookies</u></div>
                  </div>
                  <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                  <div className="row">
                    <div className="col-xs-12">We may use both session cookies, which expire once you close your web browser,
                      and persistent cookies, which stay on your computer until you delete them and other technologies to help
                      us collect data and to enhance your experience with the Platform. Cookies are small text files a website
                      can use to recognize a repeat visitor to the website. We may use cookies for various purposes, including
                      to:
                      <ul>
                        <li>authenticate users;</li>
                        <li>personalize your experience;</li>
                        <li>analyze which portions of the Platform or titles are visited and played most frequently; and</li>
                        <li>measure and optimize advertising and promotional effectiveness.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">If you do not want Nosey to deploy cookies in your browser, you can opt out by
                      setting your browser to reject cookies or to notify you when a website tries to put a cookie in your
                      browser software. If you choose to disable cookies in your browser, you can still use the Platform and
                      play the titles, although your ability to use some of the features may be affected.
                    </div>
                  </div>
                  <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                  <div className="row">
                    <div className="col-xs-12">d. <u>Third-Party Analytics</u></div>
                  </div>
                  <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                  <div className="row">
                    <div className="col-xs-12">We, the Platform, and the third-party technology providers, ad exchanges, ad
                      networks, advertisers, agencies, ad exchanges, and ad servers with which we work use third-party analytics
                      services (such as Google Analytics) to evaluate your use of the Platform, compile reports on activity,
                      collect demographic data, analyze performance metrics, and collect and evaluate other information relating
                      to the Platform and mobile and Internet usage. These third parties use cookies and other technologies to
                      help analyze and provide us the data. You consent to the processing of data about you by these analytics
                      providers in the manner and for the purposes set out in this Privacy Policy.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">For more information on these third parties, including how to opt out from
                      certain data collection, please visit the sites below. Please be advised that if you opt out of any
                      service, you may not be able to use the full functionality of the Platform.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">For Google Analytics, please visit <a href="https://www.google.com/analytics">
                      https://www.google.com/analytics </a></div>
                  </div>
                  <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                  <div className="row">
                    <div className="col-xs-12">e. <u>From You</u>.</div>
                  </div>
                  <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                  <div className="row">
                    <div className="col-xs-12">Additional information that you voluntarily provide to us (either directly or via
                      our social media pages), such as ratings of titles and other information that does not identify you
                      personally.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>The Information Collected by or Through Third-Party Advertising
                  Companies</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">We may share Other Information about you with third parties for ad distribution
                  and ad optimization (defined as the tailoring, targeting (i.e., behavioral, contextual, and retargeting),
                  analyzing, managing, reporting, and optimizing of ads). These third parties may use cookies, pixel tags
                  (also called web beacons or clear gifs), and/or other technologies to collect Other Information for such
                  purposes. Pixel tags enable us and these third-party advertising companies to recognize a browser's cookie
                  when a browser visits the site on which the pixel tag is located in order to learn which advertisement
                  brings a user to a given site. In addition, we may receive Other Information from advertisers and/or their
                  service providers such as advertising identifiers, IP addresses, and post-conversion data.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">Neither we nor any third party acting on our behalf employs behavioral
                  advertising or retargeting in connection with users whom we know to be under 13 years old.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>How to Opt Out of Third-Party Interest-Based Advertising</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">If you wish to opt out of third-party interest-based advertising, please visit <a
                  href="http://www.networkadvertising.org"> http://www.networkadvertising.org</a> and <a
                  href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices</a> for details on how to do so.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">Additionally, users of mobile devices can follow the below instructions:</div>
              </div>
              <div className="row">
                <div className="col-xs-12"><u>Android Users</u></div>
              </div>
              <div className="row">
                <div className="col-xs-12">For Android devices with OS 2.2 and up and Google Play Services version 4.0 and
                  up:
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">Open your Google Settings app &gt; Ads &gt; Enable "Opt out of interest-based
                  advertising."
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><u>iOS Users</u></div>
              </div>
              <div className="row">
                <div className="col-xs-12">iOS 7 or Higher</div>
              </div>
              <div className="row">
                <div className="col-xs-12">Go to your Settings &gt; Select Privacy &gt; Select Advertising &gt; Enable the
                  "Limit Ad Tracking" setting.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">iOS 6</div>
              </div>
              <div className="row">
                <div className="col-xs-12">Go to your Settings &gt;Select General &gt; Select About &gt; Select
                  Advertising &gt; Enable the "Limit Ads Tracking" setting. <h4></h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>How the Information is Used and Shared </h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">You authorize us to use the Personal Information, the Geolocational Information,
                  and the Other Information (collectively, the " <u>Information</u>") to provide and improve our Platform
                  and services; to administer our contests, sweepstakes, rewards, and other promotional programs; to solicit
                  your feedback; to inform you about our products and services and those of our promotional partners and
                  participating organizations; and for ad optimization.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">You also authorize us to use and/or share Information as described below.</div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <ul>
                    <li>We will use the Information to determine your general geographic location to determine if you are
                      eligible to use the Platform.
                    </li>
                    <li>We may share Information with our content licensors. However, to the extent required by law, you
                      will be given the opportunity to opt out of such sharing. Likewise, we may receive information from
                      such content licensors to offer you special items or services.
                    </li>
                    <li>We may, from time to time, share and/or license Information to other companies who may provide you
                      information about the products and services they or their partners offer. However, to the extent
                      required by law, you will be given the opportunity to opt out of such sharing.
                    </li>
                    <li>We may employ other companies and individuals to perform functions on our behalf. Examples may
                      include providing technical assistance, customer service, marketing assistance, and administration of
                      our rewards and promotional programs. These other companies will have access to the Information only
                      as necessary to perform their functions and to the extent permitted by law.
                    </li>
                    <li>In an ongoing effort to better understand our users, the Platform, our titles, and the products and
                      services of Nosey and our promotional partners, we may analyze certain Geolocational Information and
                      Other Information in anonymized and aggregate form in order to operate, maintain, manage, and improve
                      the Platform and/or such products and services. This aggregate information does not identify you
                      personally. We may share and/or license this aggregate data to our affiliates, agents, business and
                      promotional partners, and other third parties. We may also disclose aggregated user statistics in
                      order to describe the Platform and these products and services to current and prospective business
                      partners and investors and to other third parties for other lawful purposes.
                    </li>
                    <li>In order to provide our Services and administer our contests, sweepstakes, rewards, and other
                      promotional programs, we may share your Information with our third-party promotional and marketing
                      partners, including, without limitation, businesses participating in our various programs.
                    </li>
                    <li>With your permission, third-party applications or services may access your Personal Information. We
                      use standard OAuth (open authorization) to enable you to give permission to share your Personal
                      Information with other websites and services, such as Facebook (e.g., when you agree to a pop-up
                      requesting you to allow another application to access your account information). We also use OAuth to
                      allow us to share information about you that is stored by us without sharing your security
                      credentials.
                    </li>
                    <li>We may share some or all of your Information with any of our parent companies, subsidiaries, joint
                      ventures, or other companies under common control with us.
                    </li>
                    <li>As we develop our businesses, we might sell or buy businesses or assets. In the event of a corporate
                      sale, merger, reorganization, sale of assets, dissolution, or similar event, the Information may be
                      part of the transferred assets.
                    </li>
                    <li>To the extent permitted by law, we may also disclose the Information: (i) when required by law,
                      court order, or other government or law enforcement authority or regulatory agency; or (ii) whenever
                      we believe that disclosing such Information is necessary or advisable, for example, to protect the
                      rights, property, or safety of Nosey or others.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>Accessing and Modifying Information and Communication Preferences</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">If you have provided us any Personal Information, you may access, remove, review,
                  and/or make changes to the same by contacting us as set forth below. In addition, you may manage your
                  receipt of marketing and non-transactional communications by clicking on the "unsubscribe" link located on
                  the bottom of any Nosey marketing e-mail. We will use commercially reasonable efforts to process such
                  requests in a timely manner. You should be aware, however, that it is not always possible to completely
                  remove or modify information in our subscription databases. You cannot opt out of receiving transactional
                  e-mails related to the Platform (e.g., requests for support).
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>How We Protect Your Information</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">We take commercially reasonable steps to protect the Information from loss,
                  misuse, and unauthorized access, disclosure, alteration, or destruction. Please understand, however, that
                  no security system is impenetrable. We cannot guarantee the security of our databases or the databases of
                  the third parties with which we may share such Information, nor can we guarantee that the Information you
                  supply will not be intercepted while being transmitted over the Internet. In particular, e-mail sent to us
                  may not be secure, and you should therefore take special care in deciding what information you send to us
                  via e-mail.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>Important Notices to Non-U.S. Residents</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">The Platform and its servers are operated in the United States and elsewhere.
                  Please be aware that your Information, including your Personal Information, may be transferred to,
                  processed, maintained, and used on computers, servers, and systems located outside of your state,
                  province, country, or other governmental jurisdiction where the privacy laws may not be as protective as
                  those in your jurisdiction. As noted in our Terms of Use, you must be located in the United States or
                  Canada to use the Platform. If you are located outside the United States and choose to use the Platform,
                  you hereby irrevocably and unconditionally consent to such transfer, processing, and use in the United
                  States and elsewhere.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>External Websites</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">The Platform may contain links to third-party websites. Nosey has no control over
                  the privacy practices or the content of these websites. As such, we are not responsible for the content or
                  the privacy policies of those third-party websites. You should check the applicable third-party privacy
                  policy and terms of use when visiting any other websites.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>Children </h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">The Platform is not directed to children under the age of 13. Nosey adheres to
                  the Children's Online Privacy Protection Act ("<u>COPPA</u>") and will not knowingly collect Personal
                  Information from any child under the age of 13. We ask that minors (under the age of 13) not submit any
                  Personal Information to us. If you are under the age of 13, you may use the Platform only with the consent
                  of your parent or guardian.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">If a child under the age of 13 has provided us with Personal Information, a
                  parent or guardian of that child may contact us and request that such information be deleted from our
                  records.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>California Residents</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Under California Civil Code Section 1798.83, California residents who have an
                  established business relationship with Nosey may choose to opt out of our sharing your Personal
                  Information with third parties for direct marketing purposes. If you are a California resident and (1) you
                  wish to opt out; or (2) you wish to request certain information regarding our disclosure of your Personal
                  Information to third parties for the direct marketing purposes, please send an e-mail to support@nosey.com
                  with "Privacy Policy" in the subject line or write to us at:
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  Nosey Baxter, LLC<br />
                  655 Third Avenue<br />
                  19<sup>th</sup> Floor<br />
                  New York, New York 10017<br />
                  Attention: Privacy Policy
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">In addition, Nosey does not monitor, recognize, or honor any opt-out or do not
                  track mechanisms, including general web browser "Do Not Track" settings and/or signals. For instructions
                  on how to opt out of third-party interest-based advertising, please see "How to Opt Out of Third-Party
                  Interest-Based Advertising" above.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>Changes to This Privacy Policy</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">This Privacy Policy is effective as of the date stated at the top of this Privacy
                  Policy. We may change this Privacy Policy from time to time. Any such changes will be posted on the
                  Platform. By accessing the Platformafter we make any such changes to this Privacy Policy, you are deemed
                  to have accepted such changes. Please be aware that, to the extent permittedby applicable law, our use of
                  the Information is governed by the PrivacyPolicy in effect at the time we collect the Information. Please
                  refer back
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>How to Contact Us</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">If you have questions about this Privacy Policy, please e-mail us at <a
                  href="mailto:support@nosey.com">support@nosey.com</a> with "Privacy Policy" in the subject line.
                </div>
              </div>

            </div>
            <div className="col-xs-1"></div>
          </div>
        </div>
      </div>
    );
  }
}
