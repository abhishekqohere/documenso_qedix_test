import { AppError } from '@documenso/lib/errors/app-error';
import { Hono } from 'hono';

import { GoogleAuthOptions, MicrosoftAuthOptions, OidcAuthOptions } from '../config';
import { handleOAuthCallbackUrl } from '../lib/utils/handle-oauth-callback-url';
import { handleOAuthOrganisationCallbackUrl } from '../lib/utils/handle-oauth-organisation-callback-url';
import type { HonoAuthContext } from '../types/context';

/**
 * Have to create this route instead of bundling callback with oauth routes to provide
 * backwards compatibility for self-hosters (since we used to use NextAuth).
 */
export const callbackRoute = new Hono<HonoAuthContext>()
  /**
   * OIDC callback verification.
   */
  .get('/oidc', async (c) => handleOAuthCallbackUrl({ c, clientOptions: OidcAuthOptions }))

  /**
   * Organisation OIDC callback verification.
   */
  .get('/oidc/org/:orgUrl', async (c) => {
    const orgUrl = c.req.param('orgUrl');

    try {
      return await handleOAuthOrganisationCallbackUrl({
        c,
        orgUrl,
      });
    } catch (err) {
      console.error(err);

      // Send the user back to the page they started the SSO flow from instead
      // of dumping them on a raw 500.
      const returnTo = c.req.query('returnTo');
      if (returnTo) {
        return c.redirect(returnTo);
      }

      if (err instanceof Error) {
        throw new AppError(err.name, {
          message: err.message,
          statusCode: 500,
        });
      }

      throw err;
    }
  })

  /**
   * Google callback verification.
   */
  .get('/google', async (c) => handleOAuthCallbackUrl({ c, clientOptions: GoogleAuthOptions }))

  /**
   * Microsoft callback verification.
   */
  .get('/microsoft', async (c) => handleOAuthCallbackUrl({ c, clientOptions: MicrosoftAuthOptions }));
