import Config from '../Config/DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'

if (Config.useReactotron) {
    // https://github.com/infinitered/reactotron for more options!
    Reactotron
        .configure({name: 'Ignite App'})
        .useReactNative()
        .use(reduxPlugin({onRestore: Immutable}))
        .connect()

    // Let's clear Reactotron on every time we load the app
    Reactotron.clear()

    // Totally hacky, but this allows you to not both importing reactotron-react-native
    // on every file.  This is just DEV mode, so no big deal.
    console.tron = Reactotron

    // swizzle the old one
    const yeOldeConsoleLog = console.log

    // make a new one
    console.log = (...args) => {
        // always call the old one, because React Native does magic swizzling too
        yeOldeConsoleLog(...args)

        // send this off to Reactotron.
        Reactotron.display({
            name: 'CONSOLE.LOG',
            value: args,
            preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
        })
    }
}
