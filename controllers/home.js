/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('home', {
    title: 'Home'
  });
};
