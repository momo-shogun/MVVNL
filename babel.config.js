module.exports = {
    presets: [
        'module:@react-native/babel-preset',
        'nativewind/babel',
        'react-native-worklets-core/plugin',
    ],
    plugins: [
        // react-native-reanimated plugin
        [
            'react-native-reanimated/plugin',
            {
                globals: ['__labelImage'],
            },
        ],
    ],
}
