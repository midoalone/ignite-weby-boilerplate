const gulp = require('gulp')
const scanner = require('i18next-scanner')
const merge = require('gulp-merge-json')
const fs = require('fs')
const googleTranslate = require('google-translate')('AIzaSyBf4guDRPjlK7vPJ4i_81XiseqInFfN2wQ')

// Define languages
const languages = ['english', 'ar']

// Extract strings from JS files
gulp.task('extract', function () {
	return gulp.src(['App/Containers/*.js', 'App/Containers/*/*.js', 'App/Components/*.js', 'App/Components/*/*.js', 'App/Navigation/*.js', 'App/Lib/*.js'])
		.pipe(scanner({
			lngs: languages, // supported languages
			resource: {
				// the source path is relative to current working directory
				loadPath: 'languages/backup/{{lng}}.json',

				// the destination path is relative to your `gulp.dest()` path
				savePath: 'languages/backup/{{lng}}.json'
			},
			func: {
				list: ['I18n.t'],
				extensions: ['.js', '.jsx']
			}
		}))
		.pipe(gulp.dest('App/I18n'))
})

// Merge old and newly generated json files
let mergeTasks = []
languages.forEach(function (language) {
	gulp.task('merge_' + language, function () {
		return gulp.src(['App/I18n/languages/backup/' + language + '.json', 'App/I18n/languages/' + language + '.json'])
			.pipe(merge({
				fileName: language + '.json'
			}))
			.pipe(gulp.dest('App/I18n/languages'))
	})

	mergeTasks.push('merge_' + language)
})

// Auto translate english
gulp.task('auto_translate_english', function (done) {
	const filePath = 'App/I18n/languages/english.json'
	let fileContent = fs.readFileSync(filePath, 'utf8')
	let stringsJson = JSON.parse(fileContent)

	let translatedObject = {}
	Object.keys(stringsJson).map((key) => {
		translatedObject[key] = key
	})

	fs.writeFileSync(filePath, JSON.stringify(translatedObject), 'utf8')
	done()
})

// Auto translate arabic
gulp.task('auto_translate_arabic', function (done) {
	const filePath = 'App/I18n/languages/ar.json'
	let fileContent = fs.readFileSync(filePath, 'utf8')
	let stringsJson = JSON.parse(fileContent)

	let translatedObject = stringsJson

	let toBeTranslated = []
	Object.keys(stringsJson).map((key) => {
		if (!stringsJson[key] || stringsJson[key] === '') {
			toBeTranslated.push(key)
		}
	})

	if(toBeTranslated.length > 0) {
		googleTranslate.translate(toBeTranslated, 'ar', function (err, translations) {
			if(translations.length > 0) {
				translations.map((translation) => {
					translatedObject[translation.originalText] = translation.translatedText
				})
			}

			if(translations.originalText && translations.translatedText) {
				translatedObject[translations.originalText] = translations.translatedText
			}

			fs.writeFileSync(filePath, JSON.stringify(translatedObject), "utf8")
		})
	}

	done()
})

// Series of all tasks
gulp.task('lang', gulp.series('extract', gulp.parallel(mergeTasks), gulp.parallel(['auto_translate_english', 'auto_translate_arabic'])))
