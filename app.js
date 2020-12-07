const express = require('express'); //подключение пакета express
const exhbs = require('express-handlebars'); //подключение библиотеки handlebars
const products = require('./products.json'); //подключение database

const PORT = process.env.PORT || 4444;

const app = express(); //вызов функции express() возвращает объект app методами которого создается web-server

app.use(express.static('public')); //регистрация настройки раздачи стат.ресурсов(img,css,js) прослойка, пропускает запрос через адрес ('public'), что позволяет appserver видеть(обрабатывать)ресурсы
app.set('view engine', 'hbs'); //регистрация движка express на handlebars (по-умолчанию стоит pug - https://pugjs.org/api/getting-started.html)
app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
  }), // настройка конфигурации view engine (устанавливает расширение hbs)
);
//запрос по маршруту url localhost:4444/ вызывает регистрацию слушателя входящего соединения
// req - request(запрос); console.log(req.url) ==> "/"
// res - response(ответ); res.send({key: value}) ==> in browser {"key":"value"} typeOf - json;
app.get('/', (req, res) => {
  res.render('home'); //рендерит содержимое (home) из handlebar (views/home.hbs) в {layouts: 'main'} вместо {{{body}}}; и переводит в HTML
});
//запрос по маршруту url localhost:4444/about вызывает регистрацию слушателя входящего соединения
// req.url ==> "/about"
// res.send('<h1>Hi. This is /about</h1>') ==> in browser: h1 string
app.get('/about', (req, res) => {
  res.render('about', { cssFileName: 'about', pageTitle: 'О нас' }); //передача css в виде параметра cssFileName; title в виде параметра pageTitle в main.hbs
});
//запрос по маршруту url localhost:4444/products вызывает регистрацию слушателя входящего соединения
app.get('/products', (req, res) => {
  res.render('products', {
    products,
    cssFileName: 'products',
    pageTitle: 'Наши продукты',
  }); //передача объекта настроек {{#each products}}, css (stylesheets/products.css) в products
});

app.get('/product/:productId', (req, res) => {
  // : в пути "/:productId" указатель динамич.параметров
  console.log(req.params);
  // сравнение по id для перехода на страницу товара
  const product = products.find(p => p.id === req.params.productId);

  res.render('product', {
    product,
    cssFileName: 'products',
    pageTitle: 'Информация о товаре',
  });
});

app.listen(PORT, () => {
  console.log(`Application server is running on port ${PORT}`);
});
