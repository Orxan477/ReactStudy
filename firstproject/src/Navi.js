import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Badge,
} from "reactstrap";

export default class Navi extends Component {
  render() {
    //#region
    // var emptyClass = document.getElementById("empty");
    // if (this.props.cart.length === 0) {
    //   emptyClass.innerHTML = "Empty";
    // } else {
    //   emptyClass.innerHTML = "";
    // }
    //#endregion
    return (
      <div>
        <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">First Project</NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <Link>
                <Link to="/form1/">Form Demo 1</Link>
              </Link>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  Your Cart - {this.props.cart.length}
                </DropdownToggle>
                <DropdownMenu right>
                  {/* <h3 id="empty"></h3> */}
                  {this.props.cart.map((product) => (
                    <DropdownItem key={product.id}>
                      <Badge
                        color="danger"
                        onClick={() =>
                          this.props.removeFromCard(product.product)
                        }
                      >
                        X
                      </Badge>
                      ---
                      <Badge
                        color="warning"
                        onClick={() =>
                          this.props.quantityMinusCard(product.product)
                        }
                      >
                        -
                      </Badge>
                      --- {product.product.productName} ---
                      <Badge color="success"> {product.quantity}</Badge>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Orxan477</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
