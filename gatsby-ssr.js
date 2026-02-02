import * as React from "react"

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
    setHeadComponents([
        <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            key="google-fonts-preconnect"
        />,
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
            key="gstatic-preconnect"
        />,
        <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
            rel="stylesheet"
            key="source-code-pro-font"
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