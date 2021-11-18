import { registerEnumType } from 'type-graphql';

export enum CarreerArea {
    ING = 'Ingenieria',
    HMN = 'Humanidades',
    ART = 'Artes',
    SCL = 'Ciencias Sociales',
}

registerEnumType(CarreerArea, {
    name: 'CarreerArea',
    description: 'Available Carrer Areas',
});
