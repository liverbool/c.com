exports.config =
# See http://brunch.io/#documentation for docs.
    paths:
        public: 'vendor'
    files:
        javascripts:
            joinTo:
                'js/script.js': /^bower_components/
            order:
                before: [
                    'bower_components/jquery/jquery.js'
                ]

        stylesheets:
            joinTo:
                'css/style.css': /^bower_components/

    plugins:
        sass:
            options: ['--compass']
    #    jaded:
    #        staticPatterns: /^app(\/|\\)static(\/|\\)(.+)\.jade$/
    #        jade:
    #            pretty: no