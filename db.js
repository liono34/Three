const DB = {
    tables: {
        sellers: [],
        cars: []
    },

    initDB() {
        const s = localStorage.getItem("sellers");
        const c = localStorage.getItem("cars");
        if (s) this.tables.sellers = JSON.parse(s);
        if (c) this.tables.cars = JSON.parse(c);

        if (this.tables.sellers.length === 0) {
            this.tables.sellers = [
                { id: 1, fullname: "Admin", address: "Test", phone: "123", email: "admin@test.com", username: "admin", password: "123456" }
            ];
            this.saveSellers();
        }

        if (this.tables.cars.length === 0) {
            this.tables.cars = [
                { id: 1, brand: "Toyota", model: "Camry", year: "2020", price: "25000", color: "White" },
                { id: 2, brand: "Honda", model: "Civic", year: "2021", price: "23000", color: "Black" }
            ];
            this.saveCars();
        }
    },

    saveSellers() {
        localStorage.setItem("sellers", JSON.stringify(this.tables.sellers));
    },

    saveCars() {
        localStorage.setItem("cars", JSON.stringify(this.tables.cars));
    },

    addSeller(seller) {
        seller.id = this.tables.sellers.length + 1;
        this.tables.sellers.push(seller);
        this.saveSellers();
    },

    findSellerByUsername(username) {
        return this.tables.sellers.find(item => item.username === username);
    },

    getSellers() {
        return this.tables.sellers;
    },

    addCar(car) {
        car.id = this.tables.cars.length + 1;
        this.tables.cars.push(car);
        this.saveCars();
    },

    getCars() {
        return this.tables.cars;
    },

    searchCars(keyword) {
        if (!keyword) return this.getCars();
        const k = keyword.toLowerCase();
        return this.tables.cars.filter(car =>
            car.brand.toLowerCase().includes(k) ||
            car.model.toLowerCase().includes(k)
        );
    }
};
