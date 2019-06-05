import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Home from "../components/Home";
import About from "../components/About";
import ErrorPage from "../components/ErrorPage";
import BookingForm from '../components/BookingForm';
import CustomerDetail from "../components/CustomerDetail";
import RestaurantTableDetail from "../components/RestaurantTableDetail";
import BookingDetail from "../components/BookingDetail";
import TransactionDetail from "../components/TransactionDetail";
import TransactionList from "../components/TransactionList";
import BookingList from "../components/BookingList";
import CustomerList from "../components/CustomerList";
import CustomerForm from "../components/CustomerForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class RestaurantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayBookings: [],
      bookings: [],
      customers: [],
      transactions: [],
      restaurantTables: [],
      selectedCustomer: {
        id: 3,
        name: "Maria",
        phone: "07293940234",
        email: "Maria@codeclan.com"
      },
      selectedRestaurantTable: {
        id: 1,
        tableNumber: 1,
        seating: 4,
        _links: {
          self: {
            href: "http://localhost:8080/restaurantTables/1"
          },
          restaurantTable: {
            href: "http://localhost:8080/restaurantTables/1"
          },
          bookings: {
            href:
              "http://localhost:8080/restaurantTables/1/bookings{?projection}",
            templated: true
          }
        }
      },
      selectedBooking: {
        id: 1,
        date: "10-06-2019",
        time: "17:00:00",
        numberInParty: 20,
        notes: "Graduation dinner",
        _embedded: {
          customer: {
            name: "Pim",
            phone: "07392383829",
            email: "Pim@codeclan.com",
            bookings: [
              {
                id: 1,
                date: "10-06-2019",
                time: "17:00:00",
                numberInParty: 20,
                notes: "Graduation dinner"
              }
            ],
            _links: {
              self: {
                href: "http://localhost:8080/customers/1{?projection}",
                templated: true
              },
              bookings: {
                href: "http://localhost:8080/customers/1/bookings{?projection}",
                templated: true
              },
              transactions: {
                href: "http://localhost:8080/customers/1/transactions"
              }
            }
          }
        },
        _links: {
          self: {
            href: "http://localhost:8080/bookings/1"
          },
          booking: {
            href: "http://localhost:8080/bookings/1{?projection}",
            templated: true
          },
          transactions: {
            href: "http://localhost:8080/bookings/1/transactions"
          },
          customer: {
            href: "http://localhost:8080/bookings/1/customer{?projection}",
            templated: true
          },
          restaurantTables: {
            href: "http://localhost:8080/bookings/1/restaurantTables"
          }
        }
      },
      selectedTransaction: {
        id: 1,
        date: "10-06-2019",
        amountPaid: 30,
        amountOwing: 30,
        balance: 0,
        warnings: "",
        _embedded: {
          booking: {
            id: 1,
            numberInParty: 20,
            customer: {
              id: 1,
              name: "Pim",
              phone: "07392383829",
              email: "Pim@codeclan.com"
            },
            restaurantTables: [
              {
                id: 15,
                tableNumber: 15,
                seating: 10
              },
              {
                id: 16,
                tableNumber: 16,
                seating: 10
              }
            ],
            time: "17:00:00",
            date: "2019-06-10",
            _links: {
              self: {
                href: "http://localhost:8080/bookings/1{?projection}",
                templated: true
              },
              transactions: {
                href: "http://localhost:8080/bookings/1/transactions"
              },
              customer: {
                href: "http://localhost:8080/bookings/1/customer{?projection}",
                templated: true
              },
              restaurantTables: {
                href: "http://localhost:8080/bookings/1/restaurantTables"
              }
            }
          },
          customer: {
            name: "Pim",
            phone: "07392383829",
            email: "Pim@codeclan.com",
            bookings: [
              {
                id: 1,
                date: "10-06-2019",
                time: "17:00:00",
                numberInParty: 20,
                notes: "Graduation dinner"
              }
            ],
            _links: {
              self: {
                href: "http://localhost:8080/customers/1{?projection}",
                templated: true
              },
              bookings: {
                href: "http://localhost:8080/customers/1/bookings{?projection}",
                templated: true
              },
              transactions: {
                href: "http://localhost:8080/customers/1/transactions"
              }
            }
          }
        },
        _links: {
          self: {
            href: "http://localhost:8080/transactions/1"
          },
          transaction: {
            href: "http://localhost:8080/transactions/1"
          },
          customer: {
            href: "http://localhost:8080/transactions/1/customer{?projection}",
            templated: true
          },
          booking: {
            href: "http://localhost:8080/transactions/1/booking{?projection}",
            templated: true
          }
        }
      }
    };
  }

  fetchData(url, callback) {
    fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      }
    })
      .then(res => res.json())
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    const today = new Date()
    const year = today.getFullYear()
    const month = `${today.getMonth() + 1}`.padStart(2, 0)
    const day = `${today.getDate()}`.padStart(2, 0)
    const stringDate = [year, month, day].join("-")
    console.log(stringDate);

    this.fetchData(`http://localhost:8080/bookings/date/${stringDate}`, bookings => {
      this.setState({ todayBookings: bookings });
    });

    this.fetchData("http://localhost:8080/bookings", bookings => {
      this.setState({ bookings: bookings._embedded.bookings });
    });
    this.fetchData("http://localhost:8080/customers", customers => {
      this.setState({ customers: customers._embedded.customers });
    });
    this.fetchData("http://localhost:8080/transactions", transactions => {
      this.setState({ transactions: transactions._embedded.transactions });
    });
    this.fetchData(
      "http://localhost:8080/restaurant-tables",
      restaurantTables => {
        this.setState({ restaurantTables: restaurantTables });
      }
    );
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <CustomerForm></CustomerForm>
          <BookingForm customers={this.state.customers} restaurantTables={this.state.restaurantTables}/>
          <Switch>
            <Route exact path="/" render={() => <BookingList bookingsData={this.state.todayBookings} />} />
            <Route path="/about" component={About} />
            <Route
              exact
              path="/customers"
              render={() => <CustomerList customers={this.state.customers} />}
            />
            <Route
              exact
              path="/bookings"
              render={() => <BookingList bookingsData={this.state.bookings} />}
            />
            <Route
              exact
              path="/transactions"
              render={() => (
                <TransactionList transactionsData={this.state.transactions} />
              )}
            />
            <Route component={ErrorPage} />
          </Switch>
        </React.Fragment>
        <CustomerDetail customer={this.state.selectedCustomer} />
        <RestaurantTableDetail
          restaurantTable={this.state.selectedRestaurantTable}
        />
        <BookingDetail booking={this.state.selectedBooking} />
        <TransactionDetail transaction={this.state.selectedTransaction} />
      </Router>
    );
  }
}

export default RestaurantContainer;
