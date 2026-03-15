package app

import (
	"github.com/HaikalFrastiawan/go-online-shop/app/controllers"
	"github.com/gorilla/mux"
)

func (server *Server) InitializeRoute() {
	server.Router = mux.NewRouter()
	server.Router.HandleFunc("/", controllers.Home).Methods("Get")
}