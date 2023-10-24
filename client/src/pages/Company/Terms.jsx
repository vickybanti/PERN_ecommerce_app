import React from "react";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function Terms() {
  return (
    <>
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container pt-3 pb-5" style={{ fontSize: "1em" }}>
          <h1 className="main-header py-5">terms and conditions</h1>
          <p>
            We provide services to you subject to the notices, terms, and
            conditions set forth in this agreement. Besides, you will obey the
            rules, guidelines, policies, terms, and conditions applicable to
            such services before you use them. We reserve the right to change
            this site and these terms and conditions at any time.
          </p>
          <p>
            Before proceeding, please read this agreement because accessing,
            browsing, or otherwise using the Site indicates your agreement to
            all the terms and conditions in this agreement.
          </p>
          <p>
            You shall not upload, distribute, or otherwise publish through this
            Site any Content, information, or other material that (a) includes
            any bugs, viruses, worms, trap doors, Trojan horses, or other
            harmful code or properties; (b) is libelous, threatening,
            defamatory, obscene, indecent, pornographic, discriminatory, or
            could give rise to any civil or criminal liability under the laws of
            the U.S. or the laws of any other country that may apply; or
            (c)violates or infringes upon the copyrights, patents, trademarks,
            service marks, trade secrets, or other proprietary rights of any
            person. &nbsp;
            <a href="/">Ayaba.com</a>&nbsp;may give you an account
            identification and password to enable you to access and use certain
            portions of this Site. Each time you use a password or
            identification, you are deemed to be authorized to access and use
            the Site in a manner consistent with the terms and conditions of
            this agreement, and &nbsp;
            <a href="/">Ayaba.com</a>&nbsp;has no obligation to investigate the
            source of any such access or use of the Site.
          </p>
          <p>
            By accepting these Terms of Use through your use of the Site, you
            certify that you are 18 years of age or older. If you are under 18
            years old please use this Site only under the supervision of a
            parent or legal guardian. Subject to the terms and conditions of
            this agreement, hereby grants you a limited, revocable,
            non-transferable, and non-exclusive license to access and use the
            Site by displaying it on your Internet browser only for the purpose
            of shopping and not for any commercial use or use on behalf of any
            third party, except as explicitly permitted by &nbsp;
            <a href="/">Ayaba.com</a>&nbsp;in advance. Any violation of this
            Agreement shall result in the immediate revocation of the license
            granted in this paragraph without notice to you.
          </p>
          <p>
            Unless explicitly permitted by our company in advance, all
            materials, including images, text, illustrations, designs, icons,
            photographs, programs, music clips or downloads, video clips and
            written and other materials that are part of this Site
            (collectively, the “Contents”) are intended solely for personal,
            non-commercial use. You may not make any commercial use of any of
            the information provided on the Site or make any use of the Site for
            the benefit of another business. We reserve the right to refuse
            service, terminate accounts, and/or cancel orders in its discretion,
            including, without limitation, if we believe that customer conduct
            violates applicable laws or is harmful to our interests. You may not
            reproduce, distribute, display, sell, lease, transmit, create
            derivative works from, translate, modify, reverse-engineer,
            disassemble, decompile, or otherwise exploit this Site or any
            portion of it unless expressly permitted by our company in writing.
          </p>
          <p>
            You will be solely responsible for all access to and use of this
            site by anyone using the password and identification originally
            assigned to you whether or not such access to and use of this site
            is actually authorized by you, including without limitation, all
            communications and transmissions and all obligations (including
            without limitation financial obligations) incurred through such
            access or use. You are solely responsible for protecting the
            security and confidentiality of the password and identification
            assigned to you. You shall immediately notify &nbsp;
            <a href="/">Ayaba.com</a>&nbsp;of any unauthorized use of your
            password or identification or any other breach or threatened breach
            of this Site’s security.
          </p>
        </div>
      </div>
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Terms;
