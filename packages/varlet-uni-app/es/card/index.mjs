import Card from './Card.mjs';
Card.install = function (app) {
  app.component(Card.name, Card);
};
export { props as cardProps } from './props.mjs';
export var _CardComponent = Card;
export default Card;