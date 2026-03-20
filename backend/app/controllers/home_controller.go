package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/HaikalFrastiawan/go-online-shop/app/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm" // Import gorm agar mengenali tipe data db
)

// Kita ubah agar menerima *gorm.DB sebagai parameter
func Home(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// 1. Buka izin CORS
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		vars := mux.Vars(r)
		id := vars["id"]

		if id != "" {
			var product models.Product
			if err := db.Preload("ProductImages").Where("id = ?", id).First(&product).Error; err != nil {
				http.Error(w, "Product not found", http.StatusNotFound)
				return
			}
			json.NewEncoder(w).Encode(product)
			return
		}

		var products []models.Product

		// 2. Gunakan db yang di-passing dari parameter atas
		db.Preload("ProductImages").Find(&products)

		err := json.NewEncoder(w).Encode(products)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
