import { registerEnumType } from 'type-graphql';

export enum CarreerArea {
    ING = 'Ingenieria',
    HMN = 'Humanidades',
}

registerEnumType(CarreerArea, {
    name: 'CarreerArea',
    description: 'Available Carrer Areas',
});
