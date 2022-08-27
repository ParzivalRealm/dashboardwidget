const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../../tsconfig.base.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'demo',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: 'demo',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './apps/widgets/demo/src/app/app.module.ts',
      },

      shared: {
        '@angular/core': {
          singleton: true,
          requiredVersion: '^12.0.0',
        },
        '@angular/common': {
          singleton: true,
          requiredVersion: '^12.0.0',
        },
        '@angular/router': {
          singleton: true,
          requiredVersion: '^12.0.0',
        },
        '@angular/forms': {
          singleton: true,
          requiredVersion: '^12.0.0',
        },
        '@angular/animations': {
          singleton: true,
          requiredVersion: '^12.0.0',
        },
        '@ngrx/store': {
          singleton: true,
          requiredVersion: '^12.0.0',
        },
        '@ngrx/effects': {
          singleton: true,
          requiredVersion: '^12.0.0',
        },
        '@ngx-translate/core': {
          singleton: true,
          requiredVersion: '^13.0.0',
        },
        '@ngx-translate/http-loader': {
          singleton: true,
          requiredVersion: '^6.0.0',
        },

        // web-ui-project dependencies
        '@etm-professional-control/widget-development-kit': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/settings-form-elements': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/dashboard-widgets-base': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/abstract-services': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/oa-rx-js-api': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/oa-rx-js': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/models': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/shared': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/helper': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },
        '@etm-professional-control/notification': {
          singleton: true,
          requiredVersion: '>=2.0.0-0',
        },

        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
