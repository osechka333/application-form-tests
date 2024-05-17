# Application-form-tests
The tests for the application form that cover the basic positive and negatives flows

## Overview

This is a sample project for basic test coverage for application form using Playwright and Typescript
The tests created for the https://qa-task.redvike.rocks/ are documented with `test` keyword from Playwright Test:

- Tests can be found in: `/src/tests`

## Test Details

The project contains the UI end-to-end tests for the application form. The tests could be run across all browsers and executed in parallel.
The basic configuration is 2 workers and Chromium browser.

## Page Object Model

The test suites structure is complimented by page object models.

Pages in the context of POM, can be found in `/src/pages`.

## Installing dependencies

In order to install necessary dependencies, the following command should be executed from project root:

`npm install` and `install-browsers`

## Running tests

The following commands are available:

| Script name            | Description                                                                        |
|------------------------| ---------------------------------------------------------------------------------- |
| `npm install-browsers` | Playwright Test doesn't bundle browsers by default, so you need to install them    |
| `npm test`             | Run tests in parallel with chromium, firefox, and webkit browsers in headless mode |
| `npm test-chromium`    | Run tests in parallel with chromium browser in headless mode                       |
| `npm test-firefox`     | Run tests in parallel with firefox browser in headless mode                        |
| `npmtest-webkit`       | Run tests in parallel with webkit browser in headless mode                         |
| `npm codegen`          | Open codegen tool to generate code for todo app                                    |
| `npm debug`            | Run tests in debug mode                                                            |

## Tests run in parallel

Playwright Test runs tests in parallel by default, using multiple worker processes.


## Reports

After each tests run, it generates the index.html file with all test results including the detailed description of time execution, errors, flaky tests and general results. 
