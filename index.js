'use strict';

const serve  = require('koa-static');
const Koa    = require('koa');
const app    = new Koa();
const path   = require('path');
const router = require('koa-router')();
const render = require('koa-art-template');

render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async (ctx, next) => {
	var recommends = [
		{
			title: '这单身狗也是没谁了！',
			link: '/baozou/2017010102123'
		},
		{
			title: '假期就想这么过。',
			link: '/baozou/2017010102124'
		},
		{
			title: '美女你的钥匙掉了！',
			link: '/meinv/20171010112'
		}
	];

	await ctx.render('index', { recommends: recommends });
});

router.get('/:channel', async (ctx, next) => {
	await ctx.render('channel', { channel: ctx.params.channel });
});

router.get('/:date/:id', async (ctx, next) => {
	// ctx.params.id
	await ctx.render('detail', { date: ctx.params.date, title: ctx.params.id, channel: '暴走' });
});

app
	.use(serve('assets'))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
