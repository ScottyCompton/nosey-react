import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { updateProgressBar } from 'redux/modules/progress';
import Util from '../../helpers/Util';

@connect(state => ({
  progress: state.progress
}), { updateProgressBar })

export default class TermsOfService extends Component {
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
          title="Terms Of Service"
          meta={[
            { name: 'title', content: 'Terms Of Service | Nosey - TV Shows Online' },
            { property: 'og:title', content: 'Terms Of Service | Nosey - TV Shows Online' },
          ]}
          link={[{rel: 'canonical', content: 'https://www.nosey.com/terms-of-service'}]}
        />
        <div className="container basic-text">
          <div className="row">
            <div className="col-xs-1"></div>
            <div className="col-xs-10">
              <div className="row">
                <div className="col-xs-12"><h1>TERMS OF USE FOR BETA VERSION OF NOSEY</h1></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Nosey Baxter, LLC ("<u>Nosey</u>," "<u>we</u>," "<u>us</u>," or "<u>our</u>")
                  welcomes you. We provide you access to the Platform subject to the following Terms of Use, which may
                  be updated by us from time to time without notice to you. By accessing the Platform, you acknowledge
                  that you have read, understood, and agree to be legally bound by these Terms of Use and our Privacy
                  Policy, which is hereby incorporated by reference (collectively, this "<u>Agreement</u>"). If you do
                  not agree to any of these terms, then please do not use the Platform.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">THE SECTIONS BELOW TITLED "BINDING ARBITRATION" AND "CLASS ACTION WAIVER"
                  CONTAIN A BINDING ARBITRATION AGREEMENT AND CLASS ACTION WAIVER. THEY AFFECT YOUR LEGAL RIGHTS. PLEASE
                  READ THEM.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">Capitalized terms not defined in these Terms of Use shall have the meaning
                  set forth in our Privacy Policy.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>1. RESTRICTIONS</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">The Platform is available only for individuals aged 13 years or older, who
                  are located in the United States. If you are 13 or older, but under the age of majority in
                  your jurisdiction, you should review this Agreement with your parent or guardian to make sure that you
                  and your parent or guardian understand it. If you are under the age of 13, you may use the Platform
                  only with the consent of your parent or guardian.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">We reserve the right, in our sole and absolute discretion, to deny you access
                  to the Platform, or any portion of the Platform, without notice and without reason.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>2. SIGN-IN NAME; PASSWORD; UNIQUE IDENTIFIERS</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Although registration is not required to access and use the Platform, there
                  are certain benefits that flow from being a registered user. If you elect to register with us, you may
                  log in to the Platform using a third-party login provider (e.g., Facebook). If you do not wish to log
                  in using these third-party access credentials, you will be prompted to create an account, which
                  includes a sign-in name ("<u>Sign-In Name</u>"), a password ("<u>Password</u>"), and perhaps certain
                  additional information that will assist us in authenticating your identity when you logs in in the
                  future ("<u>Unique Identifiers</u>"). When creating your account, you must provide true, accurate,
                  current, and complete information. Each Sign-In Name and corresponding Password can be used by only
                  one user. You are solely responsible for the confidentiality and use of your Sign-In Name, Password,
                  and Unique Identifiers, as well as for any use, misuse, or communications entered through the Platform
                  using one or more of them. You will promptly inform us of any need to deactivate a Password or Sign-In
                  Name or change any Unique Identifier. We reserve the right to delete or change your Password, Sign-In
                  Name, or Unique Identifier at any time and for any reason and shall have no liability to you for any
                  loss or damage caused by such action. We will not be liable for any loss or damage caused by any
                  unauthorized use of your account.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>3. COMMUNITY GUIDELINES</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Although registration is not required to access and use the Platform, there
                  are certain benefits that flow from being a registered user. If you elect to register with us, you may
                  log in to the Platform using a third-party login provider (e.g., Facebook). If you do not wish to log
                  in using these third-party access credentials, you will be prompted to create an account, which
                  includes a sign-in name ("<u>Sign-In Name</u>"), a password ("<u>Password</u>"), and perhaps certain
                  additional information that will assist us in authenticating your identity when you logs in in the
                  future ("<u>Unique Identifiers</u>"). When creating your account, you must provide true, accurate,
                  current, and complete information. Each Sign-In Name and corresponding Password can be used by only
                  one user. You are solely responsible for the confidentiality and use of your Sign-In Name, Password,
                  and Unique Identifiers, as well as for any use, misuse, or communications entered through the Platform
                  using one or more of them. You will promptly inform us of any need to deactivate a Password or Sign-In
                  Name or change any Unique Identifier. We reserve the right to delete or change your Password, Sign-In
                  Name, or Unique Identifier at any time and for any reason and shall have no liability to you for any
                  loss or damage caused by such action. We will not be liable for any loss or damage caused by any
                  unauthorized use of your account.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">Nosey's community, like any community, functions best when its users follow a
                  few simple rules. By accessing the Platform, you agree to comply with these community guidelines (the
                  "<u>Community Guidelines</u>") and that:
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <ul>
                    <li>You will not upload, post, e-mail, transmit, or otherwise make available any User Content (as
                      defined below) that:
                      <ul>
                        <li>infringes any copyright, trademark, right of publicity, or other proprietary rights of any
                          person or entity; or
                        </li>
                        <li>is defamatory, libelous, indecent, obscene, pornographic, sexually explicit, invasive of
                          another's privacy, promotes violence, or contains hate speech (i.e., speech that attacks or
                          demeans a group based on race or ethnic origin, religion, disability, gender, age, veteran
                          status, and/or sexual orientation/gender identity); or
                        </li>
                        <li>discloses any sensitive information about another person, including that person's e-mail
                          address, postal address, phone number, credit card information, or any similar information.
                        </li>
                      </ul>
                    </li>
                    <li>You will comply with all applicable laws in your use of the Platform and will not use the
                      Platform for any unlawful purpose;
                    </li>
                    <li>You will not access or use the Platform to collect any market research for a competing
                      business;
                    </li>
                    <li>You will not impersonate any person or entity or falsely state or otherwise misrepresent your
                      affiliation with a person or entity;
                    </li>
                    <li>You will not interfere with or attempt to interrupt the proper operation of the Platform through
                      the use of any virus, device, information collection or transmission mechanism, software or
                      routine, or access or attempt to gain access to any Content (as defined below), data, files, or
                      passwords related to the Platform through hacking, password or data mining, or any other means;
                    </li>
                    <li>You will not decompile, reverse engineer, or disassemble any software or other products or
                      processes accessible through the Platform;
                    </li>
                    <li>You will not cover, obscure, block, or in any way interfere with any advertisements and/or
                      safety features on the Platform;
                    </li>
                    <li>You will not circumvent, remove, alter, deactivate, degrade, or thwart any of the Content
                      protections in the Platform;
                    </li>
                    <li>You may view the Content only in geographic locations where we offer our service and have
                      licensed such Content. The Content that may be available to watch will vary by geographic
                      location. Nosey will use technologies to verify your geographic location, and you will not attempt
                      to circumvent any of our geo-fencing efforts;
                    </li>
                    <li>You will not use any robot, spider, scraper, or other automated means to access the Platform for
                      any purpose without our express written permission; provided, however, we grant the operators of
                      public search engines permission to use spiders to copy materials from the public portions of the
                      Platform for the sole purpose of and solely to the extent necessary for creating
                      publicly-available searchable indices of the materials, but not caches or archives of such
                      materials;
                    </li>
                    <li>You will not take any action that imposes or may impose (in our sole discretion) an unreasonable
                      or disproportionately large load on our technical infrastructure; and
                    </li>
                    <li>If you find something that violates our Community Guidelines, please let us know, and we'll
                      review it.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>4. INTELLECTUAL PROPERTY</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">The Platform contains material, such as videos, television shows, movies,
                  photographs, software, text, graphics, images, sound recordings, and other material provided by or on
                  behalf of Nosey (collectively referred to as the "<u>Content</u>"). The Content may be owned by us or
                  third parties. The Content is protected under both United States and foreign laws. Unauthorized use of
                  the Content may violate copyright, trademark, and other laws.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">You may view all Content for your own personal, non-commercial use. No other
                  use is permitted without the prior written consent of Nosey. Nosey and its licensors retain all right,
                  title, and interest, including all intellectual property rights, in and to the Content. You must
                  retain all copyright and other proprietary notices contained in the original Content. You may not
                  sell, transfer, assign, license, sublicense, or modify the Content or reproduce, display, publicly
                  perform, make a derivative version of, distribute, or otherwise use the Content in any way for any
                  public or commercial purpose. The use or posting of the Content on any other website, social media
                  page, or in a networked computer environment for any purpose is expressly prohibited.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">If you violate any part of this Agreement, your permission to access the
                  Content and the Platform automatically terminates and you must immediately destroy any copies you have
                  made of the Content.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">The trademarks, service marks, and logos of Nosey (the "<u>Nosey
                  Trademarks</u>") used and displayed on the Platform are registered and unregistered trademarks or
                  service marks of Nosey. Other company, product, and service names located on the Platform may be
                  trademarks or service marks owned by others (the "Third-Party Trademarks," and, collectively with
                  Nosey Trademarks, the "<u>Trademarks</u>"). Nothing on the Platform should be construed as granting,
                  by implication, estoppel, or otherwise, any license or right to use the Trademarks, without our prior
                  written permission specific for each such use. Use of the Trademarks as part of a link to or from any
                  site is prohibited unless establishment of such a link is approved in advance by us in writing. All
                  goodwill generated from the use of Nosey Trademarks inures to our benefit.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">Elements of the Platform are protected by trade dress, trademark, unfair
                  competition, and other state and federal laws and may not be copied or imitated in whole or in part,
                  by any means, including, but not limited to, the use of framing or mirrors. None of the Content may be
                  retransmitted without our express, written consent for each and every instance.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>5. USER CONTENT; LICENSES</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">The Platform provides you the ability to rate Content, and our social media
                  pages allow you to post content (collectively, "<u>User Content</u>"). You expressly acknowledge and
                  agree that once you submit your User Content for inclusion into the Platform or our social media
                  pages, it will be accessible by others, and that there is no confidentiality or privacy with respect
                  to such User Content, including, without limitation, any personally identifying information that you
                  may make available. YOU, AND NOT NOSEY, ARE ENTIRELY RESPONSIBLE FOR ALL YOUR USER CONTENT THAT YOU
                  UPLOAD, POST, E-MAIL, OR OTHERWISE TRANSMIT VIA THE PLATFORM OR OUR SOCIAL MEDIA PAGES.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">You retain all copyrights and other intellectual property rights in and to
                  your own User Content. You do, however, hereby grant us and our sublicensees a non-exclusive,
                  royalty-free, freely sublicensable, perpetual license to modify, compile, combine with other content,
                  copy, record, synchronize, transmit, translate, format, distribute, publicly display, publicly
                  perform, and otherwise use or exploit (including for profit) your User Content and all intellectual
                  property and moral rights therein throughout the universe, in each case, by or in any means, methods,
                  media, or technology now known or hereafter devised. You also grant us and our sublicensees the right,
                  but not the obligation, to use your User Content, your social media sign-in name, name, likeness, and
                  photograph in connection with any use of the related User Content permitted by the previous sentence
                  and/or to advertise and promote the Platform, Nosey, and our products and services. Without limiting
                  the foregoing, you acknowledge and agree that uses of your User Content, sign-in name, name, likeness,
                  and photograph permitted by the foregoing rights and licenses may include the display of such User
                  Content, sign-in name, name, likeness, and photograph adjacent to advertising and other material or
                  content, including for profit.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">If you submit User Content to us, each such submission constitutes a
                  representation and warranty to Nosey that such User Content is your original creation (or that you
                  otherwise have the right to provide the User Content), that you have the rights necessary to grant the
                  license to the User Content under the prior paragraph, and that it and its use by Nosey and its
                  content partners as permitted by this Agreement does not and will not infringe or misappropriate the
                  intellectual property or moral rights of any person or contain any libelous, defamatory, or obscene
                  material or content that violates our Community Guidelines.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>6. COMMUNICATIONS WITH US</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Although we encourage you to e-mail us, we do not want you to, and you should
                  not, e-mail us any content that contains confidential information. With respect to all e-mails and
                  communications you send to us, including, but not limited to, feedback, questions, comments,
                  suggestions, and the like, we shall be free to use any ideas, concepts, know-how, or techniques
                  contained in your communications for any purpose whatsoever, including but not limited to, the
                  development, production, and marketing of products and services that incorporate such information
                  without compensation or attribution to you.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>7. NO WARRANTIES; LIMITATION OF LIABILITY</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">YOU ACKNOWLEDGE THAT THE PLATFORM IS A PRE-RELEASE BETA VERSION, AND MAY
                  CONTAIN BUGS, ERRORS, AND OTHER PROBLEMS THAT COULD CAUSE SYSTEM FAILURES. CONSEQUENTLY, THE PLATFORM
                  AND THE CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, INCLUDING
                  THAT THE PLATFORM OR CONTENT WILL OPERATE ERROR-FREE OR THAT THE PLATFORM, ITS SERVERS, OR THE CONTENT
                  ARE FREE OF COMPUTER VIRUSES OR SIMILAR CONTAMINATION OR DESTRUCTIVE FEATURES.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF
                  TITLE, MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE
                  AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE. IN
                  CONNECTION WITH ANY WARRANTY, CONTRACT, OR COMMON LAW TORT CLAIMS: (I) WE AND OUR LICENSORS SHALL NOT
                  BE LIABLE FOR ANY INCIDENTAL OR CONSEQUENTIAL DAMAGES, LOST PROFITS, OR DAMAGES RESULTING FROM LOST
                  DATA OR BUSINESS INTERRUPTION RESULTING FROM THE USE OR INABILITY TO ACCESS AND USE THE PLATFORM OR
                  THE CONTENT, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; AND (II) ANY DIRECT
                  DAMAGES THAT YOU MAY SUFFER AS A RESULT OF YOUR USE OF THE PLATFORM OR THE CONTENT SHALL BE LIMITED TO
                  THE MONIES YOU HAVE PAID US IN CONNECTION WITH YOUR USE OF THE PLATFORM DURING THE THREE (3) MONTHS
                  IMMEDIATELY PRECEDING THE EVENTS GIVING RISE TO THE CLAIM.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES.
                  THEREFORE, SOME OF THE ABOVE LIMITATIONS ON WARRANTIES IN THIS SECTION MAY NOT APPLY TO YOU.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">NOTHING IN THESE TERMS OF USE SHALL AFFECT ANY NON-WAIVABLE STATUTORY RIGHTS
                  THAT APPLY TO YOU.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">THE AVAILABILITY OF CONTENT TO WATCH WILL CHANGE FROM TIME TO TIME AND FROM
                  COUNTRY TO COUNTRY. THE QUALITY OF THE DISPLAY OF THE STREAMING CONTENT MAY VARY FROM DEVICE TO DEVICE
                  AND MAY BE AFFECTED BY A VARIETY OF FACTORS, SUCH AS YOUR LOCATION AND THE BANDWIDTH AVAILABLE THROUGH
                  AND/OR SPEED OF YOUR INTERNET CONNECTION. PLEASE CHECK WITH YOUR INTERNET PROVIDER AND/OR WIRELESS
                  CARRIER FOR INFORMATION ON POSSIBLE DATA USAGE CHARGES. YOU ARE SOLELY RESPONSIBLE FOR PROCURING AN
                  INTERNET AND/OR WIRELESS CONNECTION AND FOR ALL CHARGES YOU INCUR IN CONNECTION THEREWITH. NOSEY MAKES
                  NO REPRESENTATIONS OR WARRANTIES ABOUT THE QUALITY OF YOUR WATCHING EXPERIENCE ON YOUR DISPLAY.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">THE PLATFORM MAY CONTAIN TECHNICAL INACCURACIES OR TYPOGRAPHICAL ERRORS OR
                  OMISSIONS. UNLESS REQUIRED BY APPLICABLE LAWS, WE ARE NOT RESPONSIBLE FOR ANY SUCH TYPOGRAPHICAL OR
                  TECHNICAL ERRORS LISTED ON THE PLATFORM. THE PLATFORM MAY CONTAIN INFORMATION ON CERTAIN CONTENT NOT
                  ALL OF WHICH ARE AVAILABLE IN EVERY LOCATION. A REFERENCE TO A TITLE OR PARTICULAR PIECE OF CONTENT ON
                  THE PLATFORM DOES NOT IMPLY THAT SUCH TITLE OR CONTENT IS OR WILL BE AVAILABLE IN YOUR LOCATION. WE
                  RESERVE THE RIGHT TO MAKE CHANGES, CORRECTIONS, AND/OR IMPROVEMENTS TO THE PLATFORM AND/OR ADD OR
                  REMOVE CONTENT AT ANY TIME WITHOUT NOTICE.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>8. EXTERNAL SITES; ADVERTISEMENTS</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">(a) The Platform may contain links to third-party websites ("<u>External
                  Sites</u>"). These links are provided solely as a convenience to you and not as an endorsement by us
                  of the content on such External Sites. The content of such External Sites is developed and provided by
                  others. You should contact the site administrator or webmaster for those External Sites if you have
                  any concerns regarding such links or any content located on such External Sites. We are not
                  responsible for the content of any linked External Sites and do not make any representations regarding
                  the content or accuracy of materials on such External Sites. You should take precautions when
                  downloading files from all websites to protect your computer from viruses and other destructive
                  programs. If you decide to access linked External Sites, you do so at your own risk.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">(b) We are not responsible for, and make no representations regarding: (i)
                  the advertisements or any other third-party material posted on the Platform or any of our social media
                  pages; or (ii) the products or services provided by advertisers. Any dealings or interactions you have
                  with advertisers, advertisements, other third parties, or other third-party materials while using the
                  Platform are between you and the advertiser or other third party, and you agree that Nosey is not
                  liable for any loss or claim that you may have against such parties.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>9. REPRESENTATIONS; WARRANTIES; AND INDEMNIFICATION</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  (a) You hereby represent, warrant, and covenant that:
                  <ul>
                    <li>You own or have the necessary licenses, rights, consents, and permissions to all trademark,
                      trade secret, copyright, or other proprietary, privacy, and publicity rights in and to your User
                      Content and any other works that you incorporate into your User Content, and all the rights
                      necessary to grant the licenses and permissions you grant hereunder;
                    </li>
                    <li>Use of your User in the manners contemplated in this Agreement shall not violate or
                      misappropriate the intellectual property, privacy, publicity, contractual, or other rights of any
                      third party; and
                    </li>
                    <li>You shall not submit to the Platform or any of our social media pages any User Content that
                      violates our Community Guidelines set forth above or any other term of this Agreement.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  (b) You agree to defend, indemnify, and hold us and our officers, directors, employees, agents,
                  successors, licensees, licensors, and assigns harmless from and against any damages, liabilities,
                  losses, expenses, claims, actions, and/or demands, including, without limitation, reasonable legal and
                  accounting fees, arising or resulting from: (i) your breach of this Agreement; (ii) your misuse of the
                  Content or the Platform; and/or (iii) your violation of any third-party rights, including without
                  limitation any copyright, trademark, property, publicity, or privacy right. We shall provide notice to
                  you of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any
                  such claim, suit, or proceeding. We reserve the right to assume the exclusive defense and control (at
                  your expense) of any matter that is subject to indemnification under this section. In such case, you
                  agree to cooperate with any reasonable requests assisting our defense of such matter.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>10. COMPLIANCE WITH APPLICABLE LAWS</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">The Platform is based in the United States. We make no claims concerning
                  whether the Content may be downloaded, viewed, or be appropriate for use outside of the United States.
                  If you access the Platform or the Content from outside of the United States, you do so at your own
                  risk. Whether inside or outside of the United States, you are solely responsible for ensuring
                  compliance with the laws of your specific jurisdiction.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>11. TERMINATION OF THE AGREEMENT</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">We reserve the right, in our sole discretion, to restrict, suspend, or
                  terminate this Agreement and your access to all or any part of the Platform, at any time and for any
                  reason without prior notice or liability. We reserve the right to change, suspend, or discontinue all
                  or any part of the Platform at any time without prior notice or liability. <u>Sections 4-11</u> and
                  <u>13-17</u> shall survive the termination of this Agreement.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>12. DIGITAL MILLENNIUM COPYRIGHT ACT</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Nosey respects the intellectual property rights of others and attempts to
                  comply with all relevant laws. We will review all claims of copyright infringement received and remove
                  any Content deemed to have been posted or distributed in violation of any such laws.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">Our designated agent under the Digital Millennium Copyright Act (the " Act")
                  for the receipt of any Notification of Claimed Infringement which may be given under that Act is as
                  follows:
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  Nosey Baxter, LLC.<br />
                  655 Third Avenue<br />
                  19th Floor<br />
                  New York, New York 10017<br />
                  Attention: DMCA Agent
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">If you believe that your work has been copied on the Platform in a way that
                  constitutes copyright infringement, please provide our agent with notice in accordance with the
                  requirements of the Act, including (i) a description of the copyrighted work that has been infringed
                  and the specific location on the Platform where such work is located; (ii) a description of the
                  location of the original or an authorized copy of the copyrighted work; (iii) your address, telephone
                  number and e-mail address; (iv) a statement by you that you have a good faith belief that the disputed
                  use is not authorized by the copyright owner, its agent or the law; (v) a statement by you, made under
                  penalty of perjury, that the information in your notice is accurate and that you are the copyright
                  owner or authorized to act on the copyright owner's behalf; and (vi) an electronic or physical
                  signature of the owner of the copyright or the person authorized to act on behalf of the owner of the
                  copyright interest.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>13. CONTROLLING LAW</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">This Agreement and any action related thereto will be governed by the laws of
                  the State of New York without regard to its conflict of laws provisions.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>14. BINDING ARBITRATION</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">In the event of a dispute arising under or relating to this Agreement, the
                  Content, or the Platform (each, a "<u>Dispute</u>"), either party may elect to finally and exclusively
                  resolve the dispute by binding arbitration governed by the Federal Arbitration Act ("FAA"). Any
                  election to arbitrate, at any time, shall be final and binding on the other party. IF EITHER PARTY
                  CHOOSES ARBITRATION, NEITHER PARTY SHALL HAVE THE RIGHT TO LITIGATE SUCH CLAIM IN COURT OR TO HAVE A
                  JURY TRIAL, EXCEPT EITHER PARTY MAY BRING ITS CLAIM IN ITS LOCAL SMALL CLAIMS COURT, IF PERMITTED BY
                  THAT SMALL CLAIMS COURT RULES AND IF WITHIN SUCH COURT'S JURISDICTION. ARBITRATION IS DIFFERENT FROM
                  COURT, AND DISCOVERY AND APPEAL RIGHTS MAY ALSO BE LIMITED IN ARBITRATION. All disputes will be
                  resolved before a neutral arbitrator selected jointly by the parties, whose decision will be final,
                  except for a limited right of appeal under the FAA. The arbitration shall be commenced and conducted
                  by JAMS pursuant to its then current Comprehensive Arbitration Rules and Procedures and in accordance
                  with the Expedited Procedures in those rules, or, where appropriate, pursuant to JAMS' Streamlined
                  Arbitration Rules and Procedures. All applicable JAMS' rules and procedures are available at the JAMS
                  website www.jamsadr.com. Each party will be responsible for paying any JAMS filing, administrative,
                  and arbitrator fees in accordance with JAMS rules. Judgment on the arbitrator's award may be entered
                  in any court having jurisdiction. This clause shall not preclude parties from seeking provisional
                  remedies in aid of arbitration from a court of appropriate jurisdiction. The arbitration may be
                  conducted in person, through the submission of documents, by phone, or online. If conducted in person,
                  the arbitration shall take place in the United States county where you reside. The parties may
                  litigate in court to compel arbitration, to stay a proceeding pending arbitration, or to confirm,
                  modify, vacate, or enter judgment on the award entered by the arbitrator. The parties shall cooperate
                  in good faith in the voluntary and informal exchange of all non-privileged documents and other
                  information (including electronically stored information) relevant to the Dispute immediately after
                  commencement of the arbitration. As set forth in <u>Section 16</u> below, nothing in this Agreement
                  will prevent us from seeking injunctive relief in any court of competent jurisdiction as necessary to
                  protect our proprietary interests.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>15. CLASS ACTION WAIVER</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">You agree that any arbitration or proceeding shall be limited to the Dispute
                  between us and you individually. To the full extent permitted by law, (i) no arbitration or proceeding
                  shall be joined with any other; (ii) there is no right or authority for any Dispute to be arbitrated
                  or resolved on a class action-basis or to utilize class action procedures; and (iii) there is no right
                  or authority for any Dispute to be brought in a purported representative capacity on behalf of the
                  general public or any other persons. YOU AGREE THAT YOU MAY BRING CLAIMS AGAINST US ONLY IN YOUR
                  INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
                  PROCEEDING.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>16. EQUITABLE RELIEF</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">You acknowledge and agree that in the event of a breach or threatened
                  violation of our intellectual property rights and confidential and proprietary information by you, we
                  will suffer irreparable harm and will therefore be entitled to injunctive relief to enforce this
                  Agreement. We may, without waiving any other remedies under this Agreement, seek from any court having
                  jurisdiction any interim, equitable, provisional, or injunctive relief that is necessary to protect
                  our rights and property pending the outcome of the arbitration referenced above. You hereby
                  irrevocably and unconditionally consent to the personal and subject matter jurisdiction of the federal
                  and state courts in the State of New York, Borough of Manhattan for purposes of any such action by us.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><h4>17. MISCELLANEOUS</h4></div>
              </div>
              <div className="row">
                <div className="col-xs-12">Our failure to act on or enforce any provision of the Agreement shall not be
                  construed as a waiver of that provision or any other provision in this Agreement. No waiver shall be
                  effective against us unless made in writing, and no such waiver shall be construed as a waiver in any
                  other or subsequent instance. Except as expressly agreed by us and you in writing, this Agreement
                  constitutes the entire Agreement between you and us with respect to the subject matter, and supersedes
                  all previous or contemporaneous agreements, whether written or oral, between the parties with respect
                  to the subject matter. The section headings are provided merely for convenience and shall not be given
                  any legal import. This Agreement will inure to the benefit of our successors, assigns, licensees, and
                  sublicensees.
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
