module.exports = async (ctx, next) => {
  try {
    console.log('--------------TRY!!!!!!!');
    await next();
  } catch (err) {
    console.error(err);
    console.log('--------------CATCH!!!!!!!');
    // ctx.body = undefined
    ctx.status = ctx.status >= 400 && ctx.status || 400;
    ctx.body = err.message;
    // if (err.message) {
    //   ctx.body = {
    //     errors: [err.message]
    //   }
    // }
  }
}


// ctx.body = err.message ? {errors: [err.message]} : undefined