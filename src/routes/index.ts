import user from './user'

export default app => {
  app.use('/', (req, res, next) => {
    next()
  });
  app.use('/user', user)
}