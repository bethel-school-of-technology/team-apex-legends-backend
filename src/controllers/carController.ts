import { RequestHandler } from "express";
import { Car } from "../models/car";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";


export const getAllCars: RequestHandler = async (req, res, next) => {
    let cars = await Car.findAll({
        include: [{
          model: User,
          required: true
         }]
      });
    res.status(200).json(cars);
}

export const createCar: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
    
    let newCar: Car = req.body;
   newCar.userId = user.id
    
    if (newCar.make) {
        let created = await Car.create(newCar);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const updateCar: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
   if (!user) {
    return res.status(401).json( { message: 'user not found'})
   }

    let carId = req.params.id;
    let newCar: Car = req.body;
    
    console.log('carId:', carId);
    console.log('newCar:', newCar);

    let carFound = await Car.findByPk(carId);
    // console.log('Car found:', carFound);

    if (!carFound) {
        return res.status(404).json( {message: 'car not found'});
    } else if (carFound.userId !== user.id) {
        return res.status(401).json ({message: 'user is not owner of car'})
    } 
    
    if (carFound && carFound.carId == newCar.carId
        && newCar.make && newCar.model && newCar.year && newCar.color && newCar.miles 
    && newCar.city && newCar.state && newCar.price && newCar.imgUrl && newCar.description) {
            await Car.update(newCar, {
                where: { carId: carId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}




export const deleteCar: RequestHandler = async (req, res, next) => {
    let carId = req.params.id;
    let carFound = await Car.findByPk(carId);
    
    if (carFound) {
        await Car.destroy({
                where: { carId: carId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}


export const getCar: RequestHandler = async (req, res, next) => {
    let carId = req.params.id;
    let carFound =  await Car.findByPk(carId);
    
    if (carFound) {
        res.status(200).json(carFound);
    }
    else {
        res.status(404).json({});
    }
}

export const getCarByMake: RequestHandler = async (req, res, next) => {
    let make = req.params.make;
    
    console.log(`Searching for car with model: ${make}`); // Log the model parameter
    
    let carFound =  await Car.findOne({ where: {make} });
    
    console.log(`Car found: ${carFound}`); // Log the result of the query
    
    if (carFound) {
        res.status(200).json(carFound);
    }
    else {
        res.status(404).json({ message: 'car not found'});
    }
}

export const getCarByUserId: RequestHandler = async (req, res, next) => {
    let userId = req.params.userId; // Assuming userId is passed as a route parameter
    
        let cars = await Car.findAll({
            where: { userId: userId }
        });
        console.log(userId)

        if (cars.length > 0) {
            res.status(200).json(cars);
        } else {
            res.status(404).json({ message: 'No cars found for the user' });
        }
    
}
   