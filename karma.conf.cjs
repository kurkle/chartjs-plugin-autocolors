const istanbul = require('rollup-plugin-istanbul')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const json = require('@rollup/plugin-json')
const env = process.env.NODE_ENV

module.exports = async (karma) => {
  const builds = (await import('./rollup.config.js')).default
  const regex = karma.autoWatch
    ? /chartjs-plugin-autocolors\.cjs$/
    : /chartjs-plugin-autocolors\.min\.js$/
  const build = builds.filter((v) => v.output.file && v.output.file.match(regex))[0]

  if (env === 'test') {
    build.plugins = [
      resolve(),
      json(),
      istanbul({ exclude: ['node_modules/**/*.js', 'package.json'] }),
    ]
  }

  karma.set({
    browsers: ['chrome', 'firefox'],

    customLaunchers: {
      chrome: {
        base: 'Chrome',
        flags: [
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
        ],
      },
      firefox: {
        base: 'Firefox',
        prefs: {
          'layers.acceleration.disabled': true,
        },
      },
    },

    customPreprocessors: {
      fixtures: {
        base: 'rollup',
        options: {
          output: {
            format: 'iife',
            name: 'fixture',
          },
        },
      },
      sources: {
        base: 'rollup',
        options: build,
      },
    },

    files: [
      { included: false, pattern: './test/fixtures/**/*.js' },
      { included: false, pattern: './test/fixtures/**/*.png' },
      'node_modules/chart.js/dist/chart.umd.js',
      'src/index.js',
      'test/index.js',
      'test/specs/**/*.js',
    ],
    frameworks: ['jasmine'],
    logLevel: karma.LOG_WARN,

    preprocessors: {
      'src/index.js': ['sources'],
      'test/index.js': ['rollup'],
    },
    reporters: ['spec', 'kjhtml'],

    rollupPreprocessor: {
      output: {
        format: 'umd',
        name: 'test',
        sourcemap: karma.autoWatch ? 'inline' : false,
      },
      plugins: [resolve()],
    },
  })

  if (env === 'test') {
    karma.reporters.push('coverage')
    karma.coverageReporter = {
      dir: 'coverage/',
      reporters: [
        { subdir: 'html', type: 'html' },
        { subdir: (browser) => browser.toLowerCase().split(/[ /-]/)[0], type: 'lcovonly' },
      ],
    }
  }
}
