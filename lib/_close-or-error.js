'use strict'

module.exports = function closeOrError (fsStream, done) {
  fsStream.once('close', handleClose)
  fsStream.once('error', handleError)

  function handleClose () {
    fsStream.removeListener('error', handleError)
    done()
  }

  function handleError (error) {
    fsStream.removeListener('close', handleClose)
    done(error)
  }
}
