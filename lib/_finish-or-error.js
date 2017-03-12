'use strict'

module.exports = function finishOrError (fsStream, done) {
  fsStream.once('finish', handleFinish)
  fsStream.once('error', handleError)

  function handleFinish () {
    fsStream.removeListener('error', handleError)
    done()
  }

  function handleError (error) {
    fsStream.removeListener('finish', handleFinish)
    done(error)
  }
}
