import { MapBounds } from '@models/mapBounds';
import { mongoose } from '@typegoose/typegoose';
import { ObjectId, ObjectIdLike } from 'bson';
import * as dotenv from 'dotenv';
import { default as cities } from '../data/cities.json';
import { default as states } from '../data/states.json';
import assert = require('assert');

const mexicoBounds: MapBounds = {
    northEast: {
        latitude: 32.006965,
        longitude: -82.781276,
    },
    southWest: {
        latitude: 14.70929,
        longitude: -118.026798,
    },
};

async function initDatabase() {
    dotenv.config();
    const url = process.env.MONGODB_URL;
    if (url === undefined) throw new Error('MONGODB_URL must be provided!');

    try {
        await mongoose.connect(url);
        await initStateCollection();
        await initCitiesCollection();
        console.log('🧩 Database Populated');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}

initDatabase();

async function initStateCollection() {
    try {
        await mongoose.connection.dropCollection('states');
    } catch (e) {
        console.error(e);
    }

    const insertedDocuments = await mongoose.connection
        .collection('states')
        .insertMany(
            states.map((state) => {
                return {
                    _id: new mongoose.Types.ObjectId(state._id.$oid),
                    cities: state.cities.map(
                        (cityId: {
                            $oid:
                                | string
                                | number
                                | ObjectId
                                | Buffer
                                | ObjectIdLike
                                | undefined;
                        }) => new mongoose.Types.ObjectId(cityId.$oid)
                    ),
                    createdAt: new Date(state.createdAt.$date),
                    isActive: state.isActive,
                    bounds: mexicoBounds,
                    name: state.name,
                    updatedAt: new Date(state.updatedAt.$date),
                };
            })
        );

    assert(
        insertedDocuments.insertedCount === states.length,
        `Se han insertado ${insertedDocuments.insertedCount} de ${states.length}`
    );
}

async function initCitiesCollection() {
    try {
        await mongoose.connection.dropCollection('cities');
    } catch (e) {
        console.error(e);
    }

    const insertedDocuments = await mongoose.connection
        .collection('cities')
        .insertMany(
            cities.map((city) => {
                return {
                    _id: new mongoose.Types.ObjectId(city._id.$oid),
                    createdAt: new Date(city.createdAt.$date),
                    isActive: city.isActive,
                    bounds: mexicoBounds,
                    name: city.name,
                    updatedAt: new Date(city.updatedAt.$date),
                    zones: city.zones.map(
                        (zoneId: {
                            $oid:
                                | string
                                | number
                                | ObjectId
                                | Buffer
                                | ObjectIdLike
                                | undefined;
                        }) => new mongoose.Types.ObjectId(zoneId.$oid)
                    ),
                    state: new mongoose.Types.ObjectId(city.state.$oid),
                };
            })
        );

    assert(
        insertedDocuments.insertedCount === cities.length,
        `Se han insertado ${insertedDocuments.insertedCount} de ${cities.length}`
    );
}
