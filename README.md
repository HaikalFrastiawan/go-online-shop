# 🛒 Go Online Shop

Aplikasi E-Commerce modern yang dibangun menggunakan **Go (Golang)** untuk Backend dan **React (Vite) + Tailwind CSS** untuk Frontend.

## 🚀 Teknologi yang Digunakan

**Backend:**
- Go
- GORM (ORM)
- PostgreSQL
- Gorilla Mux (Router)

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios / Fetch API
- Lucide React (Icons)

---

## 📂 Struktur Folder

Proyek ini menggunakan struktur *Monorepo*:
- `/backend` : Berisi semua kode API Go dan koneksi Database.
- `/frontend`: Berisi semua antarmuka React/Vite.

---

## ⚙️ Cara Menjalankan Proyek (Local Development)

### Persyaratan Sistem:
Pastikan kamu sudah menginstal:
- [Go](https://go.dev/dl/) (versi 1.18+)
- [Node.js & npm](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1. Setup Backend (Go)
Buka terminal baru, lalu jalankan perintah berikut:

```bash
# Masuk ke folder backend
cd backend

# Copy template env (Jika ada) atau buat file .env baru
# Isi konfigurasi database PostgreSQL kamu di dalam file .env

# Jalankan migrasi database
go run main.go db:migrate

# (Opsional) Masukkan data dummy (seeder)
go run main.go db:seed

# Jalankan server backend (akan berjalan di port 9000)
go run main.go