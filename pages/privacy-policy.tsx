/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

const PrivacyPolicy = () => {
    const [isNotMounted, setIsNotMounted] = React.useState<boolean>(true);

    React.useEffect(() => {
        setIsNotMounted(false);
    }, []);

    if (isNotMounted) {
        return null;
    }

    return (
        <div className="flex flex-col overflow-clip min-h-screen">
            <Navbar />
            <div className="h-full container">
                <div className="flex my-6" aria-label="Breadcrumb">
                    <div className="inline-flex items-center">
                        <Link href="/duckies">
                            <a className="inline-flex items-center text-base font-bold font-metro-regular text-text-color-100 hover:text-text-color-100">
                                Duckies
                            </a>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <Link href="#">
                            <a className="inline-flex items-center text-base font-bold font-metro-regular text-text-color-100 hover:text-text-color-100">
                                Policy
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex text-5xl font-bold font-gilmer-bold text-text-color-100 mb-7">
                    Privacy Policy
                </div>
                <div>
                    <p className="font-metro-regular font-normal text-xl text-text-color-100">
                        Last revised: 19 July 2022
                    </p>
                    <p className="font-metro-regular font-normal text-xl text-text-color-100">
                        Thank you for visiting https://www.yellow.org/ (<b>"Website"</b>) and being interested in our Duckies tokens.
                    </p>
                    <p className="font-metro-regular font-normal text-xl text-text-color-100">
                        The Website is owned and operated by Layer3 Foundation and its affiliates (together <b>"Operator"</b>, <b>"we"</b>, <b>"our"</b>, or <b>"us"</b>).
                    </p>
                    <p className="font-metro-regular font-normal text-xl text-text-color-100">
                        This Privacy Policy (<b>"Privacy Policy"</b>) sets out the basis on which any Personal Data we collect from you (<b>"you"</b> or <b>"your"</b>), or that you provide to us, will be processed.
                    </p>
                    <p className="font-metro-regular font-normal text-xl text-text-color-100">
                        Please read the following carefully to understand what data we collect, how that data is used and the ways it can be shared by us. If you do not wish for your Personal Data to be used in the ways described within this Privacy Policy then you should not access or use the Website or use the services, functions, or features offered from time to time on the Website.
                    </p>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        1. What information do we collect?
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.1. Personal Data.</b> Personal data or personal information means any information that relates to an identified or identifiable living individual. It does not include data which cannot be used to identify an individual person, such as a company registration number. A “data subject” is an individual who can be identified, directly or indirectly, by personal data. This is usually by reference to an identifier such as a name, identification number, location data, email address, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.
                            Different pieces of information, which are collected together can lead to the identification of a particular person and also constitute personal data. It does not include data where the identity has been removed and this data is no longer capable of identifying an individual (“Anonymous Data”).
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.2. Information that you provide.</b> This is information about you that you give us by (i) registering for an account; (ii) using the Support Centre on the Website; or (iii) corresponding with us by phone, email or otherwise.
                        </p>
                        <div className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.3. Information we may collect about you.</b> Every time you use the Services, we may collect the following information, which may be considered to be Personal Data when combined with other information:
                            <table className="table-auto my-6">
                                <thead>
                                    <tr>
                                        <th>Category of Personal Data</th>
                                        <th>Examples of specific pieces of personal data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Identity Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>name</li>
                                                <li>username or similar identifier</li>
                                                <li>title</li>
                                                <li>date of birth and gender</li>
                                                <li>biometric information, including a visual image of your face</li>
                                                <li>national identity cards</li>
                                                <li>passports, driving licences or other forms of identification documents</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Social Identity Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>your group/company data</li>
                                                <li>information on referrals related to you</li>
                                                <li>behavioural data</li>
                                                <li>risk assessment</li>
                                                <li>compliance assessment</li>
                                                <li>your user-generated content</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contact Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>residence details</li>
                                                <li>home address</li>
                                                <li>work address</li>
                                                <li>email address and telephone numbers</li>
                                                <li>proof of address documentation</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Financial Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>payment details</li>
                                                <li>Digital Assets Wallets</li>
                                                <li>balances associated with Digital Assets Wallets</li>
                                                <li>orders and trades associated with Digital Assets Wallets</li>
                                                <li>source of funds and related documentation</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Transactional Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>details about payments to and from you</li>
                                                <li>other details of any transactions you enter into using the Services or Website</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Metamask Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>authorization information</li>
                                                <li>public Metamask wallet address</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Technical Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>internet connectivity data</li>
                                                <li>internet protocol (IP) address</li>
                                                <li>operator and carrier data</li>
                                                <li>login data</li>
                                                <li>browser type and version</li>
                                                <li>device type, category and model</li>
                                                <li>time zone setting and location data</li>
                                                <li>language data</li>
                                                <li>application version and SDK version</li>
                                                <li>browser plug-in types and versions</li>
                                                <li>operating system and platform</li>
                                                <li>diagnostics data such as crash logs and any other data we collect for the purposes of measuring technical diagnostics</li>
                                                <li>other information stored on or available regarding the devices you allow us access to when you visit the Website or use the Services</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Profile Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>your username and password</li>
                                                <li>your identification number as our user</li>
                                                <li>your email associated with your accounts</li>
                                                <li>requests by you for products or services</li>
                                                <li>your interests, preferences and feedback</li>
                                                <li>other information generated by you when you communicate with us, for example when you address a request to our customer support</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Usage Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>
                                                    information about how you use the Website, the Services, and other offerings made available by us, including
                                                    <ul>
                                                        <li>device download time</li>
                                                        <li>interaction type and time</li>
                                                        <li>event time, name and source</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Marketing and Communications Data</td>
                                        <td>
                                            <ul className="list-disc">
                                                <li>
                                                    your preferences in receiving marketing from us or third parties
                                                    <ul>
                                                        <li>your communication preferences</li>
                                                        <li>your survey responses</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.4. Information we DO NOT collect about you.</b> We do not collect any special categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sexual orientation, political opinions, information about your health and genetic and biometric data). However, you may be required to send us information relevant to establishing your identity such as photographs and copies of your government-issued identification documents
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.5. Information we may collect from third-party sources.</b> We may receive information about you from other sources, including (i) third parties that help us update, expand, and analyze our records; prevent or detect fraud; process payments; or analyze your use of our Services, and (ii) third parties with whom you choose to link with the Services through functionality we make available to you. Our Services may also include integrated content or links to content provided by third parties (such as live chat, social media content, plug-ins and applications). Additional third parties may include our affiliated entities.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.6. Information we collect automatically.</b> The Operator’s web servers automatically log standard access information including browser type and URL requested. This information is not shared with third parties and is used only within the Operator on a need-to-know basis. The Operator reserves the right to block access for any customer accessing the Website via a proxy service intending to conceal originating identity. This includes access via the Tor anonymity network.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.7. Cookies.</b> We may use cookies to collect the information to identify user behaviour and to serve content and offers based on your profile, and for the other purposes described below, to the extent legally permissible in certain jurisdictions. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of the website may become inaccessible or not function properly.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>1.8. Children’s Personal Data.</b> We do not knowingly request to collect personal information from any person under the age of 18. If a user submitting personal information is suspected of being younger than 18 years of age, we will require the user to close his or her account and will not allow the user to continue using our Website and/or the Services. We will also take steps to delete the information as soon as possible. Please notify us if you know of any individuals under the age of 18 using our Website and/or the Services so we can take action to prevent access to our Website and/or the Services.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        2. Why do we collect your information?
                    </div>
                    <div>
                        <div className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>2.1 Personal Data usage.</b> Information you provide to us and/or we collect may be used for
                            <ul className="list-disc">
                                <li>
                                    Transaction services. We use your information to process your orders and to communicate with you about orders and Services;
                                </li>
                                <li>
                                    Communication with you. We use your information to communicate with you in relation to us;
                                </li>
                                <li>
                                    Complying with our Know Your Customer (“KYC”) obligations under applicable laws and regulations, and Anti-Money Laundering laws and regulations;
                                </li>
                                <li>
                                    Provide, troubleshoot, and improve the Website and the Services. We use your information to provide functionality, analyse performance, fix errors, and improve the usability and effectiveness of the Website and the Services.
                                </li>
                                <li>
                                    Fraud prevention and credit risks. We process information to prevent and detect fraud and abuse in order to protect the security of our users, us and others. We may also use scoring methods to assess and manage credit risks.
                                </li>
                                <li>
                                    Improve our services. We process information to improve our services and for you to have a better user experience;
                                </li>
                                <li>
                                    Recommendations and personalisation. We use your information to recommend features and services that might be of interest to you, identify your preferences, and personalise your experience with the Website and the Services;
                                </li>
                                <li>
                                    Analysing and administrating. We use your information to analyse trends, administrate the Website access and Services usage, gather information for aggregate use, systems administration, and detecting usage patterns and troubleshooting purposes
                                </li>
                            </ul>
                        </div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>2.2. Anonymous Data usage.</b> Anonymous Data may cover patterns of usage of information and data that you provide to us, and we reserve the right to use this Anonymous Data for the purposes of improving and enhancing our Services, generating insights, for use in marketing to other users and current and potential partners and otherwise for the purposes of our business. Provided that such Anonymous Data does not directly or indirectly identify you as an individual, this data is not considered to be Personal Data for the purpose of this Privacy Policy.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        3. Legal Basis for our use of your Personal Data
                    </div>
                    <div>
                        <div className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>3.1. Legal Basis.</b> We will process your Personal Data on the following grounds:
                            <ul className="list-disc">
                                <li>
                                    Performance of a contract when we provide you with access to the Website or the Services or communicate with you about them. This includes when we use your Personal Data to take and handle orders, and process payments;
                                </li>
                                <li>
                                    Legal obligation to comply with our legal obligations under applicable laws and regulations, and Anti-Money Laundering laws and regulations;
                                </li>
                                <li>
                                    Our legitimate interests and the interests of our users when, for example, we detect and prevent fraud and abuse in order to protect the security of our users, ourselves, or others;
                                </li>
                                <li>
                                    Our legitimate interest to improve our Website and Services;
                                </li>
                                <li>
                                    Your consent when we ask for your consent to process your personal information for a specific purpose that we communicate to you. When you consent to process your Personal Data for a specified purpose, you may withdraw your consent at any time and we will stop processing your data for that purpose.
                                </li>
                            </ul>
                        </div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>3.2. Limitation of Personal Data usage.</b> We ensure that we balance any potential impact on you and your rights before we process your Personal Data for our legitimate interests. We do not use your Personal Data for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by contacting us.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>3.3 Consent for Personal Data usage.</b> Generally, we do not rely on consent as a legal basis for processing your Personal Data other than in relation to our use of cookies or when we send third-party direct marketing communications to you via email or text message. However, your consent for your Personal Data usage can be used as a legal basis for Personal Data usage by us.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        4. Security and confidentiality
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>4.1. General provisions.</b> We work to protect the security of your personal information during transmission by using encryption protocols and software.
                            We maintain physical, electronic and procedural safeguards in connection with the collection, storage and disclosure of your personal information. Our security procedures mean that we may ask you to verify your identity to protect you against unauthorised access to your account password. We recommend using a unique password for your Binance account that is not utilized for other online accounts and signing off when you finish using a shared computer.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>4.2. Confidentiality.</b> The Operator is committed to protecting your privacy. Internally, only people with a business need to know Personal Data, or whose duties reasonably require access to it, are granted access to customers’ Personal Data. Such individuals will only process your Personal Data on our instructions and are subject to a duty of confidentiality.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>4.3. No Guarantee.</b> We make every legitimate and possible effort to provide security and confidentiality of the information, but no information system can be fully secure. We cannot guarantee the absolute security of your information. Moreover, we are not responsible for the security of information you transmit to us over networks that we do not control, including the internet and wireless networks.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        5. Disclosures
                    </div>
                    <div>
                        <div className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>5.1. Internal Personal Data Disclosure.</b> For the purposes of Personal Data usage, you agree that we have the right to share your Personal Data with
                            <ul className="list-disc">
                                <li>
                                    Any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries including their respective contractors, affiliates, employees or representatives
                                </li>
                                <li>
                                    Our service providers, to the extent necessary to supply the Services to you
                                </li>
                                <li>
                                    Selected third parties, including analytics and search engine providers that assist us in the improvement and optimization of the Services
                                </li>
                                <li>
                                    Authorities and law enforcement agencies worldwide either when ordered to do so or on a voluntary basis if this appears reasonable and necessary to us
                                </li>
                            </ul>
                        </div>
                        <div className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>5.2. Personal Data Disclosure to the Third Party.</b> You agree that we can also disclose your Personal Data to third parties
                            <ul className="list-disc">
                                <li>
                                    If the Operator or substantially all of its assets are acquired by a third party, in which case Personal Data held by it about its customers will be one of the transferred assets.
                                </li>
                                <li>
                                    If we are under a duty to disclose or share your Personal Data in order to comply with any legal obligation, in order to enforce or apply our Terms of Service and other agreements; or to protect the rights, property, or safety of us, our clients, or others.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        6. International Transfers
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>6.1. International Transfer of Personal Data.</b> Personal Data and other data may therefore be exported outside of the jurisdiction in which you reside. Your Personal Data may be processed and stored in a foreign country or countries. Under those circumstances, the governments, courts, law enforcement, or regulatory agencies of that country or those countries may be able to obtain access to your Personal Data through foreign laws. You need to be aware that the privacy standards of those countries may be lower than those of the jurisdiction in which you reside.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>6.2. No Guarantee.</b> Unfortunately, the transmission of information via the Internet is not completely secure. While we do our utmost to protect your Personal Data, we cannot guarantee the security of your data transmitted to us over email or through the Website; any transmission is at your own risk. Once we have received your data, we will use strict procedures and security features to try to prevent unauthorized access.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        7. Your Privacy Rights
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                           <b>7.1. Access.</b> You may access and verify your Personal Data held by the Operator by submitting a written request using our support centre.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>7.2. Rectification of Incomplete or Inaccurate Personal Data.</b> You may request us to rectify or update any of your personal information held by us that is inaccurate. You may do this at any time by logging in to your account and updating your profile information.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>7.3. Withdraw consent.</b> To the extent that the processing of your personal information is based on your consent, you may withdraw your consent at any time. Your withdrawal will not affect the lawfulness of the Operator’s processing based on consent before your withdrawal.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>7.4. Erasure.</b> You may request to erase your Personal Data, subject to applicable law. If you close your account, we will mark your account in our database as closed but will keep certain account information, including your request to erase it, in our database for a period of time. This is necessary to deter fraud, by ensuring that persons who try to commit fraud will not be able to avoid detection simply by closing their account and opening a new account and complying with our legal obligations. However, if you close your account, your personal information will not be used by us for any further purposes, nor shared with third parties, except as necessary to prevent fraud and assist law enforcement, as required by law, or in accordance with this Privacy Policy.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>7.5. Restriction of processing.</b> In some jurisdictions, applicable law may give you the right to restrict or object to our processing or transferring your personal information under certain circumstances. We may continue to process your personal information if it is necessary for the defence of legal claims, or for any other exceptions permitted by applicable law.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>7.6. Marketing communications.</b> If you no longer wish to receive marketing communications from us, you can also let us know via the methods stated below. The electronic marketing communications we send to you also contain opt-out mechanisms that allow you to opt-out from receiving those communications, update your contact information or change your preferences at any time. We will honour your choice and refrain from sending you such announcements. You may also opt back in to receive those communications at any time.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        8. Other Websites and protecting your Personal Data
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>8.1. Privacy Policy Restrictions.</b> This Privacy Policy and the use of your Personal Data only apply to the information you provide to us. You are cautioned that if you disclose Personal Data or personally sensitive data through the use of the Internet, such as through chat rooms, communities, or other public online forums, this information may be collected and used by other persons or companies over which the Operator has no control. Our Website and other services may include integrated content or links to content provided by third parties (such as video materials, social media content, plug-ins and applications). Please note that the websites, applications and services of third parties (including affiliate entities, associated companies, sponsors, advertisers or other persons) will be governed by the privacy settings, policies, and/or procedures of the third party, which may differ from this Privacy Policy. This Privacy Policy does not address, and we are not responsible for or able to control, the privacy, security, or other practices of any third parties. It is your responsibility to review the privacy statements, policies, terms, and conditions of any person or company to whom you choose to link or with whom you choose to contract. the Operator is not responsible for the privacy statements, policies, terms, conditions, or other content of any Website not owned or managed by the Operator.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>8.2. Your obligation to protect Personal Data.</b> The Operator takes all reasonable efforts to protect and safeguard Personal Data, but there are protective measures you should take, as well. Do not share your Personal Data with others unless you clearly understand the purpose of their request for it and you know with whom you are dealing. Do not keep sensitive Personal Data in your email inbox. If you are asked to assign passwords to connect you to your Personal Data, you should use a secure password and always use two-factor authentication (2FA), where available. You should change your password regularly.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        9. Changes to Our Privacy Policy
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>9.1. Amendments, Changes, or Updates.</b> Any amendments, changes, or updates we make to our Privacy Policy in the future will be posted on this page and, where appropriate, notified to you by email. Please check the Privacy Policy as frequently as possible to see any updates or changes to our Privacy Policy. Your non-termination or continued access to the Website and/or use of any Services after the effective date of any amendments, changes, or updates constitutes your acceptance of this Privacy Policy, as modified by such amendments, changes, or updates.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        10. Contact
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>10.1. Support Centre.</b> Questions, comments and requests regarding this Privacy Policy should be addressed using our support centre or via email: legal@layer3.foundation
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        NOTICE TO CALIFORNIA RESIDENTS
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            Under California Civil Code Section 1789.3, California users are entitled to the following consumer rights notice: California residents may reach the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by mail at 1625 North Market Blvd., Sacramento, CA 95834, or by telephone at (916) 445-1254 or (800) 952-5210.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            This section provides additional details about the personal information we collect about California consumers and the rights afforded to them under the California Consumer Privacy Act or “CCPA”.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            For more details about the personal information we collect from you, please see the “What information do we collect” section above. We collect this information for the business and commercial purposes described in the “Why do we collect your information” section above. We share this information with the categories of third parties described in the “Disclosures” section above. Company does not sell (as such term is defined in the CCPA) the personal information we collect (and will not sell it without providing a right to opt-out).
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            Subject to certain limitations, the CCPA provides California consumers the right to request to know more details about the categories or specific pieces of personal information we collect (including how we use and disclose this information), to delete their personal information, to opt-out of any “sales” that may be occurring, and to not be discriminated against for exercising these rights.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            California consumers may make a request pursuant to their rights under the CCPA by contacting us at legal@layer3.foundation. Please note that you must verify your identity and request before further action is taken. As a part of this process, government identification may be required. Consistent with California law, you may designate an authorized agent to make a request on your behalf. In order to designate an authorized agent to make a request on your behalf, you must provide a valid power of attorney, the requester’s valid government-issued identification, and the authorized agent’s valid government-issued identification.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-4xl font-bold font-gilmer-bold text-text-color-100 pb-6 mt-12">
                        NOTICE TO EU DATA SUBJECTS
                    </div>
                    <div>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>Personal Information</b><br/>
                            With respect to EU data subjects, “personal information,” as used in this Privacy Policy, is equivalent to “personal data” as defined in the European Union General Data Protection Regulation (GDPR).
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>Sensitive Data</b><br/>
                            Some of the information you provide us may constitute sensitive data as defined in the GDPR (also referred to as special categories of personal data), including identification of your race or ethnicity on government-issued identification documents.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>Legal Bases for Processing</b><br/>
                            We only use your personal information as permitted by law. We are required to inform you of the legal bases of our processing of your personal information, which are described in the “Legal Basis for our use of your Personal Data” section above. If you have questions about the legal bases under which we process your personal information, contact us at legal@layer3.foundation.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>Use for New Purposes</b><br/>
                            We may use your personal information for reasons not described in this Privacy Policy, where we are permitted by law to do so and where the reason is compatible with the purpose for which we collected it. If we need to use your personal information for an unrelated purpose, we will notify you and explain the applicable legal basis for that use. If we have relied upon your consent for a particular use of your personal information, we will seek your consent for any unrelated purpose.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>Your Rights</b><br/>
                            Under the GDPR, you have certain rights regarding your personal information. Additionally to the rights, mentioned in “Your Privacy Rights” section above, you may ask us to take the following actions in relation to your personal information that we hold:<br />
                            <b>Opt-out.</b> Stop sending you direct marketing communications which you have previously consented to receive. We may continue to send you Service-related and other non-marketing communications.<br />
                            <b>Access.</b> Provide you with information about our processing of your personal information and give you access to your personal information.<br />
                            <b>Correct.</b> Update or correct inaccuracies in your personal information.<br />
                            <b>Delete.</b> Delete your personal information.<br />
                            <b>Transfer.</b> Transfer a machine-readable copy of your personal information to you or a third party of your choice.<br />
                            <b>Restrict.</b> Restrict the processing of your personal information.<br />
                            <b>Object.</b> Object to our reliance on our legitimate interests as the basis of our processing of your personal information that impacts your rights.<br />
                            You can submit these requests by email to legal@layer3.foundation. We may request specific information from you to help us confirm your identity and process your request. Applicable law may require or permit us to decline your request. If we decline your request, we will tell you why, subject to legal restrictions. If you would like to submit a complaint about our use of your personal information or response to your requests regarding your personal information, you may contact us at legal@layer3.foundation or submit a complaint to the data protection regulator in your jurisdiction.
                        </p>
                        <p className="font-metro-regular font-normal text-xl text-text-color-100">
                            <b>Cross-Border Data Transfer</b><br/>
                            Please be aware that your personal data will be transferred to, processed, and stored in the United States. Data protection laws in the U.S. may be different from those in your country of residence. You consent to the transfer of your information, including personal information, to the U.S. as set forth in this Privacy Policy by visiting our website or using our service.
                            Whenever we transfer your personal information out of the EEA to the U.S. or countries not deemed by the European Commission to provide an adequate level of personal information protection, the transfer will be based on a data transfer mechanism recognized by the European Commission as providing adequate protection for personal information.
                            Please contact us if you want further information on the specific mechanism used by us when transferring your personal information out of the EEA.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
