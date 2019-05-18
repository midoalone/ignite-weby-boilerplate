// Ignite CLI plugin for WebyBoilerplate
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-MODULENAME'
const NPM_MODULE_VERSION = '0.0.1'

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()


const add = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // install an NPM module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true, version: NPM_MODULE_VERSION })

  

  // Example of copying templates/WebyBoilerplate to App/WebyBoilerplate
  // if (!filesystem.exists(`${APP_PATH}/App/WebyBoilerplate`)) {
  //   filesystem.copy(`${PLUGIN_PATH}/templates/WebyBoilerplate`, `${APP_PATH}/App/WebyBoilerplate`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   insert: `import '../WebyBoilerplate/WebyBoilerplate'\n`,
  //   before: `export default {`
  // })
}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  

  // Example of removing App/WebyBoilerplate folder
  // const removeWebyBoilerplate = await context.prompt.confirm(
  //   'Do you want to remove App/WebyBoilerplate?'
  // )
  // if (removeWebyBoilerplate) { filesystem.remove(`${APP_PATH}/App/WebyBoilerplate`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   delete: `import '../WebyBoilerplate/WebyBoilerplate'\n`
  // )
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }

