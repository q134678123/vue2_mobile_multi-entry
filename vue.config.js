// / glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require("glob");
const merge = require("webpack-merge");
const page = function() {
	const entryHtml = glob.sync("src/views" + "/*/*.html"); // 在vue-cli3中配置文件的路径不需要加相对路径，也不需要找绝对路径
	const obj = {};
	entryHtml.forEach(filePath => {
		const filename = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf("."));
		const entryname = filePath.substring(0, filePath.lastIndexOf(".")); // 我为了方便使用的html的路径，最后只是改写后缀
		let conf = {
			entry: entryname + '.ts', // 此处需要注意，如果引用ts和html不同名称与路径的文件，在此处做相应改写
			template: filePath, // 此处是html文件的访问路径
			filename: filename + ".html",
			chunks: ["chunk-vendors", "chunk-common", filename],
		};
		if (process.env.NODE_ENV === "production") {
			conf = merge(conf, {
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true
				},
				chunksSortMode: "dependency"
			});
		}
		obj[filename] = conf
	});
	return obj;
};

module.exports = {
	publicPath: './', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
	outputDir: 'dist', //也可加标识，动态打包到相关文件夹
	pages: page(),
	productionSourceMap: false,
	devServer: {
		open: false, // 项目构建成功之后，自动弹出页面
		host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
		port: 8888, // 端口号，默认8080
		inline: true,
		proxy: {
			'/test': {
				// target: 'http://192.168.2.141:8280',
				// target: 'https://sj.yungujia.com/api',
				target:'http://127.0.0.1',
				changeOrigin: true,
				pathRewrite: {
					'^/test': '/'
				}
			}
		}
	}
}
