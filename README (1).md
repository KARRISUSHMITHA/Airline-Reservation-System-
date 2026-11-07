<div align="center">

# ✈️ AeroBook

### Smart Airline Reservation System

*An Object-Oriented Programming project demonstrating Abstraction, Encapsulation, Inheritance and Polymorphism in a real-world web application.*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![OOP](https://img.shields.io/badge/Paradigm-OOP-1d4ed8)
![License](https://img.shields.io/badge/License-MIT-green)

[**Live Demo**](https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/)

</div>

---

## Table of Contents

1. [About the Project](#about-the-project)
2. [Key Features](#key-features)
3. [OOP Principles Implemented](#oop-principles-implemented)
4. [Class Hierarchy](#class-hierarchy)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [Getting Started](#getting-started)
8. [Deployment](#deployment)
9. [Limitations](#limitations)
10. [License](#license)

---

## About the Project

**AeroBook** is a single-page airline reservation website built as an academic project to show how the four pillars of Object-Oriented Programming apply to a realistic problem. Users can search flights, choose a cabin and seat, apply fare categories and promo codes, pay, receive an e-ticket with a PNR, and cancel for a refund. The refund amount depends on the airline type and the time left before departure.

The website runs entirely in the browser. It needs no backend, database or build step.

## Key Features

| Module | Description |
|---|---|
| **Flight Search** | Search routes across India and international destinations |
| **Airline Comparison** | Six partner airlines across three service tiers, each with its own pricing, baggage, meal and pet policy |
| **Cabin & Seat Selection** | Interactive seat map with cabin class pricing |
| **Special Fares** | Student, Senior Citizen and Armed Forces discounts with age-based eligibility |
| **Promo Codes** | Discount codes applied at checkout |
| **Meals & Pets** | Pre-order meals (price varies by airline tier) and pet travel rules |
| **Booking & Payment** | Fare summary, payment and PNR-based e-ticket generation |
| **Cancellation & Refund** | Automatic refund calculation based on airline policy and hours left |
| **Flight Status** | Look up the status of a flight |
| **User Accounts** | Registration, login and editable profile |
| **Admin Panel** | Role-based administrator login and dashboard |

## OOP Principles Implemented

### 1. Abstraction
`Airline` is an **abstract class**. It defines *what* every airline must do (`fare()`, `refund()`, `meal()`) without saying *how*. It cannot be instantiated directly: the constructor throws an error if `new.target === Airline`.

```js
class Airline {
  constructor(name, code, mult, bag, pet) {
    if (new.target === Airline) throw Error('Airline is abstract');
    Object.assign(this, { name, code, mult, bag, pet });
  }
  fare(base)         { throw Error('implement fare()'); }
  refund(paid, hrs)  { throw Error('implement refund()'); }
  meal(price)        { throw Error('implement meal()'); }
}
```

### 2. Encapsulation
Sensitive data is kept in **private fields** (`#`) and exposed only through controlled methods, getters and setters.

- `Store` keeps all bookings in a private `#b` array. Outside code can only use `add()`, `find()` and `cancel()`.
- `UserStore` keeps users in private `#u`, hashes passwords in a private `#h()` method, and strips the password hash before returning a user through `#pub()`.
- `AdminUser` keeps `#name`, `#pw` and `#last` private. The `name` setter validates input before changing the value.

```js
class AdminUser {
  #name; #pw; #last = '';
  get name()  { return this.#name; }
  set name(v) { if (v && v.trim().length > 1) this.#name = v.trim(); }
  login()     { this.#last = new Date().toLocaleString(); }
}
```

### 3. Inheritance
Subclasses reuse and extend the behaviour of their parent classes.

- `LowCost`, `FullService` and `Premium` all inherit from `Airline`.
- `Premium` extends `FullService`, forming a **multi-level** hierarchy, and calls `super.fare()` to build on its parent's pricing.
- `Regular`, `StudentFare`, `SeniorFare` and `ArmedFare` all inherit from `FareCategory`.

### 4. Polymorphism
The same method call produces different results depending on the object's actual class. The booking code calls `airline.fare()`, `airline.refund()` and `airline.meal()` without knowing which kind of airline it holds.

| Method | `LowCost` | `FullService` | `Premium` |
|---|---|---|---|
| `fare(base)` | `base × multiplier` | `base × multiplier + 500` | `FullService fare + 1500` |
| `refund(paid, hrs)` | 70% (>24h) / 40% | 90% (>24h) / 60% | 95% (>24h) / 75% |
| `meal(price)` | Full price | 50% off | Free |

`FareCategory` subclasses likewise override `eligible(age)`, so each fare type applies its own rules:

```js
class StudentFare extends FareCategory { eligible(a) { return a >= 12 && a <= 35; } }
class SeniorFare  extends FareCategory { eligible(a) { return a >= 60; } }
```

## Class Hierarchy

```
Airline (abstract)                       FareCategory
├── LowCost                              ├── Regular
└── FullService                          ├── StudentFare
    └── Premium                          ├── SeniorFare
                                         └── ArmedFare

Store            (private bookings)
UserStore        (private users, hashed passwords)
AdminUser        (private name / password / last login)
```

## Tech Stack

- **HTML5**: structure
- **CSS3**: styling and responsive layout (embedded)
- **JavaScript (ES2022)**: OOP logic, using classes, private fields (`#`), getters/setters and `new.target`
- **Google Fonts**: Bricolage Grotesque
- **Web Storage API**: browser `localStorage` for persistence

No frameworks or external libraries.

## Project Structure

```
aerobook/
├── index.html    # Complete application (HTML + CSS + JavaScript)
└── README.md     # Project documentation
```

## Getting Started

**Prerequisites:** any modern browser (Chrome, Edge, Firefox, Safari).

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 2. Open the project folder
cd YOUR-REPO-NAME

# 3. Open index.html in your browser
```

No installation or server is required.

## Deployment

The site is hosted with **GitHub Pages**:

1. Open the repository **Settings → Pages**.
2. Set **Source** to *Deploy from a branch*, then choose `main` and `/ (root)`.
3. Click **Save**. The site goes live in 1–2 minutes.

## Limitations

- This is an academic demo. Payments and bookings are **simulated**.
- All data is stored in the user's browser (`localStorage`) and is not shared across devices.
- Password handling uses a simple client-side hash for demonstration and is **not production-grade security**.
- Flight data is generated for demonstration and is not live.

## License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">
Built with ❤️ to demonstrate Object-Oriented Programming
</div>
