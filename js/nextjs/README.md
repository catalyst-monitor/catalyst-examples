This is an example of a [Next.js](https://nextjs.org/) project running [Catalyst](https://www.catalystmonitor.com). Please see the other examples for other frameworks.

## Set up example

To set up Catalyst, all you need to do is update [next.config.mjs](next.config.mjs) as shown. Wrap your existing Next config, and Catalyst will auto-instrument itself.

## Running the example

1. If you haven't already, sign up for Catalyst at [app.catalystmonitor.com](https://app.catalystmonitor.com), and get your public and private keys from the "Settings" page.
2. Copy catalyst.example.mjs as catalyst.mjs
   
   ```bash
   cp catalyst.example.mjs catalyst.mjs
   ```

3. Update your new catalyst.mjs file with your public and private keys.

4. Run the development server:

   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

You can also see the more detailed [documentation](https://docs.catalystmonitor.com).