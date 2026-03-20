package app

import (
	"net/http"

	"github.com/HaikalFrastiawan/go-online-shop/app/controllers"
	"github.com/gorilla/mux"
)

func (server *Server) InitializeRoute() {
	server.Router = mux.NewRouter()

	server.Router.Use(CORSMiddleware)

	// Serve static files from the public directory
	server.Router.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public/"))))

	server.Router.HandleFunc("/products", controllers.Home(server.DB)).Methods("GET", "OPTIONS")

	server.Router.HandleFunc("/products/{id}", controllers.Home(server.DB)).Methods("GET", "OPTIONS")

	server.Router.HandleFunc("/", controllers.Home(server.DB)).Methods("GET", "OPTIONS")
}
