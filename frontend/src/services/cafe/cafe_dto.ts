// @formatter:off
import { Deserialization } from 'base/deserialization';
import { Serialization } from 'base/serialization';

export class Cafe {
  readonly acceptingOrders: boolean;
  readonly id: string;
  constructor({
    acceptingOrders,
    id,  
  }: {
    acceptingOrders: boolean,
    id: string,  
  }) {
    this.acceptingOrders = acceptingOrders;
    this.id = id;
  }
  
  static deserialize(o: any): Cafe {
    return new Cafe({
      acceptingOrders: Deserialization.requiredBoolean(o, 'acceptingOrders'),
      id: Deserialization.requiredString(o, 'id'),  
    })
  }
  
  static serialize(o: Cafe): object {
    return {
      'acceptingOrders': o.acceptingOrders,
      'id': o.id,  
    }
  }
}

export class GetCafeResponse {
  readonly cafe: Cafe;
  constructor({
    cafe,  
  }: {
    cafe: Cafe,  
  }) {
    this.cafe = cafe;
  }
  
  static deserialize(o: any): GetCafeResponse {
    return new GetCafeResponse({
      cafe: Deserialization.requiredObject(Cafe.deserialize, o, 'cafe'),  
    })
  }
  
  static serialize(o: GetCafeResponse): object {
    return {
      'cafe': Serialization.requiredObject(Cafe.serialize, o.cafe),  
    }
  }
}

export class UpdateCafeRequest {
  readonly acceptingOrders: boolean;
  constructor({
    acceptingOrders,  
  }: {
    acceptingOrders: boolean,  
  }) {
    this.acceptingOrders = acceptingOrders;
  }
  
  static deserialize(o: any): UpdateCafeRequest {
    return new UpdateCafeRequest({
      acceptingOrders: Deserialization.requiredBoolean(o, 'acceptingOrders'),  
    })
  }
  
  static serialize(o: UpdateCafeRequest): object {
    return {
      'acceptingOrders': o.acceptingOrders,  
    }
  }
}

export class UpdateCafeResponse {
  readonly cafe: Cafe;
  constructor({
    cafe,  
  }: {
    cafe: Cafe,  
  }) {
    this.cafe = cafe;
  }
  
  static deserialize(o: any): UpdateCafeResponse {
    return new UpdateCafeResponse({
      cafe: Deserialization.requiredObject(Cafe.deserialize, o, 'cafe'),  
    })
  }
  
  static serialize(o: UpdateCafeResponse): object {
    return {
      'cafe': Serialization.requiredObject(Cafe.serialize, o.cafe),  
    }
  }
}
