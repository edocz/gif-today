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
	await ctx.render('index');
});

router.get('/:date/:id', async (ctx, next) => {
	await ctx.render('detail', {date: ctx.params.date, id:ctx.params.id});
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
