module.exports = {

    webpack: (config, { isServer }) => {


        config.output.hashFunction = "sha256"
        return config;
    },
}
