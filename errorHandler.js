module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = ctx.status >= 400 && ctx.status || 400;
    ctx.body = err.message;
  }
}