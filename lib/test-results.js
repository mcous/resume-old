'use strict'

const assert = require('assert')
const path = require('path')

const pkg = require('../package.json')

const TEST_OUTPUT = path.join(__dirname, '../.test-output/test.pdf')

module.exports = TEST_OUTPUT

if (require.main === module) {
  const nodemailer = require('nodemailer')

  const argv = process.argv.slice(2)
  const CWD = process.cwd()
  const COMMAND = path.relative(CWD, process.argv[1])
  const EMAIL_SERVICE = process.env.EMAIL_SERVICE
  const EMAIL_USERNAME = process.env.EMAIL_USERNAME
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

  assert(argv.length === 2, `Usage: node ${COMMAND} <email> <build>`)
  assert(EMAIL_SERVICE, `Usage: Expected $EMAIL_SERVICE to be defined`)
  assert(EMAIL_USERNAME, `Usage: Expected $EMAIL_ACCOUNT to be defined`)
  assert(EMAIL_PASSWORD, `Usage: Expected $EMAIL_PASSWORD to be defined`)

  const email = argv[0]
  const build = argv[1]
  const subject = `${pkg.name} test build ${build} results`
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  })

  transporter.sendMail({
    from: EMAIL_USERNAME,
    to: email,
    subject: subject,
    attachments: {
      path: TEST_OUTPUT
    }
  }, (error, info) => {
    assert.ifError(error)
    console.log(`Results email sent to ${email}`)
    console.log(info.messageId)
    console.log(info.response)
  })
}
