import { MapBounds } from '@models/mapBounds';
import { State } from '@models/state';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Ciudad dentro de un estado de la republica' })
export class City {
    @Field(() => ID, { description: 'Identificador de la ciudad' })
    readonly _id: string;

    @prop({ required: true })
    @Field({ description: 'Nombre del estado' })
    name: string;

    @prop({ type: () => String })
    @Field(() => State, { description: 'The state where is this city from' })
    state: string;

    @prop({ required: true, type: MapBounds })
    @Field(() => MapBounds, {
        description:
            'Area geografica en forma rectangular que delimita al estado',
    })
    bounds: MapBounds;

    @prop({ default: false })
    @Field({ description: 'Si el estado esta activado dentro del sistema.' })
    isActive: boolean;
}

export const CityModel = getModelForClass(City);
export type CityModelType = typeof CityModel;
