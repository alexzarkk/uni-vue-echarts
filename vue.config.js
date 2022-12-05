const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
module.exports = {
	outputDir: './build',
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true )
			})
		]
	},
	devServer: {
		port: 8080,
		open: false,
		compress: false,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			"/dev": {
				target: "https://*.com",
				changeOrigin: true,
				pathRewrite: {
					"^/dev": ""
				}
			}
		}
	}
}