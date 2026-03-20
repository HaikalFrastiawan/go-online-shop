package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"

	"github.com/HaikalFrastiawan/go-online-shop/app/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load()
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "localhost"
	}
	user := os.Getenv("DB_USER")
	if user == "" {
		user = "user"
	}
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "password"
	}
	dbname := os.Getenv("DB_Name")
	if dbname == "" {
		dbname = "go_online_shop"
	}
	port := os.Getenv("DB_Port")
	if port == "" {
		port = "5432"
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbname, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Connection error: ", err)
	}

	var productImages []models.ProductImage
	db.Preload("Product").Find(&productImages)

	uploadDir := "public/uploads/"
	count := 0

	for _, pi := range productImages {
		filePath := filepath.Join(uploadDir, pi.Path)
		fileInfo, err := os.Stat(filePath)
		// If file doesn't exist or is very small (0 bytes or just HTTP error HTML)
		if err != nil || fileInfo.Size() < 1000 {
			productName := "Product"
			if pi.Product.Name != "" {
				productName = pi.Product.Name
			}

			// encode properly!
			encodedName := url.QueryEscape(productName)
			imgUrl := fmt.Sprintf("https://placehold.co/600x600/e2e8f0/64748b/png?text=%s", encodedName)

			fmt.Printf("Redownloading for %s: %s\n", productName, imgUrl)

			resp, err := http.Get(imgUrl)
			if err != nil {
				fmt.Println("Gagal download:", err)
				continue
			}

			destFile, err := os.Create(filePath)
			if err == nil {
				io.Copy(destFile, resp.Body)
				destFile.Close()
				count++
				fmt.Println("Sukses fix:", pi.Path)
			}
			resp.Body.Close()
		}
	}
	fmt.Printf("Fixed %d images.\n", count)
}
