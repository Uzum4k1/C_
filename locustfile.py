from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)  # Tunggu antara 1 hingga 5 detik sebelum request berikutnya

    @task
    def get_users(self):
        # Mengirim request GET ke endpoint /users untuk mendapatkan daftar pengguna
        self.client.get("/users")

    @task
    def get_user_by_id(self):
        user_id = 1  # Contoh user ID, bisa disesuaikan atau diacak untuk pengujian
        # Mengirim request GET ke endpoint /users/{id} untuk mendapatkan detail pengguna
        self.client.get(f"/users/{user_id}")

    @task
    def create_user(self):
        # Mengirim request POST ke endpoint /users untuk membuat pengguna baru
        user_data = {
            "name": "Test User",
            "username": "testuser",
            "email": "testuser@example.com"
        }
        self.client.post("/users", json=user_data)

    @task
    def update_user(self):
        user_id = 1  # ID pengguna yang ingin diperbarui
        updated_data = {
            "name": "Updated User",
            "username": "updateduser",
            "email": "updateduser@example.com"
        }
        # Mengirim request PUT ke endpoint /users/{id} untuk memperbarui data pengguna
        self.client.put(f"/users/{user_id}", json=updated_data)

    @task
    def delete_user(self):
        user_id = 1  # ID pengguna yang ingin dihapus
        # Mengirim request DELETE ke endpoint /users/{id} untuk menghapus pengguna
        self.client.delete(f"/users/{user_id}")
