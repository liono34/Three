const DB = (function() {
    const SELLERS_KEY = 'carhub_sellers';
    const CARS_KEY = 'carhub_cars';

    const initSellers = [
        { id: 1, fullname: 'John Smith', address: '123 Main St, New York', phone: '123-456-7890', email: 'john@example.com', username: 'john_smith', password: 'password123' },
        { id: 2, fullname: 'Sarah Johnson', address: '456 Oak Ave, Los Angeles', phone: '987-654-3210', email: 'sarah@example.com', username: 'sarah_j', password: 'pass456' },
        { id: 3, fullname: 'Mike Chen', address: '789 Pine Rd, San Francisco', phone: '555-123-4567', email: 'mike@example.com', username: 'mike_c', password: 'mike123' }
    ];

    const initCars = [
        { id: 1, color: 'Black', model: 'Range Rover', year: 2020, location: 'New York', price: 188800, image: 'range rover.png', sellerId: 1 },
        { id: 2, color: 'White', model: 'Range Rover', year: 2019, location: 'Los Angeles', price: 166600, image: 'range2.png', sellerId: 1 },
        { id: 3, color: 'Red', model: 'Tesla Model 3', year: 2021, location: 'San Francisco', price: 33000, image: 'tesla.png', sellerId: 2 },
        { id: 4, color: 'Blue', model: 'Toyota Camry', year: 2020, location: 'Chicago', price: 28500, image: 'image.png', sellerId: 3 },
        { id: 5, color: 'Silver', model: 'BMW X5', year: 2022, location: 'Miami', price: 78000, image: 'image2.png', sellerId: 2 },
        { id: 6, color: 'Black', model: 'Mercedes-Benz C-Class', year: 2018, location: 'Dallas', price: 45000, image: 'image.png', sellerId: 3 }
    ];

    function initDB() {
        if (!localStorage.getItem(SELLERS_KEY)) {
            localStorage.setItem(SELLERS_KEY, JSON.stringify(initSellers));
        }
        if (!localStorage.getItem(CARS_KEY)) {
            localStorage.setItem(CARS_KEY, JSON.stringify(initCars));
        }
    }

    function getSellers() {
        return JSON.parse(localStorage.getItem(SELLERS_KEY) || '[]');
    }

    function getCars() {
        return JSON.parse(localStorage.getItem(CARS_KEY) || '[]');
    }

    function addSeller(seller) {
        const sellers = getSellers();
        const newId = sellers.length > 0 ? Math.max(...sellers.map(s => s.id)) + 1 : 1;
        const newSeller = { ...seller, id: newId };
        sellers.push(newSeller);
        localStorage.setItem(SELLERS_KEY, JSON.stringify(sellers));
        return newSeller;
    }

    function addCar(car) {
        const cars = getCars();
        const newId = cars.length > 0 ? Math.max(...c => c.id) + 1 : 1;
        const newCar = { ...car, id: newId };
        cars.push(newCar);
        localStorage.setItem(CARS_KEY, JSON.stringify(cars));
        return newCar;
    }

    function findSellerByUsername(username) {
        const sellers = getSellers();
        return sellers.find(s => s.username === username);
    }

    function authenticate(username, password) {
        const seller = findSellerByUsername(username);
        if (seller && seller.password === password) {
            return seller;
        }
        return null;
    }

    function searchCars(model, year) {
        const cars = getCars();
        return cars.filter(car => {
            const modelMatch = model ? car.model.toLowerCase().includes(model.toLowerCase()) : true;
            const yearMatch = year ? car.year === parseInt(year) : true;
            return modelMatch && yearMatch;
        });
    }

    function deleteCar(carId) {
        const cars = getCars().filter(c => c.id !== carId);
        localStorage.setItem(CARS_KEY, JSON.stringify(cars));
    }

    function getCarById(carId) {
        const cars = getCars();
        return cars.find(c => c.id === carId);
    }

    function getSellerById(sellerId) {
        const sellers = getSellers();
        return sellers.find(s => s.id === sellerId);
    }

    return {
        initDB,
        getSellers,
        getCars,
        addSeller,
        addCar,
        findSellerByUsername,
        authenticate,
        searchCars,
        deleteCar,
        getCarById,
        getSellerById
    };
})();