const path = require('path');
let webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: {
        polyfill: "babel-polyfill",
        app: "./src/index.js",
        Ajax: "./src/Ajax.js",
        constants: "./src/constants.js",
        GoogleMapStyle: "./src/GoogleMapStyle.js",
        markerclusterer: "./src/markerclusterer.js",
        ContractPopUp: "./src/ContractPopUp.js",
        Booking: "./src/Booking.js",
        Canvas: "./src/Canvas.js",
        webStorageTest: "./src/webStorageTest.js",
        ContractModal: "./src/ContractModal.js",
        Timer: "./src/Timer.js",
        FormatDate: "./src/FormatDate.js",
        Station: "./src/Station.js",
        VeloveMap: "./src/VeloveMap.js",
        Slider: "./src/Slider.js",
        navigation: "./src/navigation.js",
        Menu: "./src/Menu.js",
        LegalNotice: "./src/LegalNotice.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        //library: 'constants',
        //libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    /*resolve: {
        extensions: [' ', '.js'],
        alias: {
            'constants': path.resolve(__dirname, './constants')  // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'constants': 'constants'
        })
    ]*/
};