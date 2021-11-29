# Coding Assignment

## Background

[`npm audit`](https://docs.npmjs.com/cli/v7/commands/npm-audit) is a command line tool that queries [npm](https://docs.npmjs.com/about-npm)'s database of [security advisories](https://www.npmjs.com/advisories) in order to see if any third-party dependencies in a given [Node.js](https://nodejs.org) project are known to be vulnerable to [security exploits](https://en.wikipedia.org/wiki/Exploit_(computer_security)).

## Problem Statement

Given a list of vulnerable third-party dependencies, all with metadata on how severe the vulnerabilities are, we would like you to write a program that only shows those dependencies with the most severe security issues so that someone looking at the data can focus on the most important issues first.

In order of severity, the possible levels of severity are `info`, `low`, `moderate`, `high` and `critical`, where `critical` is the most severe.

For example, if an application had 3 `high` severity vulnerabilities, 1 `moderate`, but no `critical`s, then only output the `high` vulnerabilities. If it had any `critical`s, then your program would output only those.

## Example input

Your program will need to take the provided input, in JSON format.

You'll notice that there are 12 libraries listed with security vulnerabilities.

## Example output

And produce the provided output, also in JSON format.

You'll notice that there are now only 2 libraries listed – those with `high` severity vulnerabilities.

The order (of the vulnerabilities, or of the properties of the object) does **not** matter.