## CI

[![Playwright Tests](https://github.com/amalbekd/sis2-playwright-ci/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/amalbekd/sis2-playwright-ci/actions/workflows/playwright.yml)

**CI system:** GitHub Actions. It is built into GitHub, where the repository already lives, needs no server of its own, is free for public repositories and supports matrices for sharding.

**Pipeline** (`.github/workflows/playwright.yml`):
- runs on every push and pull request;
- `npm ci` with the npm cache, Chromium installed with system dependencies;
- the full Playwright suite split into 4 shards (`--shard=i/4`) running in parallel;
- the `merge-reports` job merges the shards' blob reports into one HTML report and JUnit;
- artefacts: `playwright-report` (HTML), `test-results-N` (traces, screenshots, videos, JUnit), `junit-report`; kept for 14 days.

**CI settings** (`playwright.config.ts`, when `CI=true`): `forbidOnly: true`, `retries: 2`, reporters `list`, `blob`, `junit`, `trace: 'on-first-retry'`.

### Runtime

| Configuration | Total run time | Run tests step (slowest shard) | Run |
| --- | --- | --- | --- |
| 1 job, no sharding | X min Y s | X min Y s | [run](LINK) |
| 4 shards + merge | X min Y s | X min Y s | [run](LINK) |

Median of 3 runs via workflow_dispatch. Conclusion: <ONE SENTENCE: e.g. sharding cut the test step from X to Y, but each shard spends ~1 min on setup (checkout, npm ci, browser install), so total time dropped less than 4x.>

### Running locally

    npm ci
    npx playwright install --with-deps chromium
    CI=true npx playwright test
