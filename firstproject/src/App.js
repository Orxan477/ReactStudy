import { Col, Container, Row } from "reactstrap";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import React, { Component } from "react";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CardLList from "./CardList";
import FormDemo1 from "./FormDemo1";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };
  componentDidMount() {
    this.getProducts();
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  quantityMinusCard = (product) => {
    let card = this.state.cart;
    let pro = card.find((x) => x.product.id === product.id);
    if (pro === "undefined") {
      console.log("tapilmadi");
      return;
    }
    if (pro.quantity > 1) {
      pro.quantity--;
    } else if (pro.quantity === 1) {
      this.removeFromCard(product);
      return;
    } else {
      console.log("Bele bir product yoxdur");
    }
    this.setState({ cart: card });
  };
  removeFromCard = (product) => {
    let card = this.state.cart.filter((x) => x.product.id !== product.id);
    this.setState({ cart: card });
    alertify.error(product.productName + "Remove From Card", 5);
  };

  addToCard = (product) => {
    let newCard = this.state.cart;
    var addedItem = newCard.find((x) => x.product.id === product.id);
    if (addedItem) {
      addedItem.quantity++;
    } else {
      newCard.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCard });
    alertify.success(product.productName + "Add To Card", 5);
  };
  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category list" };
    return (
      <div>
        <Container>
          <Navi
            quantityMinusCard={this.quantityMinusCard}
            removeFromCard={this.removeFromCard}
            cart={this.state.cart}
          />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={productInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      products={this.state.products}
                      addToCard={this.addToCard}
                      currentCategory={this.state.currentCategory}
                      info={categoryInfo}
                    />
                  )}
                ></Route>
                <Route exact path="/cart" component={CardLList}></Route>
                <Route exact path="/form1" component={FormDemo1}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
