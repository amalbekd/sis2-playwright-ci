# AI usage – SIS 2 (CI pipeline for Playwright)

**Model:** Claude Sonnet 5.5 (Anthropic), via claude.ai chat.

## Prompt
I pasted the full assignment guide "SIS 2: CI pipeline for Playwright" and asked: "I need to do this, can you do it?"

## What the AI produced
- `playwright.config.ts` with a CI branch (`forbidOnly`, `retries: 2`, `junit` + `blob` reporters, `trace: 'on-first-retry'`);
- `merge.config.ts` for merging shard reports into HTML + JUnit;
- `.github/workflows/playwright.yml`: push/PR triggers, npm cache, 4-shard matrix, merge-reports job, artefacts with 14-day retention;
- the CI section for the README and the `.gitignore` additions.

The files follow the structure given in the assignment guide.

## What I did myself
- Adapted `testDir`, `baseURL` and `BASE_URL` to my SIS 2 project.
- Ran the tests locally, pushed a feature branch, opened a PR and merged into `main`.
- Measured the 1-shard vs 4-shard timings on GitHub Actions and filled in the README table, links and conclusion.
- Checked the artefacts, the traces and the status badge.
