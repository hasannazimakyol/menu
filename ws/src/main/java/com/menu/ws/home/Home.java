package com.menu.ws.home;

// import java.util.ArrayList;
// import java.util.List;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.OneToMany;

// @Entity
// public class Home {
//     @Id
//     @GeneratedValue
//     private Long id;

//     private String name;

//     @OneToMany(mappedBy = "home", cascade = CascadeType.ALL)
//     private List<HomeIngredient> ingredients = new ArrayList<>();

//     @OneToMany(mappedBy = "home", cascade = CascadeType.ALL)
//     private List<ShoppingList> shoppingLists = new ArrayList<>();
// }