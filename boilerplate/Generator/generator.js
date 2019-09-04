//imports
const util = require("util")
const fs = require("fs")
const ejs = require("ejs")
const replace = require('replace-in-file')

//promisify
const mkdir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)

let config = JSON.parse(fs.readFileSync('Generator/config.json'))

const camelToTitle = (camelCase) => camelCase
	.replace(/([A-Z])/g, (match) => ` ${match}`)
	.replace(/^./, (match) => match.toUpperCase())
	.trim()


async function generateTemplates() {
	let importedFiles = '//START Import Screens\n'

	config.files.map(async (name) => {
		await render(name)
	})

	// Add to imported files
	config.files.map((name) => {
		let fileParts = name.split("/"),
			fileName = fileParts[fileParts.length - 1]

		importedFiles += `import ${fileName} from '../Containers/${name}'\n`
	})

	importedFiles += '//END Import Screens'

	const options = {
		files: 'App/Navigation/AppNavigation.js',
		from: /\/\/START Import Screens[^\0]*?\/\/END Import Screens/g,
		to: importedFiles,
	}

	const results = await replace(options)
	console.log('Replacement results:', results)
}

async function render(name) {
	let fileParts = name.split("/"),
		fileName = fileParts[fileParts.length - 1],
		levels = '../../'

	let folder = `App/Containers/${name}`
	let fileDestination = `App/Containers/${name}.js`

	if (fs.existsSync(fileDestination)) {
		return true
	}

	try {
		//create output directory
		const dirPath = folder.split('/')
		dirPath.forEach(async (element, index) => {
			if (!fs.existsSync(dirPath.slice(0, index + 1).join('/')) && index < dirPath.length - 1) {
				levels += '../'
				await mkdir(dirPath.slice(0, index + 1).join('/'))
			}
		})

		//render ejs template to js

		const template = await ejs
			.renderFile('Generator/templates/ContainerTemplate.ejs', {
				name: fileName,
				title: camelToTitle(fileName),
				levels
			})
			.then(output => output)

		//create file and write html
		await writeFile(fileDestination, template, "utf8")

	} catch (error) {
		console.log(error)
	}
}

generateTemplates().then(output => output)
