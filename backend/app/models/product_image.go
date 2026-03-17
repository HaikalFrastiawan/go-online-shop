package models

import (
	"time"
)

type ProductImage struct {
	ID         string    `gorm:"size:36;not null;uniqueIndex;primary_key" json:"id"`
	Product    Product   `gorm:"foreignKey:ProductID" json:"-"` // Gunakan "-" agar tidak terjadi infinite loop JSON
	ProductID  string    `gorm:"size:36;index" json:"product_id"`
	
	// KUNCI UTAMANYA DI SINI: Kita petakan 'Path' menjadi 'url' agar sesuai dengan React
	Path       string    `gorm:"type:text" json:"url"` 
	
	ExtraLarge string    `gorm:"type:text" json:"extra_large"`
	Large      string    `gorm:"type:text" json:"large"`
	Medium     string    `gorm:"type:text" json:"medium"`
	Small      string    `gorm:"type:text" json:"small"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}