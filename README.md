# SOLUTION REDEFINED static website

## Local development
Run `npm install`, then `npm run dev`. Create a production build with `npm run build`; upload every file inside `dist/` to your GoDaddy hosting `public_html` directory.

## GoDaddy deployment
1. In GoDaddy cPanel/File Manager, open `public_html` for the connected domain.
2. Upload the contents of `dist/` (not the `dist` folder itself), replacing the default page.
3. If DNS is managed elsewhere, point the domain's A record to the hosting IP supplied by GoDaddy; use a `www` CNAME to the root domain if required.
4. Enable SSL in GoDaddy's SSL management and force HTTPS after the certificate is issued.

The site uses section navigation, so no server-side routing fallback is needed. Replace the logo placeholder in `src/main.tsx` with the supplied official cropped asset once it is available.
