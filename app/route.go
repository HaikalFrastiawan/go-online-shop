package app

import "github.com/HaikalFrastiawan/go-online-shop/app/controllers"

func (server *Server) InitializeRoute() {
	server.Router.HandleFunc("/", controllers.Home).Methods("Get")
}