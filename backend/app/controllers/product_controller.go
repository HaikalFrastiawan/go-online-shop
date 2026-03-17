package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/HaikalFrastiawan/go-online-shop/app/models"
	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

func CreateProduct(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// 1. Ambil data dari Form (Multipart)
		// Batasi ukuran file max 5MB
		err := r.ParseMultipartForm(5 << 20)
		if err != nil {
			http.Error(w, "File terlalu besar", http.StatusBadRequest)
			return
		}

		// Ambil input teks
		name := r.FormValue("name")
		priceStr := r.FormValue("price")
		price, _ := decimal.NewFromString(priceStr)

		// 2. Proses Upload Gambar
		file, handler, err := r.FormFile("image")
		if err != nil {
			http.Error(w, "Gambar wajib diunggah", http.StatusBadRequest)
			return
		}
		defer file.Close()

		// Buat nama file unik agar tidak bentrok
		fileName := fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(handler.Filename))
		uploadDir := "public/uploads/"
		
		// Pastikan foldernya ada
		os.MkdirAll(uploadDir, os.ModePerm)

		// Simpan file ke folder
		dst, err := os.Create(uploadDir + fileName)
		if err != nil {
			http.Error(w, "Gagal membuat file di server", http.StatusInternalServerError)
			return
		}
		defer dst.Close()
		io.Copy(dst, file)

		// 3. Simpan ke Database (Dua Tabel)
		pID := uuid.New().String()

		// Simpan ke tabel Products
		newProduct := models.Product{
			ID:     pID,
			Name:   name,
			Price:  price,
			Status: 1, // Aktif
			// Jika modelmu butuh SKU/Slug, tambahkan di sini
		}

		if err := db.Create(&newProduct).Error; err != nil {
			http.Error(w, "Gagal simpan produk: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Simpan ke tabel ProductImages
		newImage := models.ProductImage{
			ID:        uuid.New().String(),
			ProductID: pID,
			Path:      fileName,
		}

		if err := db.Create(&newImage).Error; err != nil {
			http.Error(w, "Produk tersimpan, tapi data gambar gagal", http.StatusInternalServerError)
			return
		}

		// Response sukses
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(newProduct)
	}
}