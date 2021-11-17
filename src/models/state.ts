import { City } from '@models/city';
import { MapBounds } from '@models/mapBounds';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Estado de la republica' })
export class State {
    @Field(() => ID, {
        description: 'Identificador del estado de la republica',
    })
    readonly _id: string;

    @prop()
    @Field({ description: 'Nombre del estado de la republica' })
    name: string;

    @prop({ required: true })
    @Field(() => MapBounds, {
        description:
            'Area geografica rectangular que define las delimitaciones del estado.',
    })
    bounds: MapBounds;

    @prop({ type: () => [String] })
    @Field(() => [City], { description: 'List of cities from this state' })
    cities: string[];

    @prop({ default: false })
    @Field({
        description: 'Si la ciudad se encuentra activada dentro del sistema.',
    })
    isActive: boolean;
}

export const StateModel = getModelForClass(State);
export type StateModelType = typeof StateModel;
