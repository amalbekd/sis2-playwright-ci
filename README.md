

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
| 1 job, no sharding | 1m 3s | 6s | [run](https://github.com/amalbekd/sis2-playwright-ci/actions/runs/45039002609) |
| 4 shards + merge | 50s | 3s | [run](https://github.com/amalbekd/sis2-playwright-ci/actions/runs/45039330113) |

Median of runs via workflow_dispatch / PR runs. Conclusion: For a small test suite of 8 fast checks, running 4 shards in parallel reduces both the test step time and median total workflow duration slightly while adding parallel shard and report-merge overhead.

### Running locally

    npm ci
    npx playwright install --with-deps chromium
    CI=true npx playwright test
