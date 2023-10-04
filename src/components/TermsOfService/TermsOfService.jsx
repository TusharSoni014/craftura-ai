import React from "react";
import "./terms.scss";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function TermsOfService() {
  return (
    <>
      <div className="terms-of-service-container">
        <div>
          <h1>Terms of Service</h1>
        </div>
        <div>
          <p>
            <i>Last updated: 30 Aug, 2023</i>
            <br />
          </p>
          <p>
            Please read these Terms of Service ("Terms") carefully before using
            the Craftura AI website (the "Service"). By accessing or using the
            Service, you agree to be bound by these Terms. If you disagree with
            any part of the terms, then you may not access the Service.
          </p>
          <h2>Account Registration</h2>
          <p>
            To use certain features of our Service, you may be required to
            create an account. You are responsible for safeguarding your account
            information and for any activities or actions under your account.
            You agree not to disclose your password to any third party.
          </p>
          <h2>Prohibited Uses</h2>
          <p>
            You agree not to use the Service to create, upload, or share any
            content that:
          </p>
          <br />
          <ol type="a">
            <div className="flex">
              <div>•</div>
              <div>
                Is illegal, harmful, threatening, abusive, harassing,
                defamatory, vulgar, obscene, invasive of another's privacy,
                hateful, or racially, ethnically, or otherwise objectionable.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Infringes any intellectual property rights of any party.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Is unauthorized or unsolicited advertising, promotional
                materials, spam, or any other form of solicitation.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Contains software viruses or any other computer code, files, or
                programs designed to interrupt, destroy, or limit the
                functionality of any computer software or hardware or
                telecommunications equipment.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Infringes or violates the privacy or publicity rights of any
                individual, without obtaining explicit and verifiable consent
                from those individuals who are depicted or otherwise represented
                in the content.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Violates any applicable local, state, national, or international
                law or regulation.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Generates or disseminates false information/content intended to
                harm others.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Generates or disseminates personal identifiable information that
                could harm an individual.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>Defames, disparages or harasses others.</div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Involves automated decision making that negatively impacts an
                individual's legal rights or creates/modifies a binding
                obligation.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Discriminates or harms individuals or groups based on their
                social behavior or personal characteristics.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Exploits vulnerabilities of specific groups to distort a
                person's behavior causing potential physical or psychological
                harm.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Discriminates against individuals or groups based on legally
                protected characteristics.
              </div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>Provides medical advice or interprets medical results.</div>
            </div>
            <div className="flex">
              <div>•</div>
              <div>
                Generates or disseminates information for use in justice
                administration, law enforcement, or immigration processes,
                including predicting fraudulent/criminal activities.
              </div>
            </div>
          </ol>
          <h2>Account Termination</h2>
          <p>
            We reserve the right, at our sole discretion, to suspend or
            terminate your account and your access to the Service at any time,
            for any reason, and without notice. You agree that we are not liable
            to you or any third party for any termination of your access to the
            Service. We also reserve the right to take appropriate legal action,
            including without limitation for any illegal or unauthorized use of
            the Service.
            <br />
            <br />
            You may also terminate your account at any time, for any reason, by
            contacting our customer service team. Following termination, all
            provisions of these Terms which by their nature should survive
            termination shall survive termination, including but not limited to,
            ownership provisions, warranty disclaimers, indemnity, and
            limitations of liability.
          </p>
          <h2>Intellectual Property Rights to Service</h2>
          <p>
            All intellectual property rights related to our Service, which
            includes but is not limited to content, graphics, design, and
            software, are owned by us or our licensors.
            <br />
            The Service incorporates advanced machine learning algorithms and
            text-to-image diffusion models, which are based on certain
            open-source models. We have refined and optimized these models
            significantly for our Service, which constitute our proprietary
            property. These open-source models and their associated rights are
            owned by their respective creators. Our use and refinement of these
            models are done in compliance with the terms of the original
            open-source licenses. For more information about these licenses,
            please refer to the{" "}
            <u>
              <a href="https://huggingface.co/spaces/CompVis/stable-diffusion-license">
                CreativeML Open RAIL-M license
              </a>
            </u>
          </p>
          <h2>Intellectual Property Rights to User-Generated Content</h2>
          <p>
            "User-Generated Content" refers to all content created by you,
            including but not limited to images and prompts ("User Prompts").
            The term 'Prompts' includes both the prompt text and any user input
            settings associated with it. <br />
            <br />{" "}
            <b>
              By using the Service to create User-Generated Content, images and
              prompts, you retain the ownership rights to those content.
              <br />
              <br />
              However, by using the public mode of the Service, you grant us a
              non-exclusive, royalty-free, worldwide, perpetual, irrevocable,
              and transferable license{" "}
            </b>
            to host, reproduce, distribute, and create derivative works of the
            User-Generated Content in connection with the Service and our
            business, including for promoting the Service in any media formats
            and through any media channels.
            <br />
            <br />
            <b>
              In fostering a collaborative environment, you also grant each user
              of the Service a non-exclusive, royalty-free, worldwide license
            </b>{" "}
            to access your User-Generated Content through the Service, and to
            use, reproduce, distribute, and create derivative works of such
            content. This usage should abide by the principles of this community
            and maintain a spirit of openness, collaboration and respect.
            <br />
            <br />
            Our Service encourages the exchange of ideas and creativity within
            our community. By contributing your User-Generated Content, you are
            granting others the opportunity to build upon and draw inspiration
            from your works, while still retaining the copyright to your
            original creations.
            <br />
            <br />
            Keep in mind, your User-Generated Content is yours. You are simply
            granting a license for us and others to use them, but you still hold
            the copyright to your creations.
            <br />
            <br />
            We are closely monitoring the ongoing legal debates regarding
            copyright and intellectual property rights for AI-generated content
            in various jurisdictions. We encourage all users to understand their
            rights and responsibilities under their local laws as well as
            international law.
            <br />
            <br />
            You represent and warrant that you have all rights necessary to
            submit the User-Generated Content and you also represent and warrant
            that such User-Generated Content does not violate any proprietary or
            intellectual property rights, public rights, or any other applicable
            law.
            <br />
            <br />
            The use of automated systems or software to extract data from the
            Service for commercial purposes, ('screen scraping') is prohibited.
            We reserve the right to take necessary legal or other actions
            against any users found to be engaging in such behavior. This
            includes but is not limited to potential litigation and/or account
            suspension or termination.
            <br />
            <br />
            We reserve the right, but are not obligated, to remove or refuse to
            distribute any User-Generated Content on the Service. We also
            reserve the right to access, read, preserve, and disclose any
            information as we reasonably believe is necessary to (i) satisfy any
            applicable law, regulation, legal process or governmental request,
            (ii) enforce the Terms, including investigation of potential
            violations, (iii) detect, prevent, or otherwise address fraud,
            security or technical issues, (iv) respond to user support requests,
            or (v) protect the rights, property or safety of our users and the
            public.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            Under no circumstances we at Craftura AI, its directors, employees,
            associates, agents, suppliers, or affiliates be held liable for any
            indirect, incidental, special, consequential, or punitive damages of
            any kind whatsoever from your use of this Service. This includes,
            but is not limited to, damages for loss of profits, goodwill, use,
            data, or other intangible losses, whether based in contract, tort,
            negligence, strict liability, or otherwise, arising out of or in
            connection with access to, use of, misuse of, or inability to access
            the Service.
            <br />
            <br />
            By agreeing to these terms, you hereby waive any and all claims
            against Craftura AI, its directors, employees, associates, agents,
            suppliers, or affiliates. This waiver includes, but is not limited
            to, claims related to the use, misuse, or inability to use the image
            generation services on our platform, as well as any claims related
            to injury, personal, psychological, or emotional distress arising
            from viewing images on our platform. You also expressly agree not to
            initiate any form of legal proceedings against us with respect to
            such claims.
            <br />
            <br />
            Craftura AI holds no responsibility for the images produced, shared
            or displayed by users of the Service, whether on our platform or
            elsewhere and disclaims any liability and responsibility for any
            unlawful, inappropriate, copyright infringing, or offensive content
            generated by users who are the owners to the images. Although we
            strive to enforce rigorous content monitoring and removal practices
            for content found to be in violation of applicable laws,
            regulations, or our community guidelines, the ultimate
            responsibility for the creation and distribution of such content
            rests solely with the user.
          </p>
          <h2>Governing Law</h2>
          <p>
            This Terms of Service ("Agreement") shall be governed by and
            interpreted in accordance with the laws of the jurisdiction in which
            the Company is registered, without regard to its conflict of law
            provisions. The parties irrevocably agree that any legal proceeding
            seeking the enforcement or interpretation of this Agreement shall be
            brought in the appropriate courts of the same jurisdiction.{" "}
          </p>
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion. By
            continuing to access or use our Service after any revisions become
            effective, you agree to be bound by the revised terms. If you do not
            agree to the new terms, you are no longer authorized to use the
            Service.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
