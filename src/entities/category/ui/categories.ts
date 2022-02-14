import { Category } from 'types/types';

const description =
  'В ассортименте торговой сети «Лента» сотни наименований продовольственных товаров: хлебобулочные и кондитерские изделия, замороженные полуфабрикаты, печенье, кофе, подсолнечное масло, молочные продукты, колбасные изделия и многие другие товары. Также в ассортименте представлено множество непродовольственных товаров, изготовленных по специальному заказу сети: одежда и обувь, автотовары, бытовая химия, товары для садоводства, канцелярия, бытовая техника. Все продовольственные товары, выпускаемые под собственными торговыми марками, производятся на предприятиях, проходящих технический аудит производства на соответствие мировым стандартам. Качество продуктов ежемесячно контролируется независимыми аккредитованными экспертными лабораториями.';

const product = {
  _id: '2358275925792359',
  name: 'Салат Лента Сельдь под шубой',
  price: 82.12,
  unitMeasure: '200 г',
  title: 'Салат Лента Сельдь под шубой классический ~200 г',
  description,
  iconUrl:
    'https://imgproxy.sbermarket.ru/imgproxy/size-1646-1646/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIzNzY0Mi9vcmlnaW5hbC8yMTM4NjgucG5nPzE1ODIxODY4NTA.jpg',
  category: 'category1',
};

const category = {
  _id: '124185781573',
  name: 'Готовая еда',
  productsCount: 8,
  iconUrl: 'https://sbermarket.ru/spree/taxons/58701/normal/907.jpg?1630482536',
  products: [
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
  ],
};

const categories: Category[] = [
  category,
  category,
  category,
  category,
  category,
];

export default categories;
