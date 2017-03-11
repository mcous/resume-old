'use strict'

const githubUrl = require('github-url-from-git')

const pkg = require('../package.json')
const dependencies = pkg.dependencies || {}
const devDependencies = pkg.devDependencies || {}

console.log('dependencies\n')
Object.keys(dependencies).map(getDepPkg).forEach(printDep)
console.log('\n')
console.log('dev dependencies\n')
Object.keys(devDependencies).map(getDepPkg).forEach(printDep)

function getDepPkg (name) {
  return require(`${name}/package.json`)
}

function getDepUrl (pkg) {
  return (
    pkg.repository &&
    pkg.repository.url &&
    githubUrl(pkg.repository.url)) || `https://npmjs.org/package/${pkg.name}`
}

function getDepDescription (depPkg) {
  return (depPkg.description || '').trim()
}

function printDep (pkg) {
  console.log(`- [${pkg.name}](${getDepUrl(pkg)}): ${getDepDescription(pkg)}`)
}
