import test from 'node:test'
import assert from 'node:assert/strict'

import {
  detectDelimiter,
  csvToRows,
  rowsToMarkdown,
  textToRows,
  markdownToRows,
  markdownToCsv,
  cleanMarkdownTable
} from './parsers.js'

test('detects comma delimiter', () => {
  const input = `name,age,city
Manuel,28,Barcelona`

  assert.equal(detectDelimiter(input), ',')
})

test('detects semicolon delimiter', () => {
  const input = `name;age;city
Manuel;28;Barcelona`

  assert.equal(detectDelimiter(input), ';')
})

test('detects tab delimiter', () => {
  const input = `name\tage\tcity
Manuel\t28\tBarcelona`

  assert.equal(detectDelimiter(input), '\t')
})

test('detects pipe delimiter', () => {
  const input = `name|age|city
Manuel|28|Barcelona`

  assert.equal(detectDelimiter(input), '|')
})

test('parses quoted commas correctly', () => {
  const input = `name,age,city
"Doe, John",31,"New York, NY"`

  assert.deepEqual(csvToRows(input), [
    ['name', 'age', 'city'],
    ['Doe, John', '31', 'New York, NY']
  ])
})

test('parses escaped quotes correctly', () => {
  const input = `name,description
John,"He said ""hello"" yesterday"`

  assert.deepEqual(csvToRows(input), [
    ['name', 'description'],
    ['John', 'He said "hello" yesterday']
  ])
})

test('parses multiline quoted fields correctly', () => {
  const input = `name,description
John,"Line one
Line two"
Jane,"Another value"`

  assert.deepEqual(csvToRows(input), [
    ['name', 'description'],
    ['John', 'Line one\nLine two'],
    ['Jane', 'Another value']
  ])
})

test('keeps empty CSV cells', () => {
  const input = `name,age,city
John,,Barcelona
,28,`

  assert.deepEqual(csvToRows(input), [
    ['name', 'age', 'city'],
    ['John', '', 'Barcelona'],
    ['', '28', '']
  ])
})

test('converts rows to markdown and escapes pipes', () => {
  const rows = [
    ['Name', 'Description'],
    ['John', 'Developer | Designer']
  ]

  assert.equal(
    rowsToMarkdown(rows),
    `| Name | Description |
| --- | --- |
| John | Developer \\| Designer |`
  )
})

test('normalizes inconsistent row lengths without losing data', () => {
  const rows = [
    ['Name', 'Age', 'City'],
    ['John', '28'],
    ['Jane', '26', 'Madrid', 'Extra']
  ]

  assert.equal(
    rowsToMarkdown(rows),
    `| Name | Age | City |  |
| --- | --- | --- | --- |
| John | 28 |  |  |
| Jane | 26 | Madrid | Extra |`
  )
})

test('parses markdown tables without outer pipes', () => {
  const markdown = `Name | Age | City
--- | --- | ---
John | 28 | Barcelona`

  assert.deepEqual(markdownToRows(markdown), [
    ['Name', 'Age', 'City'],
    ['John', '28', 'Barcelona']
  ])
})

test('parses escaped pipes in markdown tables', () => {
  const markdown = `Name | Description
--- | ---
John | Developer \\| Designer`

  assert.deepEqual(markdownToRows(markdown), [
    ['Name', 'Description'],
    ['John', 'Developer | Designer']
  ])
})

test('parses markdown tables with inconsistent columns', () => {
  const markdown = `Name | Age | City
--- | --- | ---
John | 28
Jane | 26 | Madrid | Extra`

  assert.deepEqual(markdownToRows(markdown), [
    ['Name', 'Age', 'City', ''],
    ['John', '28', '', ''],
    ['Jane', '26', 'Madrid', 'Extra']
  ])
})

test('converts markdown tables to CSV', () => {
  const markdown = `| Name | Age | City |
| --- | --- | --- |
| John | 28 | Barcelona |
| Jane | 26 | Madrid |`

  assert.equal(
    markdownToCsv(markdown),
    `Name,Age,City
John,28,Barcelona
Jane,26,Madrid`
  )
})

test('quotes CSV values containing commas', () => {
  const markdown = `| Name | City |
| --- | --- |
| Doe, John | New York, NY |`

  assert.equal(
    markdownToCsv(markdown),
    `Name,City
"Doe, John","New York, NY"`
  )
})

test('parses generic key-value text', () => {
  const input = `Project: Markdown AI Tools
Location: Barcelona
Status: Development`

  assert.deepEqual(textToRows(input), [
    ['Field', 'Value'],
    ['Project', 'Markdown AI Tools'],
    ['Location', 'Barcelona'],
    ['Status', 'Development']
  ])
})

test('parses generic comma-separated text', () => {
  const input = `Name,Age,City
John,28,Barcelona
Jane,26,Madrid`

  assert.deepEqual(textToRows(input), [
    ['Name', 'Age', 'City'],
    ['John', '28', 'Barcelona'],
    ['Jane', '26', 'Madrid']
  ])
})

test('turns plain lists into one-column tables', () => {
  const input = `- Markdown
- CSV
- Text conversion`

  assert.deepEqual(textToRows(input), [
    ['Item'],
    ['Markdown'],
    ['CSV'],
    ['Text conversion']
  ])
})

test('cleans and formats broken markdown tables', () => {
  const input = `Name | Age
John | 28
Jane | 26 | Madrid`

  assert.equal(
    cleanMarkdownTable(input),
    `| Name | Age |  |
| --- | --- | --- |
| John | 28 |  |
| Jane | 26 | Madrid |`
  )
})
