package models

import (
	"time"
)

type Category struct {
	ID        string    `gorm:"size:36;not null;uniqueIndex;primary_key" json:"id"`
	ParentID  string    `gorm:"size:36;" json:"parent_id"`
	
	// Gunakan json:"-" agar tidak terjadi infinite loop saat render JSON
	Section   Section   `gorm:"foreignKey:SectionID" json:"-"` 
	SectionID string    `gorm:"size:36;index" json:"section_id"`
	
	// Gunakan json:"-" juga di sini karena Product juga punya relasi ke Category
	Products  []Product `gorm:"many2many:product_categories;" json:"-"` 
	
	Name      string    `gorm:"size:100;" json:"name"`
	Slug      string    `gorm:"size:100;" json:"slug"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}