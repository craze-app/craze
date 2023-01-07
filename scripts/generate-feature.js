const fs = require('fs')
const path = require('path')
const _ = require('lodash')

let featureName = process.argv[2]

if (!featureName) {
  console.error('Feature name is required!\nExample command: `yarn generate-feature regex-tester`')
  process.exit(1)
}

featureName = featureName.trim()
const camelCaseFeatureName = _.camelCase(featureName)
const pascalCaseFeatureName = `${camelCaseFeatureName[0].toUpperCase()}${camelCaseFeatureName.slice(
  1,
)}`
const kebabCaseFeatureName = _.kebabCase(featureName)

console.log(camelCaseFeatureName, pascalCaseFeatureName, kebabCaseFeatureName)

const templateDir = path.resolve(__dirname, '..', 'template', 'generate-feature')
const files = fs.readdirSync(templateDir)

const tempDir = path.resolve(__dirname, 'temp')
fs.mkdirSync(tempDir)
for (const file of files) {
  let fileContent = fs.readFileSync(path.resolve(templateDir, file), 'utf8')
  fileContent = fileContent.replace(/{{featureName}}/g, camelCaseFeatureName)
  fileContent = fileContent.replace(/{{FeatureName}}/g, pascalCaseFeatureName)
  fileContent = fileContent.replace(/{{feature-name}}/g, kebabCaseFeatureName)
  fs.writeFileSync(path.resolve(tempDir, file), fileContent)
}

for (const file of files) {
  fs.renameSync(path.resolve(tempDir, file), path.resolve(tempDir, file))
}

const targetDir = path.resolve(__dirname, '..', 'src', 'features', kebabCaseFeatureName)
fs.mkdirSync(targetDir)

for (const file of files) {
  let newFileName = file.replace(/{{FeatureName}}/g, pascalCaseFeatureName)
  newFileName = newFileName.replace(/\.txt/g, '')
  fs.renameSync(path.resolve(tempDir, file), path.resolve(targetDir, newFileName))
}

fs.rmdirSync(tempDir, { recursive: true })

console.log('Feature files created, you can add your feature to `src/features.tsx` now!')
