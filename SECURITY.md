# Security Policy

## Reporting a vulnerability

Do not publish security vulnerabilities in a public issue. Send a private report to the repository owner with:

- A clear description of the vulnerability.
- The affected route or feature.
- Reproduction steps.
- Expected and observed behavior.
- The potential impact.

Do not include real customer data, access tokens, API keys, or destructive proof-of-concept payloads.

## Supported version

Security fixes are applied to the current `main` branch.

## Operational requirements

- Rotate all production secrets periodically and immediately after suspected exposure.
- Require multi-factor authentication on deployment, database, billing, and source-control accounts.
- Apply database migrations before deploying application code that depends on them.
- Restrict service tokens to the minimum required scopes.
- Configure a shared production rate limiter and centralized audit logging before high-volume use.
