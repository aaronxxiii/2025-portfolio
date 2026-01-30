import * as React from "react"

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
    setHeadComponents([
        <link
            rel="preload"
            href="../fonts/InterVariable.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            key="interFont"
        />,
        <script
            key="netlify-identity-widget"
            src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />,
    ])

    setPostBodyComponents([
        <script
            key="netlify-identity-redirect"
            dangerouslySetInnerHTML={{
                __html: `
                    if (window.netlifyIdentity) {
                        window.netlifyIdentity.on("init", user => {
                            if (!user) {
                                window.netlifyIdentity.on("login", () => {
                                    document.location.href = "/admin/";
                                });
                            }
                        });
                    }
                `,
            }}
        />,
    ])
}